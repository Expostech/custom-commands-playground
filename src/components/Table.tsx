import styled from "styled-components";

import IndeterminateCheckbox from "./IndeterminateCheckbox";

import React, { useEffect, useState } from "react";

import {
    useTable,
    useRowSelect,
    usePagination,
    useFilters,
    useSortBy,
    useGlobalFilter,
    useAsyncDebounce,
    Column,
    FilterValue,
    IdType,
    Cell,
    CellValue,
    Row,
} from "react-table";

import { ITableProps, IColumnFilter, IColumnSorter } from "./TableInterfaces";

import { SearchOutlined, DownOutlined } from "@ant-design/icons";

import { Dropdown, Input, Menu } from "antd";

import { debounce } from "../services/util/debounce";
import { getConditionalSelectHeaderCheckboxProps } from "../services/GetConditionalSelectHeaderCheckboxProps";

const ActionButton = styled.button`
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  border-radius: 3px;
  display: inline;
  margin-right: 5px;
`;

const ActionButtonDanger = styled.button`
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
  border-radius: 3px;
  display: inline;
`;

const Seporator = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  width: 1px;
  height: 1.6em;
  background-color: rgba(0, 0, 0, 0.06);
  transform: translateY(-50%);
  transition: background-color 0.3s;
  z-index: 100;
`;

const SortIndicatorAsc = styled.div<{ isSorted: boolean; isSortedDesc: boolean | undefined }>`
    color: ${(props) => props.isSorted && !props.isSortedDesc ? '#1890ff' : 'black'};
    opacity: ${(props => props.isSorted && !props.isSortedDesc ? 1 : 0.3)};
    display: inline-block;
`

const SortIndicatorDesc = styled.div<{ isSortedDesc: boolean | undefined; }>`
    color: ${(props) => props.isSortedDesc ? '#1890ff' : 'black'};
    opacity: ${(props => props.isSortedDesc ? 1 : 0.3)};
    display: inline-block;
`

const SortIndicatorWrapper = styled.span`
    position: absolute;
    right: 0.5rem;
    bottom: 0.95rem;
    font-size: 17px;
`

const FilterDropdownButton = styled.span<{ isFiltered: boolean; }>`
  color: ${(props) => (props.isFiltered ? "#1890ff" : "#bfbfbf")};

  position: absolute;

  right: 1.7rem;

  padding: 0 4px;
  border-radius: 2px;

  transition: all 0.3s;

  cursor: pointer;

  :hover {
    color: ${(props) => (props.isFiltered ? "#1890ff" : "#00000073")};
    background: rgba(0, 0, 0, 0.04);
  }

  span {
    color: inherit;
  }

  span svg {
    color: inherit;
  }

  span svg path {
    color: inherit;
  }
`;

const FilterDropdown = styled.div`
  position: absolute;

  right: 1rem;

  background-color: #fff;

  padding: 8px;

  z-index: 101;

  border-radius: 2px;

  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;

  min-width: 20rem;

  cursor: default;
`;

const SelectDropdownButton = styled.div`
    position: absolute;
    top: 1rem;
    left: 2.3rem;
    cursor: pointer;
    color: rgb(191, 191, 191);

    span {
        color: inherit;
    }

    span svg {
        color: inherit;
    }

    span svg path {
        color: inherit;
    }
`

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    modifyTableData,
    editableRowIndex,
}: {
    value: any;
    row: any;
    column: any;
    modifyTableData: any;
    editableRowIndex: any;
}) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        modifyTableData(index, id, value);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return index === editableRowIndex && id !== 'updatedAt' && id !== 'createdAt' ? (
        <Input value={value} onChange={onChange} onBlur={onBlur} />
    ) : (
        <p>{value}</p>
    );
};

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}: {
    preGlobalFilteredRows: any;
    globalFilter: any;
    setGlobalFilter: any;
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <span>
            Search:{" "}
            <Input
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: "1.1rem",
                    width: "auto",
                }}
                bordered={false}
            />
        </span>
    );
}

function ColumnFilter({
    column: { filterValue, id, setFilter },
    activeDropdown
}: {
    column: any;
    activeDropdown: string;
    setActiveDropdown: Function;
}) {
    if (activeDropdown !== id) {
        return null;
    }

    function stopPropegation(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    return (
        <FilterDropdown
            className="dropdown"
            onClick={(e: React.MouseEvent<HTMLElement>) => stopPropegation(e)}
        >
            <Input
                value={filterValue || ""}
                onChange={(e) => {
                    debounce(setFilter(e.target.value || undefined), 200);
                }}
                onClick={(e: React.MouseEvent<HTMLElement>) => stopPropegation(e)}
                placeholder={`Search ${id}...`}
                allowClear
            />
        </FilterDropdown>
    );
}

export function Table(tableProps: React.PropsWithChildren<ITableProps>) {
    let {
        data,
        columns,
        currentPage,
        setPage,
        totalPages,
        pageSize,
        setPageSize,
        searchQuery,
        setSearchQuery,
        skipPageReset,
        setSkipPageReset,
        editableRowIndex,
        setEditableRowIndex,
        columnSorters,
        setColumnSorters,
        columnFilters,
        setColumnFilters,
        modifyTableData,
        activeDropdown,
        setActiveDropdown,
        setSelectedRows
    } = tableProps;

    if (currentPage === -1) {
        currentPage = 0;
    }

    const defaultColumn = {
        Filter: ColumnFilter,
        Cell: EditableCell,
    };

    const {
        getCellProps,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        page,
        selectedFlatRows,
        state: { selectedRowIds, pageIndex, filters, globalFilter, sortBy },
    } = useTable(
        {
            data,
            columns,
            defaultColumn,
            autoResetPage: !skipPageReset,
            setSkipPageReset,
            modifyTableData,
            manualSortBy: true,
            manualFilters: true,
            manualGlobalFilter: true,
            manualPagination: true,
            pageCount: totalPages,
            editableRowIndex,
            setEditableRowIndex,
            activeDropdown,
            setActiveDropdown,
            initialState: { pageIndex: currentPage },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    width: 100,
                    minWidth: 100,
                    maxWidth: 100,
                    disableSortBy: true,
                    Header(props) {

                        const [indeterminateCheckboxProps, setIndeterminateCheckboxProps] = useState(getConditionalSelectHeaderCheckboxProps({
                            headerProps: props,
                            checkIfRowIsSelectable: (row: Row) => row.cells[5].value !== true,
                            shouldSelectPage: true
                        }));

                        const [hasMounted, setHasMounted] = useState(true);

                        useEffect(() => {
                            if (hasMounted) {
                                setHasMounted(false);
                            }
                            else {
                                var element: HTMLInputElement = (document.getElementById('multiSelect') as HTMLInputElement);
                                element.click();
                            }
                        }, [indeterminateCheckboxProps])

                        function onClick({ key }: { key: string }) {
                            switch (key) {
                                case 'all':
                                    var newProps = {
                                        headerProps: props,
                                        checkIfRowIsSelectable: (row: Row) => true,
                                        shouldSelectPage: true
                                    }
                                    setIndeterminateCheckboxProps(getConditionalSelectHeaderCheckboxProps({ ...newProps }));
                                    break;

                                case 'unlocked':
                                    var newProps = {
                                        headerProps: props,
                                        checkIfRowIsSelectable: (row: Row) => row.cells[5].value !== true,
                                        shouldSelectPage: true
                                    }
                                    setIndeterminateCheckboxProps(getConditionalSelectHeaderCheckboxProps({ ...newProps }));
                                    break;

                                case 'locked':
                                    var newProps = {
                                        headerProps: props,
                                        checkIfRowIsSelectable: (row: Row) => row.cells[5].value === true,
                                        shouldSelectPage: true
                                    }
                                    setIndeterminateCheckboxProps(getConditionalSelectHeaderCheckboxProps({ ...newProps }));
                                    break;
                            }
                        };

                        const menu = (
                            <Menu onClick={onClick}>
                                <Menu.Item key='all'>All</Menu.Item>
                                <Menu.Item key='unlocked'>Unlocked</Menu.Item>
                                <Menu.Item key='locked'>Locked</Menu.Item>
                            </Menu>
                        );

                        return (
                            <div>
                                <IndeterminateCheckbox id='multiSelect' {...indeterminateCheckboxProps} />
                                <Dropdown overlay={menu} placement='bottomLeft'>
                                    <SelectDropdownButton>
                                        <DownOutlined />
                                    </SelectDropdownButton>
                                </Dropdown>
                            </div>
                        );
                    },
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
                {
                    accessor: "Actions",
                    id: "actions",
                    Header: "Actions",
                    disableFilters: true,
                    disableSortBy: true,
                    width: 320,
                    minWidth: 320,
                    maxWidth: 320,
                    Cell: ({ row, setEditableRowIndex, editableRowIndex }) => (
                        <div>
                            <ActionButton>Unlock</ActionButton>
                            <ActionButton
                                onClick={() => {
                                    const currentIndex = row.index;
                                    if (editableRowIndex !== currentIndex) {
                                        setEditableRowIndex(currentIndex);
                                    } else {
                                        setEditableRowIndex(null);
                                        const updatedRow = row.values;
                                        console.log("updated row values:");
                                        console.log(updatedRow);
                                        // Call API to update var
                                        setSkipPageReset(false);
                                    }
                                }}
                            >
                                {editableRowIndex !== row.index ? "Edit" : "Save"}
                            </ActionButton>
                            <ActionButtonDanger
                                onClick={() => {
                                    const currentIndex = row.index;
                                    if (editableRowIndex !== currentIndex) {
                                        // Delete row
                                    } else {
                                        setEditableRowIndex(null);
                                        setSkipPageReset(false);
                                    }
                                }}
                            >
                                {editableRowIndex !== row.index ? "Delete" : "Cancel"}
                            </ActionButtonDanger>
                        </div>
                    ),
                },
            ]);
        }
    );

    const canPreviousPage: boolean = currentPage > 0;
    const canNextPage: boolean = currentPage + 1 <= totalPages - 1;

    function goToPage(page: number) {
        if (editableRowIndex === null) {
            if (page > totalPages - 1) {
                page = totalPages - 1;
            } else if (page < 0) {
                page = 0;
            }

            setPage(page);
        }
    }

    useEffect(() => {
        setSelectedRows(Object.keys(selectedRowIds));
    }, [selectedRowIds])

    useEffect(() => {
        if (sortBy.length > 0) {
            var updatedSorters: IColumnSorter = {};

            for (var i = 0; i < sortBy.length; i++) {
                if (sortBy[i].desc === false) {
                    updatedSorters[sortBy[i].id] = "ASC";
                } else {
                    updatedSorters[sortBy[i].id] = "DESC";
                }
            }

            setColumnSorters(updatedSorters);
            //goToPage(0);
        } else {
            setColumnSorters({});
            //goToPage(0);
        }
    }, [sortBy]);

    useEffect(() => {
        if (filters.length > 0) {
            var updatedFilters: IColumnFilter = {};

            for (var i = 0; i < filters.length; i++) {
                updatedFilters[filters[i].id] = filters[i].value;
            }

            setColumnFilters(updatedFilters);
            goToPage(0);
        } else {
            setColumnFilters({});
            goToPage(0);
        }
    }, [filters]);

    useEffect(() => {
        if (globalFilter !== undefined) {
            setSearchQuery(globalFilter);
            goToPage(0);
        } else {
            setSearchQuery('');
            goToPage(0);
        }
    }, [globalFilter]);

    useEffect(() => {
        if (activeDropdown !== '') {
            document.addEventListener("click", hideDropdown);
        } else {
            document.removeEventListener("click", hideDropdown);
        }

        return () => {
            document.removeEventListener("click", hideDropdown);
        };
    }, [activeDropdown]);

    function hideDropdown(event: MouseEvent) {
        if (!(event.target as HTMLElement).closest(".dropdown")) {
            setActiveDropdown('');
        }
    }

    function toggleDropdown(e: React.MouseEvent<HTMLElement>, columnId: string) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        if (activeDropdown === columnId) {
            setActiveDropdown("");
        } else {
            setActiveDropdown(columnId);
        }
    }

    // Render the UI for your table
    return (
        <>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table {...getTableProps()}>
                <thead className="ant-table-thead">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, i) => (
                                <th
                                    className="ant-table-cell"
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps({
                                            style: {
                                                width: column.width,
                                                minWidth: column.minWidth,
                                                maxWidth: column.maxWidth,
                                            },
                                        })
                                    )}
                                >
                                    {column.render("Header")}
                                    {column.canFilter ? column.render("Filter") : null}
                                    {column.canSort ? (
                                        <SortIndicatorWrapper>
                                            <SortIndicatorAsc isSorted={column.isSorted} isSortedDesc={column.isSortedDesc} >
                                                ↑
                                            </SortIndicatorAsc>
                                            <SortIndicatorDesc isSortedDesc={column.isSortedDesc} >
                                                ↓
                                            </SortIndicatorDesc>
                                        </SortIndicatorWrapper>
                                    ) : null}
                                    {column.canFilter ? (
                                        <FilterDropdownButton
                                            isFiltered={column.filterValue !== undefined}
                                            onClick={(e: React.MouseEvent<HTMLElement>) =>
                                                toggleDropdown(e, column.id)
                                            }
                                        >
                                            <SearchOutlined />
                                        </FilterDropdownButton>
                                    ) : null}

                                    {i !== 0 && i + 1 !== headerGroup.headers.length ? (
                                        <Seporator />
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="ant-table-tbody" {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr className="ant-table-row ant-table-row-level-0" {...row.getRowProps()} >
                                {row.cells.map((cell) => {
                                    return (
                                        <td className="ant-table-cell" {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

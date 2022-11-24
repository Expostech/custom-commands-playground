import styled from 'styled-components';

import IndeterminateCheckbox from './IndeterminateCheckbox';

import React, { useEffect, useState } from 'react';

import {
  useTable,
  useRowSelect,
  usePagination,
  useFilters,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  Row,
} from 'react-table';

import { ITableProps, IColumnFilter, IColumnSorter, IValidationError } from './TableInterfaces';

import { SearchOutlined, DownOutlined, CaretDownFilled, CaretUpFilled } from '@ant-design/icons';

import { Dropdown, Input, Menu } from 'antd';

import { debounce } from '../services/util/debounce';
import { getConditionalSelectHeaderCheckboxProps } from '../services/GetConditionalSelectHeaderCheckboxProps';

//TODO: Move all of the styled components to another file.

const ActionButton = styled.button`
  color: #fff;
  background-color: ${(props) => props.disabled ? '#696969' : '#007bff'};
  border-color: ${(props) => props.disabled ? '#696969' : '#007bff'};
  border-radius: 3px;
  display: inline;
  margin-right: 5px;
  transition: 0.3ms;

  :hover {
    background-color: ${(props) => props.disabled ? '#737373' : '#0f83ff'};
  }

  :active {
    background-color: ${(props) => props.disabled ? '#5e5e5e' : '#0071eb'};
  }
`;

const ActionButtonDanger = styled.button`
  color: #fff;
  background-color: ${(props) => props.disabled ? '#696969' : '#dc3545'};
  border-color: ${(props) => props.disabled ? '#696969' : '#dc3545'};
  border-radius: 3px;
  display: inline;
  transition: 0.3ms;

  :hover {
    background-color: ${(props) => props.disabled ? '#737373' : '#df4958'};
  }

  :active {
    background-color: ${(props) => props.disabled ? '#5e5e5e' : '#d92638'};
  }
`;

const CollumnHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
`;

const CellActionContainer = styled.div`
  width: fit-content;
`;

const SearchContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
  padding: 6px;
  align-items: center;
  align-content: center;
  flex-direction: row;
  justify-content: flex-start;
`;

const SearchLabel = styled.span`
  font-size: 16px;
  color: #000000d9;
  font-weight: 400;
  font-family: 'Raleway',sans-serif;
  margin-left: 5px;
  margin-right: 5px;
`;

const HeaderButton = styled.button<{danger: boolean}>`
  color: #fff;
  background-color: ${(props) => props.disabled ? '#696969' : props.danger ? '#dc3545' : '#007bff'};
  border-color:${(props) => props.disabled ? '#696969' : props.danger ? '#dc3545' : '#007bff'};
  border-radius: 3px;
  display: inline;
  margin-right: 5px;
  margin-left: 5px;
  padding: 7px 15px;
  transition: 0.3ms;

  :hover {
    background-color: ${(props) => props.disabled ? '#737373' : props.danger ? '#df4958' : '#0f83ff'};
  }

  :active {
    background-color: ${(props) => props.disabled ? '#5e5e5e' : props.danger ? '#d92638' : '#0071eb'};
  }
`;

const SelectionLabel = styled.div`
  font-size: 16px;
  margin-left: 5px;
  margin-right: 5px;
`;

const HeaderSeparator = styled.div`
  width: 1px;
  height: 1.6rem;
  background-color: rgba(0, 0, 0, 0.06);
  z-index: 100;
  margin-left: 5px;
  margin-right: 5px;
`;

const Separator = styled.div<{displace: boolean | null}>`
  width: 1px;
  height: 1.6em;
  margin-right: -16px;
  margin-left: ${(props) => props.displace ? 'auto' : '16px'};
  background-color: rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s;
  z-index: 100;
`;

const SortIndicatorAsc = styled.div<{ isSorted: boolean; isSortedDesc: boolean | undefined }>`
    opacity: ${(props => props.isSorted && !props.isSortedDesc ? 1 : 0.3)};
    display: inline-block;

    span svg path {
      color: ${(props) => props.isSorted && !props.isSortedDesc ? '#1890ff' : 'black'};
    }
`;

const SortIndicatorDesc = styled.div<{ isSortedDesc: boolean | undefined; }>`
    opacity: ${(props => props.isSortedDesc ? 1 : 0.3)};
    display: inline-block;
    
    span svg path {
      color: ${(props) => props.isSortedDesc ? '#1890ff' : 'black'};
    }
`;

const SortIndicatorContainer = styled.span<{ displace: boolean | undefined }>`
    font-size: 17px;
    min-width: 34px;
    margin-left: ${(props) => props.displace ? 'auto' : '5px'};
`;

const FilterDropdownButton = styled.span<{ isFiltered: boolean; }>`
  color: ${(props) => (props.isFiltered ? '#1890ff' : '#bfbfbf')};

  padding: 0 4px;

  margin-left: auto;

  border-radius: 2px;

  transition: all 0.3s;

  cursor: pointer;

  :hover {
    color: ${(props) => (props.isFiltered ? '#1890ff' : '#00000073')};
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

  top: 3rem;

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
    cursor: pointer;

    margin-left: 5px;

    span svg path {
      color: rgb(191, 191, 191);
    }
`;

const CellInputContainer = styled.div<{validationError: IValidationError | null, columnId: String}>`
  input {
    border-color: ${(props) => (props.validationError && props.validationError.name && props.columnId === 'name') || (props.validationError && props.validationError.value && props.columnId === 'value') ? 'rgb(255, 77, 79)' : ''};

    :hover {
      border-color: ${(props) => (props.validationError && props.validationError.name && props.columnId === 'name') || (props.validationError && props.validationError.value && props.columnId === 'value') ? 'rgb(255, 77, 79)' : '#40a9ff'};
    }

    :focus {
      border-color: ${(props) => (props.validationError && props.validationError.name && props.columnId === 'name') || (props.validationError && props.validationError.value && props.columnId === 'value') ? 'rgb(255, 77, 79)' : '#40a9ff'};
      box-shadow: ${(props) => (props.validationError && props.validationError.name && props.columnId === 'name') || (props.validationError && props.validationError.value && props.columnId === 'value') ? '0px 0px 0px 2px rgb(255 77 79 / 20%)' : '0 0 0 2px rgb(24 144 255 / 20%);'};
    }
  }
`;

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  modifyTableData,
  editableRowIndex,
  validationError,
  setValidationError,
  checkVariable,
  rowIndexToKey,
}: {
    value: any;
    row: any;
    column: any;
    modifyTableData: Function;
    editableRowIndex: Number | null;
    validationError: IValidationError;
    setValidationError: Function;
    checkVariable: Function;
    rowIndexToKey: Function;
}) => {
  const [value, setValue] = useState(initialValue);

  async function validateInput(value:string) {
    if (id === 'name') {
      if (!value || value.length > 255) {
        if (validationError) {
          const error: IValidationError = { ...validationError };
          error.name = true;

          setValidationError({ ...error });
          return;
        }

        const error: IValidationError = {
          row: index,
          name: true,
          value: false
        };

        setValidationError({ ...error });
        return;
      }

      const key: number = rowIndexToKey(index);

      const isUnique: boolean = await checkVariable(value, key.toString());

      if (!isUnique) {
        if (validationError) {
          const error: IValidationError = { ...validationError };

          error.name = true;

          setValidationError({ ...error });
          return;
        }

        const error: IValidationError = {
          row: index,
          name: true,
          value: false
        };

        setValidationError({ ...error });
        return;
      }

      if (validationError) {
        const error: IValidationError = { ...validationError };

        if (error.value) {
          error.name = false;

          setValidationError({ ...error });
          return;
        }

        setValidationError(null);
      }
    }

    if (id === 'value') {
      if (!value || value.length > 255) {
        if (validationError) {
          const error: IValidationError = { ...validationError };
          error.value = true;

          setValidationError({ ...error });
          return;
        }

        const error: IValidationError = {
          row: index,
          name: false,
          value: true
        };

        setValidationError({ ...error });
        return;
      }

      if (validationError) {
        const error: IValidationError = { ...validationError };

        if (error.name) {
          error.value = false;

          setValidationError({ ...error });
          return;
        }

        setValidationError(null);
      }
    }
  };

  const onChange = useAsyncDebounce((value) => {
    validateInput(value || undefined);
  }, 150);

  const onBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await validateInput(e.target.value);
    modifyTableData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return index === editableRowIndex && id !== 'updatedAt' && id !== 'createdAt' ? (
    <CellInputContainer columnId={id} validationError={validationError}>
      <Input
        id={`${index}-${id}`}
        onBlur={onBlur}
        onChange={(e) =>{
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        value={value} />
    </CellInputContainer>
  ) : (
    <p>{value}</p>
  );
};

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  editableRowIndex,
  loadVariables,
  deleteVariables,
  loading,
  preventDeletion,
  selectedRowKeys,
  setVariableLock
}: {
    preGlobalFilteredRows: any;
    globalFilter: any;
    setGlobalFilter: any;
    editableRowIndex: number | null;
    loadVariables: Function;
    deleteVariables: Function;
    loading: boolean;
    preventDeletion: boolean;
    selectedRowKeys: Array<string | number>;
    setVariableLock: Function;
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <SearchContainer>
      <HeaderButton danger={false} disabled={editableRowIndex !== null} onClick={async () => loadVariables()}>Reload</HeaderButton>
      <HeaderSeparator/>
      <SearchLabel>Search:{' '}</SearchLabel>
      <Input
        bordered={true}
        disabled={editableRowIndex !== null}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1rem',
          width: '15%',
          margin: '4px 5px 4px 4px',
          borderRadius: '3px',
        }}
        value={value || ''}
      />
      <HeaderSeparator/>
      <SelectionLabel>{preventDeletion ? 'Locked Item(s) Selected!' : `${selectedRowKeys.length} Items Selected`}</SelectionLabel>
      <HeaderSeparator/>
      <HeaderButton danger={false} disabled={editableRowIndex !== null || selectedRowKeys.length === 0} onClick={() => setVariableLock(selectedRowKeys, false)}>Unlock</HeaderButton>
      <HeaderButton danger={false} disabled={editableRowIndex !== null || selectedRowKeys.length === 0} onClick={() => setVariableLock(selectedRowKeys, true)}>Lock</HeaderButton>
      <HeaderButton danger={true} disabled={editableRowIndex !== null || selectedRowKeys.length === 0 || preventDeletion} onClick={() => deleteVariables(selectedRowKeys)}>Delete</HeaderButton>
    </SearchContainer>
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
        allowClear
        onChange={(e) => {
          debounce(setFilter(e.target.value || undefined), 200);
        }}
        onClick={(e: React.MouseEvent<HTMLElement>) => stopPropegation(e)}
        placeholder={`Search ${id}...`}
        value={filterValue || ''}
      />
    </FilterDropdown>
  );
}

export function Table(tableProps: React.PropsWithChildren<ITableProps>) {
  const {
    data,
    columns,
    setPage,
    totalPages,
    setSearchQuery,
    skipPageReset,
    setSkipPageReset,
    editableRowIndex,
    setEditableRowIndex,
    validationError,
    setValidationError,
    setColumnSorters,
    setColumnFilters,
    modifyTableData,
    activeDropdown,
    setActiveDropdown,
    setSelectedRows,
    editVariable,
    deleteVariable,
    checkVariable,
    rowIndexToKey,
    loadVariables,
    deleteVariables,
    initialRowData,
    setInitialRowData,
    selectedRowKeys,
    preventDeletion,
    loading,
    setVariableLock
  } = tableProps;

  let { currentPage } = tableProps;

  if (currentPage === -1) {
    currentPage = 0;
  }

  const defaultColumn = {
    Filter: ColumnFilter,
    Cell: EditableCell,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    state: { selectedRowIds, filters, globalFilter, sortBy },
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
      validationError,
      editVariable,
      deleteVariable,
      checkVariable,
      rowIndexToKey,
      setValidationError,
      setEditableRowIndex,
      activeDropdown,
      setActiveDropdown,
      loadVariables,
      deleteVariables,
      initialRowData,
      setInitialRowData,
      selectedRowKeys,
      preventDeletion,
      setVariableLock,
      initialState: { pageIndex: currentPage },
      disableFilters: editableRowIndex !== null,
      disableSortBy: editableRowIndex !== null,
      disableGlobalFilter: editableRowIndex !== null,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          width: 48,
          minWidth: 48,
          maxWidth: 48,
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
                const element: HTMLInputElement = (document.getElementById('multiSelect') as HTMLInputElement);
                element.click();
              }
            }, [indeterminateCheckboxProps]);

            function onClick({ key }: { key: string }) {
              let newProps;
              switch (key) {
                case 'all':
                  newProps = {
                    headerProps: props,
                    checkIfRowIsSelectable: (row: Row) => true,
                    shouldSelectPage: true
                  };
                  setIndeterminateCheckboxProps(getConditionalSelectHeaderCheckboxProps({ ...newProps }));
                  break;

                case 'unlocked':
                  newProps = {
                    headerProps: props,
                    checkIfRowIsSelectable: (row: Row) => row.cells[5].value !== true,
                    shouldSelectPage: true
                  };
                  setIndeterminateCheckboxProps(getConditionalSelectHeaderCheckboxProps({ ...newProps }));
                  break;

                case 'locked':
                  newProps = {
                    headerProps: props,
                    checkIfRowIsSelectable: (row: Row) => row.cells[5].value === true,
                    shouldSelectPage: true
                  };
                  setIndeterminateCheckboxProps(getConditionalSelectHeaderCheckboxProps({ ...newProps }));
                  break;
              }
            };

            const menu = (
              <Menu onClick={onClick}>
                <Menu.Item key="all">All</Menu.Item>
                <Menu.Item key="unlocked">Unlocked</Menu.Item>
                <Menu.Item key="locked">Locked</Menu.Item>
              </Menu>
            );

            return (
              <>
                <IndeterminateCheckbox id="multiSelect" {...indeterminateCheckboxProps} disabled={editableRowIndex !== null} />
                <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
                  <SelectDropdownButton>
                    <DownOutlined />
                  </SelectDropdownButton>
                </Dropdown>
              </>
            );
          },
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} disabled={editableRowIndex !== null} />
            </div>
          ),
        },
        ...columns,
        {
          accessor: 'Actions',
          id: 'actions',
          Header: 'Actions',
          disableFilters: true,
          disableSortBy: true,
          width: 320,
          minWidth: 320,
          maxWidth: undefined,
          Cell: ({ row, setEditableRowIndex, editableRowIndex, validationError, rowIndexToKey, editVariable, deleteVariable, initialRowData, setInitialRowData, modifyTableData }) => (
            <CellActionContainer>
              <ActionButton
                disabled={validationError || editableRowIndex !== null}
                onClick={() => {
                  const id: number = rowIndexToKey(row.index);
                  const updatedRow = row.values;
                  editVariable(id.toString(), updatedRow.name, updatedRow.value, !updatedRow.preventDeletion);
                }}
                style={{ minWidth: 96.69 }}
              >
                {row.values.preventDeletion ? 'Unlock' : 'Lock'}
              </ActionButton>
              <ActionButton
                disabled={validationError || (editableRowIndex !== null && editableRowIndex !== row.index)}
                onClick={() => {
                  const currentIndex = row.index;
                  if (editableRowIndex !== currentIndex) {
                    setInitialRowData(row.values);
                    setEditableRowIndex(currentIndex);
                    setValidationError(null);
                  } else {
                    setEditableRowIndex(null);
                    const updatedRow = row.values;
                    const id: number = rowIndexToKey(row.index);
                    editVariable(id.toString(), updatedRow.name, updatedRow.value, updatedRow.preventDeletion);
                    setSkipPageReset(false);
                    setInitialRowData(null);
                  }
                }}
                style={{ minWidth: 82.71 }}
              >
                {editableRowIndex !== row.index ? 'Edit' : 'Save'}
              </ActionButton>
              <ActionButtonDanger
                disabled={(validationError && validationError.row !== row.index) || (editableRowIndex !== null && editableRowIndex !== row.index) || (row.values.preventDeletion === true && editableRowIndex !== row.index)}

                onClick={() => {
                  const currentIndex = row.index;
                  if (editableRowIndex !== currentIndex) {
                    const id: number = rowIndexToKey(row.index);
                    deleteVariable(id);
                  } else {
                    setEditableRowIndex(null);
                    setValidationError(null);
                    setSkipPageReset(false);
                    if (initialRowData !== null) {
                      const index: number = rowIndexToKey(row.index);
                      modifyTableData(index, 'name', initialRowData.name);
                      modifyTableData(index, 'value', initialRowData.value);
                    }
                    setInitialRowData(null);
                    loadVariables();
                  }
                }}
                style={{ minWidth: 96 }}
              >
                {editableRowIndex !== row.index ? 'Delete' : 'Cancel'}
              </ActionButtonDanger>
            </CellActionContainer>
          ),
        },
      ]);
    }
  );

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
  }, [selectedRowIds]);

  useEffect(() => {
    if (sortBy.length > 0) {
      const updatedSorters: IColumnSorter = {};

      for (let i = 0; i < sortBy.length; i++) {
        if (sortBy[i].desc === false) {
          updatedSorters[sortBy[i].id] = 'ASC';
        } else {
          updatedSorters[sortBy[i].id] = 'DESC';
        }
      }

      setColumnSorters(updatedSorters);
    } else {
      setColumnSorters({});
    }
  }, [sortBy]);

  useEffect(() => {
    if (filters.length > 0) {
      const updatedFilters: IColumnFilter = {};

      for (let i = 0; i < filters.length; i++) {
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
      document.addEventListener('click', hideDropdown);
    } else {
      document.removeEventListener('click', hideDropdown);
    }

    return () => {
      document.removeEventListener('click', hideDropdown);
    };
  }, [activeDropdown]);

  function hideDropdown(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.dropdown')) {
      setActiveDropdown('');
    }
  }

  function toggleDropdown(e: React.MouseEvent<HTMLElement>, columnId: string) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (activeDropdown === columnId) {
      setActiveDropdown('');
    } else {
      setActiveDropdown(columnId);
    }
  }

  //TODO: Table - Use functions to return & render table elements.

  // Render the UI for your table
  return (
    <>
      <GlobalFilter
        deleteVariables={deleteVariables}
        editableRowIndex={editableRowIndex}
        globalFilter={globalFilter}
        loading={loading}
        loadVariables={loadVariables}
        preGlobalFilteredRows={preGlobalFilteredRows}
        preventDeletion={preventDeletion}
        selectedRowKeys={selectedRowKeys}
        setGlobalFilter={setGlobalFilter}
        setVariableLock={setVariableLock}
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
                      title: undefined,
                      style: {
                        width: column.width !== undefined ? column.width : '',
                        minWidth: column.minWidth !== undefined ? column.width : '',
                        maxWidth: column.maxWidth !== undefined ? column.maxWidth : '',
                      },
                    })
                  )}
                >
                  {column.canFilter ? column.render('Filter') : null}
                  <CollumnHeaderContainer>
                    {column.render('Header')}
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
                    {column.canSort ? (
                      <SortIndicatorContainer displace={!column.canFilter} >
                        <SortIndicatorAsc isSorted={column.isSorted} isSortedDesc={column.isSortedDesc} >
                          <CaretUpFilled />
                        </SortIndicatorAsc>
                        <SortIndicatorDesc isSortedDesc={column.isSortedDesc} >
                          <CaretDownFilled />
                        </SortIndicatorDesc>
                      </SortIndicatorContainer>
                    ) : null}

                    {i !== 0 && i + 1 !== headerGroup.headers.length ? (
                      <Separator displace={!column.canFilter && !column.canSort}/>
                    ) : null}
                  </CollumnHeaderContainer>
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
                      {cell.render('Cell')}
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

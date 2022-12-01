import styled from 'styled-components';

import IndeterminateCheckbox from './IndeterminateCheckbox';

import React, { useEffect, useRef, useState } from 'react';

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

import { SearchOutlined, DownOutlined, CaretDownFilled, CaretUpFilled, ExclamationCircleFilled } from '@ant-design/icons';

import { Dropdown, Input, Menu, Tooltip, Button, Empty } from 'antd';

import { debounce } from '../services/util/debounce';
import { getConditionalSelectHeaderCheckboxProps } from '../services/GetConditionalSelectHeaderCheckboxProps';
import { useIsOverflow } from '../hooks/useIsOverflow';

//TODO: Move all of the styled components to another file.

const FixedTable = styled.table`
  table-layout: fixed;
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

const SearchContainer = styled.div<{ reloadDisabled: boolean, loading: boolean }>`
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
  padding: 6px;
  align-items: center;
  align-content: center;
  flex-direction: row;
  justify-content: flex-start;

  .ant-btn {
    height: unset;
    display: inline;
    margin-left: 5px;
    margin-right: 5px;
    padding: 7px 15px;
    border: none;
    border-radius: 3px;
    background-color: ${({ reloadDisabled, loading }) => reloadDisabled || loading ? '#696969' : '#007bff' };
    transition: 0.3ms;

    ::before {
      background-color: unset;
    }

    ::after {
      display: none;
    }

    :hover {
      background-color: ${({ reloadDisabled, loading }) => reloadDisabled || loading ? '#696969' : '#0f83ff'};
    }

    :active {
      background-color: ${({ reloadDisabled, loading }) => reloadDisabled || loading ? '#696969' : '#0071eb'};
    }
  }

  .ant-btn span {
    color: #fff;
    font-weight: 700;
  }

  .ant-btn span span svg path {
    color: #fff;
  }

  .ant-input-affix-wrapper {
    width: 15%;
    margin: 4px 5px 4px 4px;
    border-radius: 3px;

    input {
      font-size: 16px;
    }
  }
`;

const SearchLabel = styled.span`
  font-size: 16px;
  color: #000000d9;
  font-weight: 400;
  font-family: 'Raleway',sans-serif;
  margin-left: 5px;
  margin-right: 5px;
`;

const SelectionLabel = styled.div`
  font-size: 16px;
  margin-left: 5px;
  margin-right: 5px;
`;

const ActionButton = styled.button<{ danger?: boolean }>`
  color: #fff;
  background-color: ${({ danger }) => danger ? '#dc3545' : '#007bff'};
  border-color: ${({ danger }) => danger ? '#dc3545' : '#007bff'};
  border-radius: 3px;
  display: inline;
  margin-right: ${({ danger }) => danger ? '' : '5px'};
  transition: 0.3ms;

  :disabled {
    cursor: not-allowed;
    background-color: #696969;

    :hover {
      background-color: #696969;
    }

    :active {
      background-color: #696969;
    }
  }

  :hover {
    background-color: ${({ danger }) => danger ? '#df4958' : '#0f83ff'};
  }

  :active {
    background-color: ${({ danger }) => danger ? '#d92638' : '#0071eb'};
  }
`;

const HeaderButton = styled.button<{ danger: boolean }>`
  color: #fff;
  background-color: ${({ danger }) => danger ? '#dc3545' : '#007bff'};
  border-color:${({ danger }) => danger ? '#dc3545' : '#007bff'};
  border-radius: 3px;
  display: inline;
  margin-right: 5px;
  margin-left: 5px;
  padding: 7px 15px;
  transition: 0.3ms;

  :disabled {
    cursor: not-allowed;
    background-color: #696969;

    :hover {
      background-color: #696969;
    }

    :active {
      background-color: #696969;
    }
  }

  :hover {
    background-color: ${({ danger }) => danger ? '#df4958' : '#0f83ff'};
  }

  :active {
    background-color: ${({ danger }) => danger ? '#d92638' : '#0071eb'};
  }
`;

const HeaderSeparator = styled.div`
  width: 1px;
  height: 1.6rem;
  background-color: rgba(0, 0, 0, 0.06);
  z-index: 100;
  margin-left: 5px;
  margin-right: 5px;
`;

const Separator = styled.div<{ displace: boolean | null }>`
  width: 1px;
  height: 1.6em;
  margin-right: -16px;
  margin-left: ${({ displace }) => displace ? 'auto' : '16px'};
  background-color: rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s;
  z-index: 100;
`;

const SortIndicatorContainer = styled.span<{ displace: boolean | undefined }>`
    font-size: 17px;
    min-width: 34px;
    margin-left: ${({ displace }) => displace ? 'auto' : '5px'};
`;

const SortIndicatorAsc = styled.div<{ isSorted: boolean; isSortedDesc?: boolean }>`
    opacity: ${({ isSorted, isSortedDesc }) => isSorted && !isSortedDesc ? 1 : 0.3};
    display: inline-block;

    span svg path {
      color: ${({ isSorted, isSortedDesc }) => isSorted && !isSortedDesc ? '#1890ff' : 'black'};
    }
`;

const SortIndicatorDesc = styled.div<{ isSortedDesc: boolean | undefined; }>`
    opacity: ${({ isSortedDesc }) => isSortedDesc ? 1 : 0.3};
    display: inline-block;
    
    span svg path {
      color: ${({ isSortedDesc }) => isSortedDesc ? '#1890ff' : 'black'};
    }
`;

const FilterDropdownButton = styled.span<{ isFiltered: boolean; }>`
  color: ${({ isFiltered }) => isFiltered ? '#1890ff' : '#bfbfbf'};

  padding: 0 4px;

  margin-left: auto;

  border-radius: 2px;

  transition: all 0.3s;

  cursor: pointer;

  :hover {
    color: ${({ isFiltered }) => isFiltered ? '#1890ff' : '#00000073'};
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

const CellInputContainer = styled.div<{ validationError?: IValidationError | null, columnId: String }>`
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  font-size: 14px;
  line-height: 1.5715;
  transition: all 0.3s;
  display: inline-flex;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;

  border-color: ${({ validationError, columnId }) => (validationError && (validationError.name || validationError.isUnique) && columnId === 'name') || (validationError && validationError.value && columnId === 'value') ? 'rgb(255, 77, 79)' : ''};

  :hover {
    border-color: ${({ validationError, columnId }) => (validationError && (validationError.name || validationError.isUnique) && columnId === 'name') || (validationError && validationError.value && columnId === 'value') ? 'rgb(255, 77, 79)' : '#40a9ff'};
  }

  :focus-within {
    z-index: 1;
    border-color: ${({ validationError, columnId }) => (validationError && (validationError.name || validationError.isUnique) && columnId === 'name') || (validationError && validationError.value && columnId === 'value') ? 'rgb(255, 77, 79)' : '#40a9ff'};
    box-shadow: ${({ validationError, columnId }) => (validationError && (validationError.name || validationError.isUnique) && columnId === 'name') || (validationError && validationError.value && columnId === 'value') ? '0px 0px 0px 2px rgb(255 77 79 / 20%)' : '0 0 0 2px rgb(24 144 255 / 20%);'};
  }

  input {
    padding: 0;
    border: none;
    outline: none;
    box-shadow: none;

    :focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
`;

const CellInputSuffixContainer = styled.span<{ validationError?: IValidationError | null, columnId: String }>`
  margin-left: 4px;
  display: flex;
  flex: none;
  align-items: center;

  span {
    visibility: ${({ validationError, columnId }) => (validationError && (validationError.name || validationError.isUnique) && columnId === 'name') || (validationError && validationError.value && columnId === 'value') ? '' : 'hidden'};
  }

  span svg path {
    color: rgb(255,77,79);
  }
`;

const CellValue = styled.div<{ hasOverflow: boolean | undefined }>`
  overflow-x: auto;
  overflow-wrap: normal;

  margin-bottom: ${({ hasOverflow }) => hasOverflow ? '-10px' : ''};

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
`;

const NoData = styled.div`
  background-color: #ffffff00;
  padding: 16px 0px;
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

  const [errorMessage, setErrorMessage] = useState<string>('');

  const ref = useRef(null);

  const hasOverflow = useIsOverflow(ref, editableRowIndex);

  async function validateInput(value:string) {
    const nameIsNotUnique: string = 'Name is not unique';
    const nameIsTooShort: string = 'Name is too short';
    const nameIsTooLong: string = 'Name is too long';

    const valueIsTooShort: string = 'Value is too short';
    const valueIsTooLong: string = 'Value is too long';

    if (id === 'name') {
      if (!value || value.length > 250) {
        if (validationError) {
          const error: IValidationError = { ...validationError };
          error.name = true;

          setErrorMessage(value ? nameIsTooLong : nameIsTooShort);
          setValidationError({ ...error });
          return;
        }

        const error: IValidationError = {
          row: index,
          isUnique: false,
          name: true,
          value: false
        };

        setErrorMessage(value ? nameIsTooLong : nameIsTooShort);
        setValidationError({ ...error });
        return;
      }

      const key: number = rowIndexToKey(index);

      const isUnique: boolean = await checkVariable(value, key.toString());

      if (!isUnique) {
        if (validationError) {
          const error: IValidationError = { ...validationError };
          error.isUnique = true;

          setErrorMessage(nameIsNotUnique);
          setValidationError({ ...error });
          return;
        }

        const error: IValidationError = {
          row: index,
          isUnique: true,
          name: false,
          value: false
        };

        setErrorMessage(nameIsNotUnique);
        setValidationError({ ...error });
        return;
      }

      if (validationError) {
        const error: IValidationError = { ...validationError };

        if (error.value) {
          error.name = false;
          error.isUnique = false;

          setErrorMessage('');
          setValidationError({ ...error });
          return;
        }

        setErrorMessage('');
        setValidationError(null);
      }
    }

    if (id === 'value') {
      if (!value || value.length > 250) {
        if (validationError) {
          const error: IValidationError = { ...validationError };
          error.value = true;

          setErrorMessage(value ? valueIsTooLong : valueIsTooShort);
          setValidationError({ ...error });
          return;
        }

        const error: IValidationError = {
          row: index,
          isUnique: false,
          name: false,
          value: true
        };

        setErrorMessage(value ? valueIsTooLong : valueIsTooShort);
        setValidationError({ ...error });
        return;
      }

      if (validationError) {
        const error: IValidationError = { ...validationError };

        if (error.name || error.isUnique) {
          error.value = false;

          setErrorMessage('');
          setValidationError({ ...error });
          return;
        }

        setErrorMessage('');
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
        autoComplete={'off'}
        id={`${index}-${id}`}
        onBlur={onBlur}
        onChange={(e) =>{
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        value={value} />
      <CellInputSuffixContainer columnId={id} validationError={validationError}>
        <Tooltip title={errorMessage} >
          <ExclamationCircleFilled />
        </Tooltip>
      </CellInputSuffixContainer>
    </CellInputContainer>
  ) : (
    <CellValue hasOverflow={hasOverflow} ref={ref}>{value}</CellValue>
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
    <SearchContainer loading={loading} reloadDisabled={editableRowIndex !== null}>
      <Button disabled={editableRowIndex !== null} loading={loading} onClick={() => loadVariables()}>Reload</Button>
      <HeaderSeparator/>
      <SearchLabel>Search:{' '}</SearchLabel>
      <Input
        allowClear
        bordered={true}
        disabled={editableRowIndex !== null}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
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
              <ActionButton
                danger={true}
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
              </ActionButton>
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
      <FixedTable {...getTableProps()}>
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
      </FixedTable>
      {data.length === 0 &&
      <NoData>
        <Empty description={globalFilter || filters.length > 0 ? 'No Results' : 'No Data'} image={Empty.PRESENTED_IMAGE_SIMPLE}/>
      </NoData>
      }
    </>
  );
}

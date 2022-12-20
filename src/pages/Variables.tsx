import styled from 'styled-components';

import { ITableProps, IColumnFilter, IValidationError } from '../components/TableInterfaces';

import { Pagination } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';

import { HTTP, IVariable } from '../services/http';
import { OptionsContext } from '../services/optionsContext';

import { Table } from '../components/Table';

import { Column } from 'react-table';

const PaginationWrapper = styled.div`
  padding: 10px 0px;
  right: 0;
  position: absolute;
`;

export const Variables: FC = () => {
  const options = useContext(OptionsContext);

  const [variables, setVariables] = useState<Array<IVariable>>([]);

  const [skipPageReset, setSkipPageReset] = useState<boolean>(false);

  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [initialRowData, setInitialRowData] = useState<{} | null>(null);

  const [validationError, setValidationError] = useState<IValidationError | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageNumber, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [columnFilters, setColumnFilters] = useState<IColumnFilter>({});

  const [sortedColumn, setSortedColumn] = useState<string>('');
  const [sortType, setSortType] = useState<string>('');

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeDropdown, setActiveDropdown] = useState<string>('');

  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string | number>>([]);
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);

  const [preventDeletion, setPreventDeletion] = useState<boolean>(false);

  const columns: Column[] = [
    {
      Header: 'Created',
      accessor: 'createdAt',
      disableFilters: true,
      width: 220,
      minWidth: 220,
      maxWidth: undefined
    },
    {
      Header: 'Updated',
      accessor: 'updatedAt',
      disableFilters: true,
      width: 220,
      minWidth: 220,
      maxWidth: undefined
    },
    {
      Header: 'Name',
      accessor: 'name',
      width: undefined,
      minWidth: undefined,
      maxWidth: undefined
    },
    {
      Header: 'Value',
      accessor: 'value',
      width: undefined,
      minWidth: undefined,
      maxWidth: undefined
    },
    {
      id: 'preventDeletion',
      accessor: 'preventDeletion',
      Header: 'Status',
      Cell: ({ value }) => value ? 'Locked' : 'Unlocked',
      disableFilters: true,
      width: 150,
      minWidth: 150,
      maxWidth: undefined
    },
  ];

  const modifyTableData = (index: any, id: any, value: any) => {
    setSkipPageReset(true);

    setVariables(variables.map((v, rowIndex) => {
      if (index === rowIndex) {
        return {
          ...v,
          [id]: value,
        };
      }
      return v;
    })
    );
  };

  const loadVariables = async () => {
    setLoading(true);

    const filteredColumns: string[] = Object.keys(columnFilters);
    const filterValues: string[] = Object.values(columnFilters);

    const http = new HTTP(options);

    const responseData = await http.getVariables(pageNumber, pageSize, filteredColumns, filterValues, sortedColumn, sortType, searchQuery);

    setPageCount(responseData.pageCount);
    setTotalEntries(responseData.totalEntries);

    const vars = responseData.variables;

    setVariables(
      vars.map((v) => {
        return {
          ...v,
          key: v.id,
          createdAt: new Date(v.createdAt).toLocaleString(),
          updatedAt: new Date(v.updatedAt).toLocaleString(),
        };
      })
    );

    setLoading(false);
  };

  const checkVariable = async (name: string, id: string) : Promise<boolean> => {
    const http = new HTTP(options);
    const response = await http.checkVariable(name, id);

    return response.isUnique;
  };

  async function setVariableLock(ids: Array<string | number>, lock: boolean) {
    const http = new HTTP(options);
    await Promise.all(ids.map((id) => {
      return http.lockVariable(id.toString(), lock);
    }));
    loadVariables();
  }

  async function deleteVariables(ids: Array<string | number>) {
    const http = new HTTP(options);
    await Promise.all(ids.map((id) => {
      return http.deleteVariable(id.toString());
    }));
    loadVariables();
    setSelectedRowKeys([]);
  }

  async function deleteVariable(id: string) {
    const http = new HTTP(options);

    await http.deleteVariable(id);
    loadVariables();
  }

  async function editVariable(id: string, name: string, value: string, preventDeletion: boolean) {
    const http = new HTTP(options);

    await http.editVariable(id, name, value, preventDeletion);
    loadVariables();
  }

  function rowIndexToKey(index: number) {
    if (variables[index]) {
      return variables[index].id;
    }

    return -1;
  }

  useEffect(() => {
    if (editableRowIndex === null) {
      loadVariables();
    }
  }, [pageNumber, pageSize, sortedColumn, sortType, columnFilters, searchQuery]);

  useEffect(() => {
    if (selectedRows.length > 0){
      const keys: string[] = [];

      let locked: boolean = false;

      for (let i = 0; i < selectedRows.length; i++) {
        const id = Number.parseInt(selectedRows[i]);
        keys[i] = variables[id].id;

        if (variables[id].preventDeletion) {
          locked = true;
        }
      }

      setPreventDeletion(locked);
      setSelectedRowKeys(keys);
    }
    else {
      setPreventDeletion(false);
      setSelectedRowKeys([]);
    }
  }, [selectedRows]);

  const tableProps: ITableProps = {
    columns: columns,
    data: variables,

    pageSize: pageSize,
    setPageSize: setPageSize,

    currentPage: pageNumber,
    setPage: setPage,

    totalPages: pageCount,

    columnFilters: columnFilters,
    setColumnFilters: setColumnFilters,

    sortedColumn: sortedColumn,
    setSortedColumn: setSortedColumn,

    sortType: sortType,
    setSortType: setSortType,

    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,

    activeDropdown: activeDropdown,
    setActiveDropdown: setActiveDropdown,

    skipPageReset: skipPageReset,
    setSkipPageReset: setSkipPageReset,

    editableRowIndex: editableRowIndex,
    setEditableRowIndex: setEditableRowIndex,

    initialRowData: initialRowData,
    setInitialRowData: setInitialRowData,

    validationError: validationError,
    setValidationError: setValidationError,

    setSelectedRows: setSelectedRows,

    selectedRowKeys: selectedRowKeys,
    rowIndexToKey: rowIndexToKey,

    modifyTableData: modifyTableData,

    editVariable: editVariable,
    deleteVariable: deleteVariable,
    checkVariable: checkVariable,

    preventDeletion: preventDeletion,

    loading: loading,

    loadVariables: loadVariables,
    deleteVariables: deleteVariables,

    setVariableLock: setVariableLock,
  };

  function onChange(pageNumber: number, pageSize: number) {
    setPage(pageNumber);
    setPageSize(pageSize);
  }

  return (
    <div>
      <div className="ant-table">
        <div className="ant-table-container">
          <div className="ant-table-content">
            <Table {...tableProps} />
          </div>
        </div>
        <PaginationWrapper>
          <Pagination defaultCurrent={1} disabled={editableRowIndex !== null} onChange={onChange} showQuickJumper showSizeChanger size="default" total={totalEntries} />
        </PaginationWrapper>
      </div>
    </div>
  );
};

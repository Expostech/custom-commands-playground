import { IVariable } from '../services/http';

import { Column } from 'react-table';

export interface ITableProps {
    columns: Column[],
    data: IVariable[],

    pageSize: number,
    setPageSize: Function,

    currentPage: number,
    setPage: Function,

    totalPages: number,

    searchQuery: string,
    setSearchQuery: Function,

    activeDropdown: string,
    setActiveDropdown: Function,

    columnFilters: IColumnFilter,
    setColumnFilters: Function,

    columnSorters: IColumnSorter,
    setColumnSorters: Function,

    skipPageReset: boolean,
    setSkipPageReset: Function,

    editableRowIndex: number | null,
    setEditableRowIndex: Function,

    validationError: IValidationError | null,
    setValidationError: Function,

    setSelectedRows: Function,
    selectedRowKeys: Array<string | number>,

    setInitialRowData: Function,
    initialRowData: {} | null,

    preventDeletion: boolean,

    modifyTableData: Function,

    editVariable: Function,
    deleteVariable: Function,
    checkVariable: Function,

    loading: boolean,

    loadVariables: Function,
    deleteVariables: Function,

    rowIndexToKey: Function,

    setVariableLock: Function,
}

export interface IColumnFilter {
    [columnId: string]: string;
}

export interface IColumnSorter {
    [columnId: string]: string;
}

export interface IEditableCellProps {
    value: any;
    row: any;
    column: any;
    modifyTableData: Function;
    editableRowIndex: Number | null;
    validationError: boolean;
    setValidationError: Function;
    checkVariable: Function;
    rowIndexToKey: Function;
}

export interface IValidationError {
    row: number,
    name: boolean,
    value: boolean,
    isUnique?: boolean | undefined
}

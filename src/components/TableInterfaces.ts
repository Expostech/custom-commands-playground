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

    validationError: number,
    setValidationError: Function,

    setSelectedRows: Function,

    modifyTableData: Function,

    editVariable: Function,
    
    deleteVariable: Function,

    checkVariable: Function,

    rowIndexToKey: Function,
}

export interface IColumnFilter {
    [columnId: string]: string;
}

export interface IColumnSorter {
    [columnId: string]: string;
}
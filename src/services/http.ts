import axios, { AxiosRequestConfig } from 'axios';

import { IOptionsContext } from './optionsContext';

export interface IVariable {
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  preventDeletion: boolean;
}

export interface IExecution {
  data: Record<string, never>;
  errors: Array<string>;
  reason: string;
  results: Array<string>;
  template: Array<string>;
  timestamp: string
}

export interface IResponseData {
  variables: Array<IVariable>;
  pageCount: number;
  totalEntries: number;
}

export interface IVariableCheckData {
  isUnique: boolean;
}

export class HTTP {
  constructor(protected options: IOptionsContext) { }

  getBaseUrl() {
    return new URL(
      process.env.REACT_APP_CSMM_URL
        ? `${process.env.REACT_APP_CSMM_URL}/api/playground`
        : `${window.location.protocol}//${window.location.host}/api/playground`
    );
  }

  getUrl(path: string) {
    const url = this.getBaseUrl();
    url.pathname = `${url.pathname}${path}`;
    url.searchParams.append('serverId', this.options.serverId);
    return url;
  }

  async getVariables(page: number, pageSize: number, filteredColumns: string[], columnFilters: string[], sortedColumn: string, columnSortType: string, searchQuery: string): Promise<IResponseData> {
    const config: AxiosRequestConfig = {
      params: {
        page: page,
        pageSize: pageSize,
        filteredColumns: filteredColumns,
        columnFilters: columnFilters,
        sortedColumn: sortedColumn,
        columnSortType: columnSortType,
        searchQuery: searchQuery
      }
    };

    const response = await axios.get(this.getUrl('/variable').toString(), config);

    return response.data.result;
  }

  async checkVariable(name: string, id: string): Promise<IVariableCheckData> {
    const config: AxiosRequestConfig = {
      params: {
        id: id,
        name: name,
      }
    };

    const response = await axios.get(this.getUrl('/variable/check').toString(), config);

    return response.data;
  }

  async lockVariable(id: string, lock: boolean) {
    const data = {
      id: id,
      lock: lock
    };

    const response = await axios.put(this.getUrl('/variable/lock').toString(), data);
    return response.data;
  }

  async editVariable(id: string, name: string, value: string, preventDeletion: boolean) {
    const data = {
      id: id,
      name: name,
      value: value,
      preventDeletion: preventDeletion,
    };

    await axios.put(this.getUrl(`/variable/${id}`).toString(), data);
    return;
  }

  async deleteVariable(id: string): Promise<void> {
    await axios.delete(this.getUrl(`/variable/${id}`).toString());
    return;
  }

  async getExecutions(): Promise<Array<IExecution>> {
    const response = await axios(this.getUrl('/executions').toString());
    return response.data.executions;
  }

  async executeTemplate(template: string, data: Record<string, any>): Promise<{ output: string[], errors: string[] }> {
    const response = await axios
      .post(this.getUrl('/execute').toString(), { template, data });
    return response.data;
  }
}

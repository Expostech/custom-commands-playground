import axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'querystring';

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
    url.searchParams.append('serverId', '1');
    return url;
  }

  async getVariables(page: number, pageSize: number, filteredColumns: string[], columnFilters: string[], sortedColumns: string[], columnSortTypes: string[], searchQuery: string): Promise<IResponseData> {
    const config: AxiosRequestConfig = {
      params: {
        page: page,
        pageSize: pageSize,
        filteredColumns: filteredColumns,
        columnFilters: columnFilters,
        sortedColumns: sortedColumns,
        columnSortTypes: columnSortTypes,
        searchQuery: searchQuery
      }
    };

    const response = await axios.get(this.getUrl('/variable').toString(), config);

    console.log(response.data.result);

    return response.data.result;
  }

  async editVariable(id: string, name: string, value: string, preventDeletion: boolean) {
    const data = {
        id: id,
        name: name,
        value: value,
        preventDeletion: preventDeletion,
    }

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

  async executeTemplate(template: string, data: Record<string, any>): Promise<{output: string[], errors: string[]}> {
    const response = await axios
      .post(this.getUrl('/execute').toString(), { template, data });
    return response.data;
  }
}

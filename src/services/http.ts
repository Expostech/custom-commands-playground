import axios from 'axios';

import { IOptionsContext } from './optionsContext';

export interface IVariable {
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  id: string;
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

  async getVariables(): Promise<Array<IVariable>> {
    const response = await axios(this.getUrl('/variable').toString());
    return response.data.variables;
  }

  async deleteVariable(id: string): Promise<void> {
    await axios.delete(this.getUrl(`/variable/${id}`).toString());
    return;
  }

  async executeTemplate(template: string, data: Record<string, any>): Promise<{output: string[], errors: string[]}> {
    const response = await axios
      .post(this.getUrl('/execute').toString(), { template, data });
    return response.data;
  }
}

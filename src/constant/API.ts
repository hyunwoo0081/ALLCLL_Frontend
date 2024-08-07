import CheckFetchError, {IErrorTypes} from './CheckFetchError.ts';
import FetchException from './FetchException.ts';
import AuthControl from './AuthControl.ts';

type IBody = Record<string, unknown>

const API = {
  async fetch(url: string, method: string = 'GET', body: IBody = {}, errors: Array<IErrorTypes|FetchException>) {
    let reqData :object = {
      method: method,
      headers: AuthControl.getHeader(),
      credentials: 'omit',
    }

    if (method !== 'GET')
      reqData = {
        ...reqData,
        body: JSON.stringify(body),
      }
    else {
      const params = new URLSearchParams(body as Record<string, string>);
      if (params.toString() !== '')
        url += '?' + params.toString();
    }

    const response = await fetch(url, reqData);

    if (!response.ok) {
      await CheckFetchError(response, errors);
    }

    return response;
  },
  async fetch2Json(url: string, method: string = 'GET', body: IBody = {}, errors: Array<IErrorTypes|FetchException>) {
    const response = await this.fetch(url, method, body, errors);
    
    return await response.json();
  },
  async fetch2Text(url: string, method: string = 'GET', body: IBody = {}, errors: Array<IErrorTypes|FetchException>) {
    const response = await this.fetch(url, method, body, errors);

    return await response.text();
  },
}

export default API;
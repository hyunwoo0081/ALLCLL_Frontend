import {NavigateFunction} from 'react-router-dom';
import CheckFetchError, {IErrorTypes} from './CheckFetchError.ts';
import AuthControl from './AuthControl.ts';

interface IBody {
  [key: string]: any;
}

const API = {
  async fetch(url: string, method: string = 'GET', body: IBody = {}, errors: IErrorTypes[], navigate: NavigateFunction) {
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
      const params = new URLSearchParams(body);
      if (params.toString() !== '')
        url += '?' + params.toString();
    }

    const response = await fetch(url, reqData);

    if (!response.ok) {
      await CheckFetchError(response, errors, navigate);
    }

    return response;
  },
  async fetch2Json(url: string, method: string = 'GET', body: IBody = {}, errors: IErrorTypes[], navigate: NavigateFunction) {
    const response = await this.fetch(url, method, body, errors, navigate);
    
    return await response.json();
  },
  async fetch2Text(url: string, method: string = 'GET', body: IBody = {}, errors: IErrorTypes[], navigate: NavigateFunction) {
    const response = await this.fetch(url, method, body, errors, navigate);

    return await response.text();
  },
}

export default API;
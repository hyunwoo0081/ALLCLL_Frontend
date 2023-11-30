import {NavigateFunction} from 'react-router-dom';
import CheckFetchError, {IErrorTypes} from './CheckFetchError.ts';
import AuthControl from './AuthControl.ts';

interface IBody {
  [key: string]: any;
}

const API = {
  async fetch2Json(url: string, method: string = 'GET', body: IBody = {}, errors: IErrorTypes[], navigate: NavigateFunction) {
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

    const response = await fetch(url, reqData);
    
    if (!response.ok) {
      await CheckFetchError(response, errors, navigate);
    }
    
    return await response.json();
  },
}

export default API;
import {IErrorTypes} from './CheckFetchError.ts';
import API from './API.ts';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default class ApiBuilder {
  url: string;
  method: Method;
  body: object;
  errors: IErrorTypes[];
  
  constructor(url: string, method: Method, body: object) {
    this.url = url;
    this.method = method;
    this.body = body;
    this.errors = [];
  }
  
  addErrorType(errorBody: string, errorMessage: string, action?: () => void) {
    this.errors.push({errorBody, errorMessage, action});
  }
  
  fetch2Json() {
    return API.fetch2Json(this.url, this.method, this.body, this.errors, () => {});
  }
  
  fetch2Text() {
    return API.fetch2Text(this.url, this.method, this.body, this.errors, () => {});
  }
}
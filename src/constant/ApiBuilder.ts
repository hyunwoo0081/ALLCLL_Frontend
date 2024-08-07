import {IErrorTypes} from './CheckFetchError.ts';
import FetchException from './FetchException.ts';
import API from './API.ts';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default class ApiBuilder {
  url: string;
  method: Method;
  body: Record<string, unknown>;
  errors: Array<IErrorTypes|FetchException>;
  
  constructor(url: string, method: Method, body: Record<string, unknown>) {
    this.url = url;
    this.method = method;
    this.body = body;
    this.errors = [];
  }
  
  addErrorType(errorBody: string, errorMessage: string, action?: () => void) {
    this.errors.push({errorBody, errorMessage, action});
  }

  addException(exception: FetchException) {
    this.errors.push(exception);
  }
  
  fetch2Json() {
    return API.fetch2Json(this.url, this.method, this.body, this.errors);
  }
  
  fetch2Text() {
    return API.fetch2Text(this.url, this.method, this.body, this.errors);
  }
}
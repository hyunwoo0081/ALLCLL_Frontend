import {FetchErrorPriority} from './FetchError.ts';

export default class FetchException {
  public readonly status: number;
  public readonly errorCode: string;
  public readonly priority: FetchErrorPriority;
  public action?: () => void;

  constructor(status: number, errorCode: string, priority: FetchErrorPriority, action?: () => void) {
    this.status = status;
    this.errorCode = errorCode;
    this.priority = priority;
    this.action = action;
  }

  same(status: number, errorCode: string) {
    return this.status === status && this.errorCode === errorCode;
  }
}
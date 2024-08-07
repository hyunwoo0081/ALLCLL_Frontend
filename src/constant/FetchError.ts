export type FetchErrorPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export default class FetchError extends Error {
  public readonly priority: FetchErrorPriority;
  public readonly errorCode: string;

  constructor(errorCode: string, message: string, priority: FetchErrorPriority) {
    super(message.replace('. ', '.\n'));

    this.name = 'FetchError';
    this.errorCode = errorCode;
    this.priority = priority;
  }
}
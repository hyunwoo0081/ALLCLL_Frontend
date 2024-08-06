export type FetchErrorPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export default class FetchError extends Error {
  public priority: FetchErrorPriority;

  constructor(message: string, priority: FetchErrorPriority) {
    super(message.replace('. ', '.\n'));

    this.name = 'FetchError';
    this.priority = priority;
  }
}
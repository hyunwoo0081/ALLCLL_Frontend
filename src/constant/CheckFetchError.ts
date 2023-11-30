import {NavigateFunction} from 'react-router-dom';
import AuthControl from './AuthControl.ts';

export interface IErrorTypes {
  errorBody: string;
  errorMessage: string;
  action?: () => void;
}

async function CheckFetchError(response: Response, errorTypes: IErrorTypes[], navigate: NavigateFunction) {
  const message = await response.text();

  if (response.ok)
    return response;

  if (response.status === 401)
    AuthControl.logout(navigate);

  errorTypes.forEach((errorType) => {
    if (errorType.errorBody === message) {
      if (errorType.action)
        errorType.action();

      throw new Error(errorType.errorMessage);
    }
  });

  throw new Error(message ? message : '알 수 없는 오류가 발생했습니다.');
}

export default CheckFetchError;
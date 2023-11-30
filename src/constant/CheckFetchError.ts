import {NavigateFunction} from 'react-router-dom';
import AuthControl from './AuthControl.ts';

export interface IErrorTypes {
  errorBody: string;
  errorMessage: string;
  action?: () => void;
}

async function CheckFetchError(response: Response, errorTypes: IErrorTypes[], navigate: NavigateFunction) {
  if (response.ok)
    return response;

  if (response.status === 403) {
    AuthControl.logout(navigate);
    throw new Error('로그인이 필요합니다');
  }

  const message = await response.text();
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
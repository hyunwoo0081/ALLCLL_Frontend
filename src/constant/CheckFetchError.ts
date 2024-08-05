import {NavigateFunction} from 'react-router-dom';
import AuthControl from './AuthControl.ts';
import CheckStringType from './CheckStringType.ts';

export interface IErrorTypes {
  errorBody: string;
  errorMessage: string;
  action?: () => void;
}

async function CheckFetchError(response: Response, errorTypes: IErrorTypes[], navigate: NavigateFunction) {
  if (response.ok)
    return response;

  // Fixme: 403 error handling - 권한이 없다고 로그아웃은 괜찮은가
  if (response.status === 403) {
    alert('권한이 없습니다\n다시 로그인 해주세요');
    AuthControl.logout(navigate, '/login');
    throw new Error('로그인이 필요합니다');
  }

  const req = await response.text();
  const message = CheckStringType.isJSON(req) ?
    JSON.parse(req).message :
    req.replace(/(<([^>]+)>)/gi, "");
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
import FetchException from './FetchException.ts';
import CheckStringType from './CheckStringType.ts';
import FetchError from './FetchError.ts';

export interface IErrorTypes {
  errorBody: string;
  errorMessage: string;
  action?: () => void;
}

async function CheckFetchError(response: Response, errorTypes: Array<IErrorTypes|FetchException>) {
  if (response.ok)
    return response;

  const req = await response.text();
  const resJson = CheckStringType.isJSON(req) ?
    JSON.parse(req) :
    {message: req.replace(/(<([^>]+)>)/gi, '')};

  errorTypes.forEach((errorType) => {
    if ('errorBody' in errorType && errorType.errorBody === resJson.message ||
        errorType instanceof FetchException && errorType.same(response.status, resJson.errorCode)) {
      if (errorType.action)
        errorType.action();

      if (errorType instanceof FetchException)
        throw new FetchError(resJson.message, errorType.priority);
      else
        throw new FetchError(errorType.errorMessage, 'HIGH');
    }
  });

  throw new FetchError(resJson ? resJson.message : '알 수 없는 오류가 발생했습니다.', 'HIGH');
}

export default CheckFetchError;
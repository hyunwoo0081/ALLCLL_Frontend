import {useEffect, useState} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import {useNavigate} from 'react-router-dom';
import {IErrorTypes} from '../../constant/CheckFetchError.ts';
import API from '../../constant/API.ts';
import '@styles/dialog/MacroDialog.scss';

interface IMacroDialog {
  isOpen: boolean;
  closeDialog: () => void;
  playId: number;
}

function FinishDialog({isOpen, closeDialog, playId}: IMacroDialog) {
  const navigate = useNavigate();
  const [contents, setContents] = useState({
    takenTime: '00:00:00.00',
    numberOfCoursesToRegister: 0,
    numberOfRegisteredCourses: 0,
    registeredCoursesDetails: '',
  });
  
  useEffect(() => {
    if (!isOpen) {
      setContents({
        takenTime: '00:00:00.00',
        numberOfCoursesToRegister: 0,
        numberOfRegisteredCourses: 0,
        registeredCoursesDetails: '',
      });
      return;
    }

    const Errors: IErrorTypes[] = [
      {errorBody: 'Mock did not terminate successfully', errorMessage: '종료되지 않은 시뮬레이션입니다', action: closeDialog},
    ]
    API.fetch2Json(`/api/v2/mock/result?playId=${playId}`, 'GET', {}, Errors, navigate)
      .then((res) => setContents(res));
  }, [isOpen]);

  return (
    <DialogTemplate isOpen={isOpen}>
      <div className='dialog_header'>
        <h2>수강신청 결과</h2>
        <button onClick={closeDialog}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body finish_dialog'>
        <h2>{contents.takenTime}</h2>
        <div>
          <p>수강신청을 완료했습니다.</p>
          <p>신청 완료 수 : {contents.numberOfRegisteredCourses}/{contents.numberOfCoursesToRegister}</p>
          <p>신청 완료 과목 : {contents.registeredCoursesDetails}</p>
        </div>
      </div>
      <div className='dialog_footer'>
        <button onClick={closeDialog}>획인</button>
      </div>
    </DialogTemplate>
  );
}

export default FinishDialog;
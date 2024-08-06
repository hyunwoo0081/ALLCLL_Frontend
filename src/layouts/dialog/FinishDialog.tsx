import {useEffect, useState} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import {IErrorTypes} from '../../constant/CheckFetchError.ts';
import {getTimerString} from '../../constant/TimeString.ts';
import {ApplyDialogType, ISimulationDialog} from '../../constant/types.ts';
import API from '../../constant/API.ts';
import '@styles/dialog/MacroDialog.scss';


function FinishDialog({useSimulation}: ISimulationDialog) {
  const [contents, setContents] = useState({
    takenTime: '00:00:00.00',
    numberOfCoursesToRegister: 0,
    numberOfRegisteredCourses: 0,
    registeredCoursesDetails: '',
  });

  const {dialogType, simulationId: playId, stopStep, stepError} = useSimulation;
  
  useEffect(() => {
    if (dialogType !== ApplyDialogType.FINISHED) {
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
    API.fetch2Json('/api/v2/mock/result', 'GET', {playId}, Errors)
      .then((res) => setContents(res))
      .catch((err) => {
        stepError(err.message);
        console.error(err)
      });
  }, [dialogType]);

  function closeDialog() {
    stopStep();
  }

  return (
    <DialogTemplate isOpen={dialogType === ApplyDialogType.FINISHED}>
      <div className='dialog_header'>
        <h2>수강신청 결과</h2>
        <button onClick={closeDialog} tabIndex={-1}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body finish_dialog'>
        <h2 className='timer'>{getTimerString(contents.takenTime)}</h2>
        <div>
          <p>수강신청을 완료했습니다.</p>
          <p>신청 완료 수 : {contents.numberOfRegisteredCourses}/{contents.numberOfCoursesToRegister}</p>
          <p>신청 완료 과목 : {contents.registeredCoursesDetails}</p>
        </div>
      </div>
      <div className='dialog_footer'>
        <button onClick={closeDialog}>확인</button>
      </div>
    </DialogTemplate>
  );
}

export default FinishDialog;
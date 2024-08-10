import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import DialogTemplate from '@layouts/DialogTemplate.tsx';
import {getTimerString} from '@constant/TimeString.ts';
import {ApplyDialogType, ISimulationDialog} from '@constant/types.ts';
import Controller from '@constant/Controller.ts';
import '@styles/dialog/MacroDialog.scss';


function FinishDialog({useSimulation}: ISimulationDialog) {
  const navigate = useNavigate();
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

    Controller.getMockResult(playId, navigate)
      .then((res) => setContents(res))
      .catch((err) => {
        stepError(err.message);
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
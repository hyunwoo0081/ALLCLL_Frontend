import DialogTemplate from '../DialogTemplate.tsx';
import {useNavigate} from 'react-router-dom';
import {ApplyDialogType, ISimulationDialog} from '../../constant/types.ts';
import API from '../../constant/API.ts';
import '@styles/dialog/MacroDialog.scss';

function SubjectApplyDialog({useSimulation}: ISimulationDialog) {
  const navigate = useNavigate();

  const {dialogType, selectedSubject, macroNumber, nextStep, stopStep, stepError} = useSimulation;
  
  function submit() {
    const playId = Number(localStorage.getItem('playId'));
    const {courseId, classId, offeringDepartment} = selectedSubject!;

    if (isNaN(playId)) {
      stepError('시뮬레이션을 찾을 수 없습니다.', true);
      return;
    }

    if (!selectedSubject) {
      stepError('선택 된 과목을 찾을 수 없습니다\n다시 시도해주세요.');
      return;
    }

    const request = {
      playId,
      answer: macroNumber,
      courseId,
      classId,
      offeringDepartment
    }

    const Errors = [
      {errorBody: 'Mock not found', errorMessage: '수강신청이 존재하지 않습니다', action: closeDialog},
      {errorBody: 'Course not found', errorMessage: '존재하지 않는 과목입니다', action: closeDialog},
      {errorBody: 'Registered already', errorMessage: '이미 신청된 과목입니다', action: () => nextStep(ApplyDialogType.DONE)},
      {errorBody: 'Captcha authentication failed', errorMessage: '캡챠 인증 실패', action: () => nextStep(ApplyDialogType.MACRO_FAILED)},
    ];
    API.fetch2Json('/api/v2/mock/register', 'POST', request, Errors, navigate)
      .then((res) => {
        console.log(res);
        if (res.succeed)
          nextStep(ApplyDialogType.SUCCESS, res.finished);
        else
          nextStep(ApplyDialogType.FAILED, res.finished);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function closeDialog() {
    stopStep();
  }

  return (
    <DialogTemplate isOpen={dialogType === ApplyDialogType.APPLY}>
      <div className='dialog_header'>
        <h2></h2>
        <button onClick={closeDialog} tabIndex={-1}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body apply_dialog_body'>
        <div>
          <img src='/CheckRing.svg' alt=''/>
          <span>선택한 과목을 수강신청하시겠습니까?</span>
          <span>교과목명(Course Title): {selectedSubject ? selectedSubject.courseTitle : '<???>'}</span>
        </div>
      </div>
      <div className='dialog_footer'>
        <button className='cancel' onClick={closeDialog}>취소</button>
        <button onClick={submit}>확인</button>
      </div>
    </DialogTemplate>
  );
}

export default SubjectApplyDialog;
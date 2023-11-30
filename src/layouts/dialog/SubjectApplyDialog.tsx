import DialogTemplate from '../DialogTemplate.tsx';
import '@styles/dialog/MacroDialog.scss';
import {ApplyType} from '../../constant/types.ts';

interface IMacroDialog {
  isOpen: boolean;
  closeDialog: () => void;
  nextStep: (_?:ApplyType) => void;
  subjectName: string;
}

function SubjectApplyDialog({isOpen, closeDialog, nextStep, subjectName}: IMacroDialog) {
  function submit() {
    nextStep(ApplyType.SUCCESS);
  }

  return (
    <DialogTemplate isOpen={isOpen}>
      <div className='dialog_header'>
        <h2></h2>
        <button onClick={closeDialog}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body apply_dialog_body'>
        <div>
          <img src='/sample.png' alt=''/>
          <span>선택한 과목을 수강신청하시겠습니까?</span>
          <span>교과목명(Course Title): {subjectName}</span>
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
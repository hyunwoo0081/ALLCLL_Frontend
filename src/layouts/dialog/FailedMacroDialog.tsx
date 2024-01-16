import DialogTemplate from '../DialogTemplate.tsx';
import '@styles/dialog/MacroDialog.scss';

interface IMacroDialog {
  isOpen: boolean;
  closeDialog: () => void;
}

function FailedMacroDialog({isOpen, closeDialog}: IMacroDialog) {
  function submit() {
    closeDialog();
  }

  // Todo: 이거 작성
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
          <img src='/CheckRing.svg' alt=''/>
          <span>과목이 신청되었습니다. 수강신청내역을 재 조회 하시겠습니까?</span>
          <span>취소를 선택하실 경우 [수강신청내역]이 갱신되지 않습니다</span>
          <span>취소를 선택하실 경우 수강신청 최종 완료 후 반드시 [수강신청내역] 재조회를 눌러 신청내역을 확인하세요. [수강신청내역]에 조회된 과목만이 정상적으로 수강신청된 과목입니다</span>
        </div>
      </div>
      <div className='dialog_footer'>
        <button onClick={submit}>확인</button>
      </div>
    </DialogTemplate>
  );
}

export default FailedMacroDialog;
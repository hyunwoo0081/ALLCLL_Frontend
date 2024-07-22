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

  return (
    <DialogTemplate isOpen={isOpen}>
      <div className='dialog_header'>
        <h2></h2>
        <button onClick={closeDialog} tabIndex={-1}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body apply_dialog_body'>
        <div>
          <img src='/CloseRing.svg' alt=''/>
          <span>입력된 코드가 일치하지 않습니다</span>
        </div>
      </div>
      <div className='dialog_footer'>
        <button onClick={submit}>확인</button>
      </div>
    </DialogTemplate>
  );
}

export default FailedMacroDialog;
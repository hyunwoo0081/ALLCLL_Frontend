import DialogTemplate from '../DialogTemplate.tsx';
import '@styles/dialog/MacroDialog.scss';

interface IMacroDialog {
  isOpen: boolean;
  closeDialog: () => void;
}

function ApplyFailDialog({isOpen, closeDialog}: IMacroDialog) {
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
          <span>이미 수강신청된 과목입니다!</span> <br/> <br/> <br/> <br/> <br/>
        </div>
      </div>
      <div className='dialog_footer'>
        <button onClick={closeDialog}>획인</button>
      </div>
    </DialogTemplate>
  );
}

export default ApplyFailDialog;
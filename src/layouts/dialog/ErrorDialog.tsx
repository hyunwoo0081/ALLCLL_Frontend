import {Fragment} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import {ApplyDialogType, ISimulationDialog} from '../../constant/types.ts';
import '@styles/dialog/MacroDialog.scss';


function ErrorDialog({useSimulation}: ISimulationDialog) {
  const {dialogType, errorMessage, stopStep} = useSimulation;

  function closeDialog() {
    stopStep();
  }

  return (
    <DialogTemplate isOpen={dialogType === ApplyDialogType.ERROR}>
      <div className='dialog_header'>
        <h2></h2>
        <button onClick={closeDialog} tabIndex={-1}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body apply_dialog_body'>
        <div>
          <img src='/CloseRing.svg' alt=''/>

          <span>오류가 발생하였습니다</span>
          <br/>

          {errorMessage.split('\n').map((line, index) => (
            <Fragment key={index}>
              <span>{line}</span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className='dialog_footer'>
        <button onClick={closeDialog}>확인</button>
      </div>
    </DialogTemplate>
  );
}

export default ErrorDialog;
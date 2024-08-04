import DialogTemplate from '../DialogTemplate.tsx';
import {ApplyDialogType, ISimulationDialog} from '../../constant/types.ts';
import '@styles/dialog/MacroDialog.scss';


function FailedMacroDialog({useSimulation}: ISimulationDialog) {
  const {dialogType, stopStep} = useSimulation;

  return (
    <DialogTemplate isOpen={dialogType === ApplyDialogType.MACRO_FAILED}>
      <div className='dialog_header'>
        <h2></h2>
        <button onClick={() => stopStep()} tabIndex={-1}>
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
        <button onClick={() => stopStep()}>확인</button>
      </div>
    </DialogTemplate>
  );
}

export default FailedMacroDialog;
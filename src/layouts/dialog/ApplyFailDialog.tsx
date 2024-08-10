import DialogTemplate from '@layouts/DialogTemplate.tsx';
import {ApplyDialogType, ISimulationDialog} from '@constant/types.ts';
import '@styles/dialog/MacroDialog.scss';


function ApplyFailDialog({useSimulation}: ISimulationDialog) {
  const {dialogType, stopStep} = useSimulation;
  
  return (
    <DialogTemplate isOpen={dialogType === ApplyDialogType.FAILED}>
      <div className='dialog_header'>
        <h2></h2>
        <button onClick={() => stopStep()} tabIndex={-1}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body apply_dialog_body'>
        <div>
          <img src='/CloseRing.svg' alt=''/>
          <span>수강여석이 없습니다!</span> <br/> <br/> <br/> <br/>
        </div>
      </div>
      <div className='dialog_footer'>
        <button onClick={() => stopStep()}>확인</button>
      </div>
    </DialogTemplate>
  );
}

export default ApplyFailDialog;
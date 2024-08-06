import React, {useEffect, useState} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import {ApplyDialogType, ISimulationDialog} from '../../constant/types.ts';
import {IErrorTypes} from '../../constant/CheckFetchError.ts';
import CheckStringType from '../../constant/CheckStringType.ts';
import API from '../../constant/API.ts';
import '@styles/dialog/MacroDialog.scss';

function MacroDialog({useSimulation}: ISimulationDialog) {
  const [captcha, setCaptcha] = useState<string>('');

  const {dialogType, macroNumber, simulationId,
    updateMacroNumber, nextStep, stopStep, stepError} = useSimulation;

  useEffect(() => {
    if (dialogType !== ApplyDialogType.MACRO) return;

    setCaptcha('');
    refreshCaptcha(simulationId);
  }, [dialogType]);

  function changeMacroNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    updateMacroNumber(
      value.replace(/[^0-9]/g, '').slice(0, 4)
    );
  }
  
  // Fixme: 다른 시뮬레이션 강제 종료 기간 외 다른 에러 발생 시, 강제 종료 해야하는지 확인 필요
  function refreshCaptcha(playId: number) {
    const Errors: IErrorTypes[] = [
      {errorBody: 'Mock not found', errorMessage: '시뮬레이션을 찾을 수 없습니다.\n시뮬레이션을 초기화 합니다.'},
    ]

    API.fetch2Json('/api/v2/mock/captcha', 'GET',
      {playId}, Errors)
      .then((res) => setCaptcha(res.image))
      .catch((err) => {
        stepError(err.message, true);
      });
  }
  
  function submit() {
    if (!CheckStringType.captcha(macroNumber)) {
      alert('코드를 입력해주세요');
      return;
    }

    nextStep(ApplyDialogType.APPLY);
  }
  
  function closeDialog() {
    stopStep();
  }

  return (
    <DialogTemplate isOpen={dialogType == ApplyDialogType.MACRO}>
      <div className='dialog_header'>
        <h2>매크로방지 코드 입력</h2>
        <button onClick={closeDialog} tabIndex={-1}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body macro_dialog_body'>
        <div>
          <div>
            <div className='header_flex'>
              <h3>생성된 코드</h3>
              <button className='image_button' onClick={() => refreshCaptcha(simulationId)}>
                <img src='/Refresh.svg' alt=''/>
              </button>
            </div>
            {!captcha ? (
              <span>코드를 생성중입니다</span>
            ) : (
              <img className='captcha' src={captcha} alt=''/>
            )}
          </div>
          <div>
            <h3>코드 입력</h3>
            <input type='text'
                   placeholder='코드입력'
                   value={macroNumber}
                   onChange={changeMacroNumber}/>
          </div>
        </div>
      </div>
      <div className='dialog_footer'>
        <button onClick={submit}>코드입력</button>
        <button className='cancel' onClick={closeDialog}>취소</button>
      </div>
    </DialogTemplate>
  );
}

export default MacroDialog;
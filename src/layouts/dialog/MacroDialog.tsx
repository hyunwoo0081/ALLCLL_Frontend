import React, {useEffect, useState} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import {ApplyType} from '../../constant/types.ts';
import CheckStringType from '../../constant/CheckStringType.ts';
import API from '../../constant/API.ts';
import '@styles/dialog/MacroDialog.scss';

interface IMacroDialog {
  isOpen: boolean;
  closeDialog: () => void;
  nextStep: (_?:ApplyType) => void;
  playId: number,
  macroNumber: string,
  setMacroNumber: (_:string) => void,
}

function MacroDialog({isOpen, closeDialog, nextStep, playId, macroNumber, setMacroNumber}: IMacroDialog) {
  const [captcha, setCaptcha] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setMacroNumber('');
    setCaptcha('');
    
    if (!isOpen) return;
    
    refreshCaptcha();
  }, [isOpen]);

  function captchaRestrict(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setMacroNumber(value.replace(/[^0-9]/g, '').slice(0, 4));
  }

  function refreshCaptcha() {
    API.fetch2Json('/api/v2/mock/captcha', 'GET', {playId}, [], () => {})
      .then((res) => setCaptcha(res.image))
      .catch((err) => setErrorMessage(err.message));
  }
  
  function submit() {
    if (!CheckStringType.captcha(macroNumber)) {
      alert('코드를 입력해주세요');
      return;
    }

    nextStep();
  }

  return (
    <DialogTemplate isOpen={isOpen}>
      <div className='dialog_header'>
        <h2>매크로방지 코드 입력</h2>
        <button onClick={closeDialog}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body macro_dialog_body'>
        <div>
          <div>
            <div className='header_flex'>
              <h3>생성된 코드</h3>
              <button className='image_button' onClick={refreshCaptcha}>
                <img src='/Refresh.svg' alt=''/>
              </button>
            </div>
            {errorMessage ? (
              <span>{errorMessage}</span>
            ) : !captcha ? (
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
                   onChange={captchaRestrict}/>
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
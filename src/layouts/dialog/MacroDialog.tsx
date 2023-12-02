import {useEffect, useState} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import {ApplyType} from '../../constant/types.ts';
import API from '../../constant/API.ts';
import '@styles/dialog/MacroDialog.scss';

interface IMacroDialog {
  isOpen: boolean;
  closeDialog: () => void;
  nextStep: (_?:ApplyType) => void;
}

function MacroDialog({isOpen, closeDialog, nextStep}: IMacroDialog) {
  const [authCode, setAuthCode] = useState<string>('');
  const [captcha, setCaptcha] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setAuthCode('');
    
    if (!isOpen) return;
    
    refreshCaptcha();
  }, [isOpen]);

  function refreshCaptcha() {
    API.fetch2Json('/api/v2/mock/captcha', 'GET', {}, [], () => {})
      .then((res) => setCaptcha(res.image))
      .catch((err) => setErrorMessage(err.message));
  }
  
  function submit() {
    if (!authCode) {
      alert('코드를 입력해주세요');
      return;
    }

    API.fetch('/api/v2/mock/captcha/check', 'POST', {authCode}, [], () => {})
      .then((res) => {
        console.log(res);
        nextStep();
      })
      .catch((err) => console.error(err))
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
              <button className='image_button'>
                <img src='/Close.svg' alt=''/>
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
                   placeholder='코드를 입력하세요'
                   value={authCode}
                   onChange={e => setAuthCode(e.target.value)}/>
          </div>
        </div>
      </div>
      <div className='dialog_footer'>
        <button onClick={submit}>코드인증</button>
        <button className='cancel' onClick={closeDialog}>취소</button>
      </div>
    </DialogTemplate>
  );
}

export default MacroDialog;
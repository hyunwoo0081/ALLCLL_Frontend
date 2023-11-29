import {useEffect, useState} from 'react';
import DialogTemplate from '../DialogTemplate.tsx';
import '@styles/dialog/MacroDialog.scss';

interface IMacroDialog {
  isOpen: boolean;
  closeDialog: () => void;
  nextStep: (_?:boolean) => void;
}

function MacroDialog({isOpen, closeDialog, nextStep}: IMacroDialog) {
  const [authCode, setAuthCode] = useState<string>('');

  useEffect(() => {
    setAuthCode('');
  }, [isOpen]);
  
  function submit() {
    if (!authCode) {
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
            <h3>생성된 코드</h3>
            <img src='/sample.png' alt=''/>
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
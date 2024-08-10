import {useState} from 'react';
import DialogTemplate from '@layouts/DialogTemplate.tsx';
import '@styles/dialog/MacroDialog.scss';

interface IMacroDialog {
  isOpen: boolean;
  closeDialog: (dontShowAgain: boolean) => void;
  contents: string;
}

function NoticeDialog({isOpen, closeDialog, contents}: IMacroDialog) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  
  return (
    <DialogTemplate isOpen={isOpen}>
      <div className='dialog_header'>
        <h2>공지사항</h2>
        <button onClick={() => closeDialog(dontShowAgain)}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body apply_dialog_body'>
        <div dangerouslySetInnerHTML={{__html: contents}}></div>
      </div>
      <div className='dialog_footer space-between'>
        <div>
          <label htmlFor='donot_open_later'>
            <input id='donot_open_later'
                   type='checkbox'
                   checked={dontShowAgain}
                   onChange={e => setDontShowAgain(e.target.checked)}/>
            다시 보지 않기
          </label>
        </div>
        <button onClick={() => closeDialog(dontShowAgain)}>확인</button>
      </div>
    </DialogTemplate>
  );
}

export default NoticeDialog;
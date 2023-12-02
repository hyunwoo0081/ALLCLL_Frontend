import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useLoginErrorBox from '../hooks/useLoginErrorBox.tsx';
import {IErrorTypes} from '../constant/CheckFetchError.ts';
import AuthControl from '../constant/AuthControl.ts';
import API from '../constant/API.ts';

function NavModal({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const navigate = useNavigate();
  const [overflow, setOverflow] = useState<string>('auto');
  const [messageOpened, setMessageOpened] = useState<boolean>(false);
  const {setErrorMessage, ErrorBox} = useLoginErrorBox();

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape')
        closeDialog();
    }

    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('keydown', onEsc);
    }
  }, [closeDialog]);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      setMessageOpened(false);
      setOverflow(document.body.style.overflow ?? 'auto');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = overflow;
    }
  }, [isOpen]);

  function closeDialog() {
    setIsOpen(false);
  }

  function changePassword() {
    setErrorMessage('');

    const token = AuthControl.getInfoFromToken();
    if (!token) {
      setErrorMessage('로그인이 유효하지 않습니다');
      return;
    }

    const email = token?.sub;
    const Errors: IErrorTypes[] = [
      {errorBody: 'Email address not found', errorMessage: '가입되지 않은 이메일 입니다'},
      {errorBody: 'Invalid email format', errorMessage: '잘못된 메일 형식입니다'},
    ];
    API.fetch('/api/v2/auth/password/reset', 'POST', {email}, Errors, navigate)
      .then(() => {
        setMessageOpened(true);
        setTimeout(() => setMessageOpened(false), 3000);
      });
  }

  return !isOpen ? null : (
    <div className='dialog_background nav_dialog_background login_page'
         onClick={closeDialog}>
      <div className='dialog'
           onClick={e => e.stopPropagation()}>
        <h2>정보 수정</h2>

        {ErrorBox}

        {messageOpened && (
          <p className='message_box'>
            가입하신 이메일로 <br/>
            변경 링크를 전송했습니다
          </p>
        )}
        <button onClick={changePassword}>비밀번호 변경</button>
        <button onClick={changePassword}>로그아웃</button>
      </div>
    </div>
  )
}

export default NavModal;
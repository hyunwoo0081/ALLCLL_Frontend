import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import {IErrorTypes} from '../constant/CheckFetchError.ts';
import AuthControl from '../constant/AuthControl.ts';
// import API from '../constant/API.ts';

enum ToastView {
  CLOSED, TOAST_NORMAL, TOAST_ERROR
}
// const ToastClass = ['closed', 'normal', 'error'];

function NavModal({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const navigate = useNavigate();
  const [overflow, setOverflow] = useState<string>('auto');
  const [toastType, setToastType] = useState<ToastView>(ToastView.CLOSED);
  // const [toastMessage, setToastMessage] = useState<string>('');

  const token = AuthControl.getInfoFromToken();

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
      setToastType(ToastView.CLOSED);
      setOverflow(document.body.style.overflow ?? 'auto');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = overflow;
    }
  }, [isOpen]);

  useEffect(() => {
    if (toastType === ToastView.CLOSED) return;

    const timer = setTimeout(() => {
      setToastType(ToastView.CLOSED);
    }, 2500);

    return () => {clearTimeout(timer);}
  }, [toastType]);

  function closeDialog() {
    setIsOpen(false);
  }

  // function changePassword() {
  //   setToastType(ToastView.CLOSED);
  //
  //   if (!token) {
  //     toastErrorMessage('로그인이 유효하지 않습니다');
  //     return;
  //   }
  //
  //   const email = token?.sub;
  //   const Errors: IErrorTypes[] = [
  //     {errorBody: 'Email address not found', errorMessage: '가입되지 않은 이메일 입니다'},
  //     {errorBody: 'Invalid email format', errorMessage: '잘못된 메일 형식입니다'},
  //   ];
  //   API.fetch('/api/v2/auth/password/reset', 'POST', {email}, Errors, navigate)
  //     .then(toastSendMail);
  // }

  // function toastSendMail() {
  //   setToastType(ToastView.TOAST_NORMAL);
  //   setToastMessage('가입하신 이메일로 변경 링크를 발송했습니다');
  // }
  //
  // function toastErrorMessage(message: string) {
  //   setToastType(ToastView.TOAST_ERROR);
  //   setToastMessage(message);
  // }

  return (
    <>
      {/*<div className='toast_box'>*/}
      {/*  <p className={ToastClass[toastType]}>*/}
      {/*    {toastMessage}*/}
      {/*  </p>*/}
      {/*</div>*/}

      {isOpen && (
        <div className='dialog_background nav_dialog_background login_page'
             onClick={closeDialog}>
          <div className='dialog'
               onClick={e => e.stopPropagation()}>
            <ul>
              <li><span>{token.sub}</span></li>
              {/*<li><button onClick={changePassword}>비밀번호 변경</button></li>*/}
              <li><button onClick={() => AuthControl.logout(navigate)}>로그아웃</button></li>
            </ul>
          </div>
        </div>
      )
      }
    </>
  );
}

export default NavModal;
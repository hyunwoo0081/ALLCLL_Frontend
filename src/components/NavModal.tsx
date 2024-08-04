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

  const token = AuthControl.getInfoFromToken();
  const role = AuthControl.getRole();

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

  return (
    <>
      {isOpen && (
        <div className='dialog_background nav_dialog_background login_page'
             onClick={closeDialog}>
          <div className='dialog'
               onClick={e => e.stopPropagation()}>
            <ul>
              <li><span>{token.sub}</span></li>
              {role === 'ADMIN' &&
                <li>
                  <button onClick={() => window.open('/admin', '_blank')}>
                    관리자 페이지
                  </button>
                </li>
              }

              <li>
                <button onClick={() => navigate('/mypage')}>
                  마이 페이지
                </button>
              </li>
              <li>
                <button onClick={() => window.open('https://forms.gle/iKZeL6hZvCQzgGGc6', '_blank')}>오류 및 제안</button>
              </li>
              <li>
                <button onClick={() => AuthControl.logout(navigate)}>로그아웃</button>
              </li>
            </ul>
          </div>
        </div>
      )
      }
    </>
  );
}

export default NavModal;
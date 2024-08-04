import React from 'react';
import {useNavigate} from 'react-router-dom';
import DialogTemplate from '../DialogTemplate.tsx';
import {IErrorTypes} from '../../constant/CheckFetchError.ts';
import API from '../../constant/API.ts';
import AuthControl from '../../constant/AuthControl.ts';
import '@styles/dialog/MacroDialog.scss';

interface IDeleteUser {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function DeleteUserDialog({isOpen, setIsOpen}: IDeleteUser) {
  const navigate = useNavigate();
  
  function deleteUser() {
    // if ('string' == 'string') {
    //   stepError('선택 된 과목을 찾을 수 없습니다\n다시 시도해주세요.');
    //   return;
    // }

    const request = {};

    const Errors: IErrorTypes[] = [
      // {errorBody: 'Mock not found', errorMessage: '수강신청이 존재하지 않습니다', action: closeDialog},
    ];

    API.fetch('/api/v2/auth/user', 'DELETE', request, Errors, navigate)
      .then((res) => {
        if (res.ok) {
          alert('회원 탈퇴가 완료되었습니다');
          AuthControl.logout(navigate);
        }
        else {
          alert('회원 탈퇴에 실패했습니다');
        }
      })
      .catch((err) => {
        alert('회원 탈퇴에 실패했습니다');
        console.error(err);
      })
      .finally(() => closeDialog());
  }
  
  function closeDialog() {
    setIsOpen(false);
  }

  return (
    <DialogTemplate isOpen={isOpen}>
      <div className='dialog_header'>
        <h2>회원탈퇴</h2>
        <button onClick={closeDialog}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body apply_dialog_body'>
        <div>
          <span>
            <span style={{color: 'red'}}>회원탈퇴를 진행하시겠습니까?</span>
            <br/><br/>

            회원 탈퇴 시 회원정보가 삭제되며, <br/>
            회원 정보 복구가 불가능합니다
          </span>
        </div>
      </div>
      <div className='dialog_footer'>
        <button className='cancel' onClick={closeDialog}>취소</button>
        <button onClick={deleteUser}>확인</button>
      </div>
    </DialogTemplate>
  );
}

export default DeleteUserDialog;

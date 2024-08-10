import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import DialogTemplate from '@layouts/DialogTemplate.tsx';
import AuthControl from '@constant/AuthControl.ts';
import Controller from '@constant/Controller.ts';
import CheckStringType from '@constant/CheckStringType.ts';
import '@styles/dialog/MacroDialog.scss';

interface IDeleteUser {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function DeleteUserDialog({isOpen, setIsOpen}: IDeleteUser) {
  const navigate = useNavigate();
  
  const ref = useRef<HTMLInputElement>(null);
  const [password, setPassword] = React.useState<string>('');
  
  function deleteUser() {
    if (!CheckStringType.password(password)) {
      alert('비밀번호를 확인해주세요');
      ref.current?.focus();
      return;
    }

    Controller.unregister(password, navigate, () => {
      alert('비밀번호를 확인해주세요');
      ref.current?.focus();
    })
      .then(() => {
        closeDialog();
        alert('회원 탈퇴가 완료되었습니다');
        AuthControl.logout(navigate);
      })
      .catch(e => {
        if (e.priority === 'HIGH')
          alert('회원 탈퇴에 실패했습니다');
      });
  }
  
  function closeDialog() {
    setIsOpen(false);
    setPassword('');
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
            회원 정보 복구가 불가능합니다 <br/> <br/>
            이를 숙지하셨다면 비밀번호를 입력해주세요
          </span>
          
          <input type='password'
                 placeholder='비밀번호'
                 ref={ref}
                 value={password}
                 onChange={e => setPassword(e.target.value)}/>
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

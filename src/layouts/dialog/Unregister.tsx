import DialogTemplate from '../DialogTemplate.tsx';
import '@styles/dialog/MacroDialog.scss';

interface IMacroDialog {
  isOpen: boolean;
  closeDialog: () => void;
}

function Unregister({isOpen, closeDialog}: IMacroDialog) {
  function handleWithdrawal() {
    // TODO: 회원탈퇴 로직

    closeDialog();
  }

  return (
    <DialogTemplate isOpen={isOpen}>
      <div className='dialog_header'>
        <h2>회원탈퇴</h2>
        <button onClick={closeDialog}>
          <img src='/Close.svg' alt=''/>
        </button>
      </div>
      <div className='dialog_body'>
        <p>
          정말로 회원을 탈퇴하시겠습니까? <br/><br/>
          탈퇴 시, 모든 개인 정보와 수강신청 기록이 삭제되며, <br/>
          재가입 시에도 <span className='danger'><b>복구가 불가능</b></span>합니다. <br/><br/>
          탈퇴를 원하시면 아래 회원탈퇴 버튼을 클릭해주세요.
        </p>
      </div>
      <div className='dialog_footer'>
        <button onClick={handleWithdrawal}>회원탈퇴</button>
        <button className='cancel' onClick={closeDialog}>취소</button>
      </div>
    </DialogTemplate>
  );
}

export default Unregister;
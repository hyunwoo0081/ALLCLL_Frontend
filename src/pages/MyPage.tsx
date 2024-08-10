import {useState} from 'react';
// import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '@layouts/PageDefaultLayout.tsx';
// import useLoginErrorBox from '@hooks/useLoginErrorBox.tsx';
// import CheckFetchError from '@constant/CheckFetchError.ts';
// import CheckStringType from '@constant/CheckStringType.ts';
import DeleteUserDialog from '@layouts/dialog/DeleteUserDialog.tsx';

function MyPage() {
  // const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // const [fetching, setFetching] = useState<boolean>(false);
  // const [password, setPassword] = useState<string>('');
  // const [checkPassword, setCheckPassword] = useState<string>('');
  // const {setErrorMessage, ErrorBox} = useLoginErrorBox();
  //
  // const authCode = new URLSearchParams(window.location.search).get('authCode') ?? '';
  //
  // const PasswordInputRef = useRef<HTMLInputElement>(null);
  // const CheckPasswordInputRef = useRef<HTMLInputElement>(null);

  // function onEnter(e: KeyboardEvent) {
  //   if (e.key === 'Enter')
  //     refreshPassword();
  // }

  // function refreshPassword() {
  //   if (!CheckStringType.password(password)) {
  //     setErrorMessage('비밀번호가 적절하지 않습니다\n8~16자 문자 숫자로 입력해주세요');
  //     CheckPasswordInputRef.current?.blur();
  //     PasswordInputRef.current?.focus();
  //     return;
  //   }
  //
  //   if (password !== checkPassword) {
  //     setErrorMessage('비밀번호가 일치하지 않습니다');
  //     CheckPasswordInputRef.current?.blur();
  //     PasswordInputRef.current?.focus();
  //     return;
  //   }
  //
  //   setFetching(true);
  //   fetch('/api/v2/auth/password', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({authCode, password})
  //   }).then(async res => {
  //
  //     const errors = [
  //       {errorBody: 'Authentication failed', errorMessage: '잘못된 인증번호 입니다.'},
  //       {errorBody: 'Invalid password format', errorMessage: '비밀번호가 적절하지 않습니다\n8~16자 문자 숫자로 입력해주세요', action: () => PasswordInputRef.current?.focus()},
  //     ];
  //     await CheckFetchError(res, errors, navigate);
  //
  //     alert('비밀번호가 변경되었습니다');
  //     navigate('/', {replace: true});
  //   })
  //     .catch(e => setErrorMessage(e.message))
  //     .finally(() => setFetching(false));
  // }

  return (
    <>
      <DeleteUserDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}/>

      <PageDefaultLayout>
        <h1>마이페이지</h1>

        <h2>회원 탈퇴</h2>
        <div className='container_box'>
          <p>회원 탈퇴 시 저장된 관심과목, 모의 수강신청 결과 등의 회원정보가 삭제됩니다.</p>
          <button onClick={() => setIsDialogOpen(true)}>
            회원 탈퇴
          </button>
        </div>


        {/*<div className='login_layout'>*/}
        {/*  <h1>ALLCLL 비밀번호 변경</h1>*/}

        {/*  {ErrorBox}*/}

        {/*  <input type='password'*/}
        {/*         placeholder='비밀번호(8~16자 문자 숫자)'*/}
        {/*         ref={PasswordInputRef}*/}
        {/*         disabled={fetching}*/}
        {/*         value={password}*/}
        {/*         onKeyDown={onEnter}*/}
        {/*         onChange={e => setPassword(e.target.value)}/>*/}
        {/*  <input type='password'*/}
        {/*         placeholder='비밀번호 확인'*/}
        {/*         ref={CheckPasswordInputRef}*/}
        {/*         disabled={fetching}*/}
        {/*         value={checkPassword}*/}
        {/*         onKeyDown={onEnter}*/}
        {/*         onChange={e => setCheckPassword(e.target.value)}/>*/}

        {/*  <button onClick={refreshPassword} disabled={fetching}>로그인</button>*/}
        {/*</div>*/}
      </PageDefaultLayout>
    </>
  );
}

export default MyPage;
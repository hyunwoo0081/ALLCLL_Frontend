import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import {useState} from "react";
import Unregister from "../layouts/dialog/Unregister.tsx";

function MyPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <>
      <Unregister isOpen={isOpen} closeDialog={() => setIsOpen(false)}/>

      <PageDefaultLayout className=''>
        <h1>마이페이지</h1>
        <div className='container_box'>
          <h2>회원탈퇴</h2>
          <p className='canceled'>
            회원 탈퇴 시 자신의 수강 신청 기록과 분석 기록을 이용할 수 없으며, <br/>
            추후 재 가입 시에도 이용 기록을 복구할 수 없습니다
          </p>

          <button className='danger' onClick={() => setIsOpen(true)}>회원 탈퇴</button>
        </div>

      </PageDefaultLayout>
    </>
  );
}

export default MyPage;
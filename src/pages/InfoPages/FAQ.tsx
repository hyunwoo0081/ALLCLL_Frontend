import PageDefaultLayout from '@layouts/PageDefaultLayout.tsx';

function FAQ() {
  document.title = 'ALLCLL | FAQ';

  return (
    <PageDefaultLayout className=''>
      <h1>자주 묻는 질문</h1>
      <div className='container_box'>

        <ol>
          <li>
            <strong>Q: ALLCLL 수강신청 연습 사이트는 어떻게 이용하나요?</strong> <br/>
            A: ALLCLL 사이트에 접속한 후, 회원 가입을 완료하고 로그인한 후에 수강신청 연습을 시작할 수 있습니다. 메뉴에서 '수강신청 연습'을 선택하여 강의를 선택하고 수강신청을 진행하세요.
          </li>

          <li>
            <strong>Q: 회원 가입은 필수인가요?</strong> <br/>
            A: 네, 수강신청 연습을 위해서는 회원 가입이 필요합니다. 가입 후에는 개인 정보를 저장하고 수강신청 내역을 관리할 수 있습니다.
          </li>

          <li>
            <strong>Q: 어떤 강의를 선택해야 하나요?</strong> <br/>
            A: 수강신청 연습을 위해 다양한 과목과 강의가 제공됩니다. 자신이 실제로 신청하고 싶은 강의나 관심 있는 강의를 선택하여 연습할 수 있습니다.
          </li>

          <li>
            <strong>Q: 수강신청 연습 중에도 실제 수강신청과 똑같이 진행되나요?</strong> <br/>
            A: 네, ALLCLL 사이트에서의 수강신청 연습은 현실적인 환경을 모방하여 진행됩니다. 연습 중에는 예비 수강생 수 및 실제 수강생 수 등이 반영되어 실제 수강신청과 유사한 경험을 제공합니다.
          </li>

          <li>
            <strong>Q: 수강신청 연습 중에 오류가 발생하면 어떻게 해야 하나요?</strong> <br/>
            A: 오류 발생 시, 화면에 나타나는 안내를 확인하고 지시에 따라 조치하세요. 만약 문제가 지속된다면, <a href='https://forms.gle/iKZeL6hZvCQzgGGc6'>ALLCLL 고객 서비스</a>에 문의하여 도움을 받을 수 있습니다.
          </li>

          <li>
            <strong>Q: 어떻게 수강신청 결과를 확인하나요?</strong> <br/>
            A: 수강신청 연습이 완료되면, 마이페이지에서 수강신청 내역을 확인할 수 있습니다. 또한, 이메일이나 알림을 통해 결과를 받을 수도 있습니다.
          </li>

          <li>
            <strong>Q: ALLCLL 수강신청 연습 사이트에서는 어떤 기능을 제공하나요?</strong> <br/>
            A: ALLCLL은 다양한 강의 시간표 작성, 우선순위 설정, 강의 검색 등의 기능을 제공하여 실제 수강신청과 유사한 경험을 할 수 있도록 도와줍니다.
          </li>

          <li>
            <strong>Q: 연습 결과는 실제 수강신청에 영향을 미치나요?</strong> <br/>
            A: 아니요, 수강신청 연습은 연습용으로 제공되며, 실제 수강신청에는 영향을 미치지 않습니다. 결과를 통해 연습을 통한 경험을 쌓고, 필요 시 실제 수강신청에 반영할 수 있습니다.
          </li>
        </ol>

        이 FAQ가 도움이 되길 바라며, 수강신청 연습에서 성공을 기원합니다!
        
      </div>

    </PageDefaultLayout>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;
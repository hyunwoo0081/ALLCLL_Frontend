import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';

function Developers() {
  document.title = 'ALLCLL | 개발자 정보';

  return (
    <PageDefaultLayout className=''>
      <h1>개발자 정보</h1>
      <div className='container_box user_box'>
        <h3>3Juhwan</h3>
        <p>
          Backend Developer
        </p>
        <ul>
          <li><a href="https://github.com/3Juhwan">GITHUB</a></li>
        </ul>
      </div>

      <div className='container_box user_box'>
        <h3>hyunwoo0081</h3>
        <p>
        Frontend Developer
        </p>
        <ul>
          <li><a href="https://github.com/hyunwoo0081">GITHUB</a></li>
        </ul>
      </div>

    </PageDefaultLayout>
  );
}

export default Developers;
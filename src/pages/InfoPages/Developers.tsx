import PageDefaultLayout from '@layouts/PageDefaultLayout.tsx';
import {ReactNode, useEffect, useState} from 'react';
import '@styles/components/DevCard.scss';

function Developers() {
  document.title = 'ALLCLL | 개발자 정보';

  return (
    <PageDefaultLayout className=''>
      <h1>개발자 정보</h1>

      <div className='card_layout'>
        <DevCard GithubNickname='3Juhwan'
                 contents={
                   <>
                     Backend Developer <br/>
                     컴퓨터공학과 20 김주환
                   </>
                 }
                 links={[
                   {title: 'github', url: 'https://github.com/3Juhwan'},
                 ]}/>

        <DevCard GithubNickname='hyunwoo0081'
                 contents={
                   <>
                     Frontend Developer <br/>
                     컴퓨터공학과 19 채현우
                   </>
                 }
                 links={[
                   {title: 'github', url: 'https://github.com/hyunwoo0081'},
                   // {title: 'velog', url: 'https://github.com/hyunwoo0081'},
                 ]}/>
      </div>


    </PageDefaultLayout>
  );
}

interface ILink {
  title: string,
  url: string
}

interface IDevloperCard {
  GithubNickname: string,
  contents: ReactNode,
  links: ILink[]
}

const LINK_COLOR = '333333';

function DevCard({GithubNickname, contents, links}: IDevloperCard) {
  const [profileImage, setProfileImage] = useState<string>('');
  useEffect(() => {
    fetch(`https://api.github.com/users/${GithubNickname}`)
      .then(response => response.json())
      .then(data => setProfileImage(data.avatar_url));
  }, [GithubNickname]);

  return (
    <div className='container_box user_box'>
      <div>
        <img className='avatar' src={profileImage} alt=''/>
      </div>
      <div>
        <h3>{GithubNickname}</h3>
        <p>
          {contents}
        </p>
        <ul className='links'>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target='_blank'>
                <img src={`https://cdn.simpleicons.org/${link.title}/${LINK_COLOR}`}
                     alt={link.title}/>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Developers;
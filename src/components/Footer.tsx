import {useNavigate} from "react-router-dom";
import AuthControl from "../constant/AuthControl.ts";
import '@styles/components/Footer.scss';

const footerCenters = [
  {title: '개발자 정보', path: '/developer'},
  {title: '공지사항', path: '/notice'},
  {title: '자주 묻는 질문', path: '/faq'},
  {title: '개인정보이용약관', path: '/privacy', bold: true},
  {title: '오류 및 제안', path: 'https://forms.gle/iKZeL6hZvCQzgGGc6', target: '_blank'},
];

function Footer() {
  const navigate = useNavigate();

  return (
    <footer>
      <div className='responsive'>
        <div className='logo' tabIndex={0} onClick={() => navigate(AuthControl.getDefaultPage())}>
          <h2>ALLCLL</h2>
        </div>
        <span>세종대학교 수강신청 연습</span>

        <ul className='footer_right'>
          <li><strong>이메일: </strong>sejongallcll@gmail.com</li>
        </ul>

        <ul className='footer_center'>
          {footerCenters.map((center, index) => (
            <li key={index}>
              <a href={center.path} target={center.target ?? ''}>
                {center.bold ? <strong>{center.title}</strong> : center.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
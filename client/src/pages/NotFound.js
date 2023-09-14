import '../styles/notFound.css';
import autoNavi_Logo from '../img/autoNavi_Logo.jpg';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="component">
      <div className="notfst">
        <div>
          <img className="mainLogo" src={autoNavi_Logo} alt="main_logo" />
          <h1 className="notfound">404 Page Not Found</h1>
          <h2 className="notPageCom"> 페이지를 찾을 수 없습니다.</h2>
          <div className="comment">
            페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br></br>
            입력하신 주소가 정확한지 다시 한 번 확인해주세요.
          </div>
          <Link className="go_back" to={'/main'}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;

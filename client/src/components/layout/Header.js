import { Link } from 'react-router-dom';
import blueLogo from '../../img/bluelogo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../../styles/header.css';

const Header = () => {
  if (window.location.pathname === '/') return null;
  return (
    <header>
      <div className="logout-btn">
        <button className="btn-logout">
          Logout<> </>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>
      <div className="logo-h">
        <img className="h-logo" src={blueLogo} alt="" />
      </div>
      <div className="topnav" id="myTopnav">
        <Link to="/main" className="active">
          관제
        </Link>
        <Link to="/car/carlist">차량관리</Link>
        <Link to="/car/carreg">차량등록</Link>
      </div>
      <div className="logout-btn"></div>
    </header>
  );
};
export default Header;

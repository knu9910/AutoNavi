import { Link } from 'react-router-dom';
import blueLogo from '../../img/bluelogo.jpg';

const Header = () => {
  if (window.location.pathname === '/') return null;
  return (
    <header>
      <div className="logo-h">
        <img className="h-logo" src={blueLogo} alt="" />
      </div>
      <div className="topnav" id="myTopnav">
        <Link to="#" className="active">
          관제
        </Link>
        <div className="dropdown">
          <button className="dropbtn">
            차량관리
            <i className="fa-solid fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <Link to="#">운행중인 차량</Link>
            <Link to="/carlist">차량등록현황</Link>
          </div>
        </div>
        <Link to="/carrst">차량등록</Link>
      </div>
    </header>
  );
};
export default Header;

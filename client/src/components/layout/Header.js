import { Link, useNavigate, useParams } from 'react-router-dom';
import blueLogo from '../../img/bluelogo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../../styles/header.css';
import { useDispatch } from 'react-redux';
import { isLogout } from '../../store/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const storedRole = localStorage.getItem('role');

  if (
    window.location.pathname === '/' ||
    window.location.pathname === `/auth/adminedit/${id}` ||
    window.location.pathname === '/auth/adminReg'
  ) {
    return null;
  }

  const handleLogout = () => {
    // 로컬 스토리지에서 데이터 삭제
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('controlRights');

    dispatch(isLogout());

    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <header>
      <div>
        <div className="logout-btn">
          {storedRole === 'master' && (
            <Link to="/auth/adminList" className="link-admin">
              <button className="btn-admin">관리자</button>
            </Link>
          )}
          <div className="link-logout">
            <button className="btn-logout" onClick={handleLogout}>
              Logout
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </div>
        </div>
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
    </header>
  );
};
export default Header;

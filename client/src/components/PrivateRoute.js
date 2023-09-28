import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Toastify from './layout/Toastify';

const PrivateRoute = () => {
  const auth = useSelector((state) => state.userStore.auth);
  const role = useSelector((state) => state.userStore.role);
  const controlRights = useSelector((state) => state.userStore.controlRights);
  const location = useLocation();

  const storedUserId = localStorage.getItem('userId');
  const storedRole = localStorage.getItem('role');
  const storedControlRights = localStorage.getItem('controlRights');

  if (!auth && !storedUserId) {
    alert('로그인 후 이용가능합니다.');
    return <Navigate to="/auth/login" />;
  }

  const masterPaths = ['/auth/adminList', '/auth/adminEdit', '/auth/adminReg'];

  if (
    masterPaths.includes(location.pathname) &&
    (role !== 'master' || storedRole !== 'master')
  ) {
    alert('접근권한이 없습니다.');
    return <Navigate to="/main" />;
  }

  if (
    location.pathname === '/car/carreg' &&
    (controlRights !== '있음' || storedControlRights !== '있음')
  ) {
    alert('접근 권한이 없습니다.');
    return <Navigate to="/main" />;
  }

  return (
    <>
      <Outlet />
      <Toastify />
    </>
  );
};

export default PrivateRoute;

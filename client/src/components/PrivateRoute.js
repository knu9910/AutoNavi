import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Toastify from './layout/Toastify';
import TextToSpeech from './layout/TextToSpeech';

const PrivateRoute = () => {
  const auth = useSelector((state) => state.userStore.auth);
  const role = useSelector((state) => state.userStore.role);
  const location = useLocation();

  if (!auth) {
    alert('로그인 후 이용가능합니다.');
    return <Navigate to="/auth/login" />;
  }

  const masterPaths = ['/auth/adminList', '/auth/adminEdit', '/auth/adminReg'];

  if (masterPaths.includes(location.pathname) && role !== 'master') {
    alert('접근권한이 없습니다.');
    return <Navigate to="/main" />;
  }

  return (
    <>
      <Outlet />
      <Toastify />
      <TextToSpeech />;
    </>
  );
};

export default PrivateRoute;

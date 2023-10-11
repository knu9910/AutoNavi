import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Toastify from './layout/Toastify';
import { useEffect } from 'react';
import { getCarList } from '../store/carSlice';
import socket from '../soket';

const PrivateRoute = () => {
  const auth = useSelector((state) => state.userStore.auth);
  const role = useSelector((state) => state.userStore.role);
  const controlRights = useSelector((state) => state.userStore.controlRights);
  const location = useLocation();
  const dispatch = useDispatch();
  const storedUserId = localStorage.getItem('userId');
  const storedRole = localStorage.getItem('role');
  const storedControlRights = localStorage.getItem('controlRights');

  useEffect(() => {
    const handleDatabaseChange = (results) => {
      // Redux 액션을 디스패치합니다.
      dispatch(getCarList({ carList: results }));
    };

    // 웹 소켓 이벤트 리스너를 등록합니다.
    socket.on('databaseChange', handleDatabaseChange);

    // 컴포넌트 언마운트 시 웹 소켓 이벤트 리스너를 해제합니다.
    return () => {
      socket.off('databaseChange', handleDatabaseChange);
    };
  }, [dispatch]); // dispatch를 의존성 배열에 포함해야 합니다.

  if (!auth && !storedUserId) {
    alert('로그인 후 이용가능합니다.');
    return <Navigate to="/auth/login" />;
  }

  const masterPaths = ['/auth/adminList', '/auth/adminEdit', '/auth/adminReg'];

  if (
    masterPaths.includes(location.pathname) &&
    role !== 'master' &&
    storedRole !== 'master'
  ) {
    alert('접근권한이 없습니다.');
    return <Navigate to="/main" />;
  }

  if (
    location.pathname === '/car/carreg' &&
    controlRights !== '있음' &&
    storedControlRights !== '있음'
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

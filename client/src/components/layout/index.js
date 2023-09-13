import { Outlet } from 'react-router';
import Header from './Header';

const LayOut = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default LayOut;

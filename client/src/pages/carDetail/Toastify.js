import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

const Toastify = () => {
  // 목적지에 도착했을 때
  toast.success('5678차량이 목적지에 도착했습니다.', {
    position: toast.POSITION.TOP_RIGHT,
  });

  // A차량의 배터리가 ~~% 미만일때
  toast.warn('A차량의 배터리가 20% 미만입니다. 충전소로 이동합니다.', {
    position: toast.POSITION.TOP_RIGHT,
  });

  // A차량의 목적지가 입력 된 후
  toast.info('A차량이 운행을 시작했습니다.', {
    position: toast.POSITION.TOP_RIGHT,
  });

  //   toast('Custom Style Notification with css class!', {
  //     position: toast.POSITION.TOP_RIGHT,
  //     className: 'foo-bar',
  //   });
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default Toastify;

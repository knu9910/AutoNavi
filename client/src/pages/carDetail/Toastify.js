import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { getCurrentCar } from '../../store/carSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';
const Toastify = () => {
  const currentCar = useSelector((state) => state.carStore.currentCar);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getCar = async () => {
    const res = await axios.get(`http://localhost:8080/api/cars/${id}`);
    const car = res.data;
    dispatch(getCurrentCar({ currentCar: car }));
  };

  useEffect(() => {
    getCar();
  }, []);
  // 목적지에 도착했을 때
  toast.success(`${currentCar.car_number} 차량이 목적지에 도착했습니다.`, {
    position: toast.POSITION.TOP_RIGHT,
  });

  // A차량의 배터리가 ~~% 미만일때
  toast.warn(
    `${currentCar.car_number}차량의 배터리가 ${currentCar.realtime_battery}% 미만입니다. 충전소로 이동합니다.`,
    {
      position: toast.POSITION.TOP_RIGHT,
    },
  );

  // A차량의 목적지가 입력 된 후
  toast.info(`${currentCar.car_number}차량이 운행을 시작했습니다.`, {
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
        autoClose={3000}
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

import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import { getCurrentCar } from '../../store/carSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import socket from '../../soket';

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
    socket.on('operationalStatus', (data) => {
      if (data.msg === 'start') {
        toast.info(`${currentCar.car_number} 차량이 운행을 시작했습니다.`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (data.msg === 'arrived') {
        toast.info(`${currentCar.car_number} 차량이 목적지에 도착했습니다.`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (data.msg === 'lowBattery') {
        toast.info(
          `${currentCar.car_number} 차량이 배터리가 부족하여 충전소로 이동합니다.`,
          {
            position: toast.POSITION.TOP_RIGHT,
          },
        );
      } else if (data.msg === 'restart') {
        toast.info(
          `${currentCar.car_number} 차량이 충전을 완료하여 다시 운행합니다.`,
          {
            position: toast.POSITION.TOP_RIGHT,
          },
        );
      } else if (data.msg === 'goBack') {
        toast.info(`${currentCar.car_number} 차량이 복귀합니다.`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (data.msg === 'backArrived') {
        toast.info(`${currentCar.car_number} 차량이 복귀했습니다.`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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

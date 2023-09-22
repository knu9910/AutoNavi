import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentCar } from '../../store/carSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import socket from '../../soket';

const Toastify = () => {
  const carList = useSelector((state) => state.carStore.carList);
  const notify = (str) => {
    toast.info(str, { position: toast.POSITION.TOP_RIGHT });
  };

  useEffect(() => {
    socket.on('operationalStatus', (data) => {
      // currentCar 초기 값 체크
      if (!carList) {
        return;
      }

      const car = carList.find((car) => {
        return car.car_id === data.id;
      });
      if (data.msg === 'start') {
        console.log('운행시작');
        notify(`${car.car_name} 차량이 운행을 시작했습니다.`);
      } else if (data.msg === 'arrived') {
        notify(`${car.car_name} 차량이 목적지에 도착했습니다.`);
      } else if (data.msg === 'lowBattery') {
        notify(`${car.car_name} 차량이 배터리가 부족하여 충전소로 이동합니다.`);
      } else if (data.msg === 'restart') {
        notify(`${car.car_name} 차량이 충전을 완료하여 다시 운행합니다.`);
      } else if (data.msg === 'goBack') {
        notify(`${car.car_name} 차량이 복귀합니다.`);
      } else if (data.msg === 'backArrived') {
        notify(`${car.car_name} 차량이 복귀했습니다.`);
      }
    });

    // 컴포넌트 언마운트 시 웹 소켓 이벤트 리스너를 해제합니다.
    return () => {
      socket.off('operationalStatus');
    };
  }, [carList]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={6000}
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

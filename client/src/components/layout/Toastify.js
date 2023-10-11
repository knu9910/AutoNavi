import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { getSpeech } from '../../pathToGetSpeech';
import socket from '../../soket';
import {
  addCharge,
  addTopCharge,
  deleteCharge,
  deleteTopCharges,
} from '../../store/chargeSlice';

const Toastify = () => {
  const carList = useSelector((state) => state.carStore.carList);
  const dispatch = useDispatch();
  const notify = (str) => {
    toast.info(str, { position: toast.POSITION.TOP_RIGHT });
  };

  useEffect(() => {
    socket.on('operationalStatus', (data) => {
      // currentCar 초기 값 체크
      if (!carList && carList.length === 0) {
        return;
      }

      const car = carList.find((car) => {
        return car.car_id === data.id;
      });

      if (!car) {
        return;
      }

      let noti = '';

      if (data.msg === 'start') {
        console.log('운행시작');
        noti = `${car.car_name} 차량이 운행을 시작했습니다.`;
        notify(noti);
        getSpeech(noti);
      } else if (data.msg === 'arrived') {
        noti = `${car.car_name} 차량이 목적지에 도착했습니다.`;
        notify(noti);
        getSpeech(noti);
      } else if (data.msg === 'lowBattery') {
        const top10 = data.info.recommenPlaces;
        top10.forEach((charge) => {
          charge.car_id = data.id;
          dispatch(addTopCharge({ charge }));
        });
        const charge = data.info.chargeSt;
        dispatch(addCharge({ charge }));
        noti = `${car.car_name} 차량이 배터리가 부족하여 충전소로 이동합니다.`;
        notify(noti);
        getSpeech(noti);
      } else if (data.msg === 'restart') {
        noti = `${car.car_name} 차량이 충전을 완료하여 다시 운행합니다.`;
        notify(noti);
        getSpeech(noti);
      } else if (data.msg === 'arrivedCarge') {
        noti = `${car.car_name} 차량이 충전소에 도착하였습니다.`;
        dispatch(deleteCharge({ id: data.id }));
        dispatch(deleteTopCharges({ id: data.id }));
        notify(noti);
        getSpeech(noti);
      } else if (data.msg === 'charging') {
        noti = `${car.car_name} 차량이 충전을 시작합니다.`;
        notify(noti);
        getSpeech(noti);
      } else if (data.msg === 'goBack') {
        noti = `${car.car_name} 차량이 복귀합니다.`;
        notify(noti);
        getSpeech(noti);
      } else if (data.msg === 'compCharging') {
        noti = `${car.car_name} 차량이 충전을 완료하였습니다.`;
        notify(noti);
        getSpeech(noti);
      } else if (data.msg === 'backArrived') {
        noti = `${car.car_name} 차량이 복귀했습니다.`;
        notify(noti);
        getSpeech(noti);
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

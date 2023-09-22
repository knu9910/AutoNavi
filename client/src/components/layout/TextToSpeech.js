import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../../soket';
import { useSelector } from 'react-redux';
import { getSpeech } from '../../pathToGetSpeech';

const TextToSpeech = () => {
  const carList = useSelector((state) => state.carStore.carList);
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
        console.log('운행시작음성');
        getSpeech(`${car.car_name} 차량이 운행을 시작했습니다.`);
      } else if (data.msg === 'arrived') {
        getSpeech(`${car.car_name} 차량이 목적지에 도착했습니다.`);
      } else if (data.msg === 'lowBattery') {
        getSpeech(
          `${car.car_name} 차량이 배터리가 부족하여 충전소로 이동합니다.`,
        );
      } else if (data.msg === 'restart') {
        getSpeech(`${car.car_name} 차량이 충전을 완료하여 다시 운행합니다.`);
      } else if (data.msg === 'goBack') {
        getSpeech(`${car.car_name} 차량이 복귀합니다.`);
      } else if (data.msg === 'backArrived') {
        getSpeech(`${car.car_name} 차량이 복귀했습니다.`);
      }
    });

    // 컴포넌트 언마운트 시 웹 소켓 이벤트 리스너를 해제합니다.
    return () => {
      socket.off('operationalStatus');
    };
  }, [carList]);

  return;
};

export default TextToSpeech;

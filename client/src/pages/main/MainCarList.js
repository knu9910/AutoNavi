import { useSelector } from 'react-redux';
import MainCarEntry from './MainCarEntry';

const List = () => {
  const carList = useSelector((state) => state.carStore.carList);
  const carStatus = useSelector((state) => state.carStore.carStatus);
  const operationCarList = carList.filter(
    (car) => car.realtime_operation_st === carStatus,
  );
  const list = operationCarList.map((car) => {
    return <MainCarEntry key={car.car_id} carInfo={car} />;
  });
  return (
    <>
      <div className="mainnav">
        {/* 운행중 화면 */}
        <div className="nav-car-list">{list}</div>
      </div>
    </>
  );
};

export default List;

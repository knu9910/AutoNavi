import { useDispatch } from 'react-redux';
import '../../styles/carList.css';
import List from './List';
import CarDashBoard from './dashboard/index';
import axios from 'axios';
import { getCarsHistorys, sortCarsHistorys } from '../../store/historySlice';
import { useEffect } from 'react';
import { getCarsInfo } from '../../store/carSlice';

const CarList = () => {
  const dispatch = useDispatch();

  const handleCarsHistorys = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8080/api/history/getAllHistory',
      );
      const historys = res.data;
      dispatch(getCarsHistorys({ historys }));
      dispatch(sortCarsHistorys());
    } catch (err) {
      console.error(err);
    }
  };
  const handleGetCars = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/cars');
      const data = res.data;
      dispatch(getCarsInfo({ carsInfo: data }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleCarsHistorys();
    handleGetCars();
  }, []);
  return (
    <>
      <section>
        <div className="car-list">
          <List />
        </div>
        <CarDashBoard />
      </section>
    </>
  );
};

export default CarList;

import { useDispatch } from 'react-redux';
import '../../styles/carList.css';
import List from './List';
import CarDashBoard from './dashboard/index';
import axios from 'axios';
import { getCarsHistorys } from '../../store/historySlice';
import { useEffect } from 'react';

const CarList = () => {
  const dispatch = useDispatch();

  const handleCarsHistorys = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8080/api/history/getAllHistory',
      );
      const historys = res.data;
      dispatch(getCarsHistorys({ historys }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleCarsHistorys();
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

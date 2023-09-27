import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentCar } from '../../store/carSlice';
import Running from './Running';
import Charging from './Charging';
import Waiting from './Waiting';

const CarDetail = () => {
  const currentCar = useSelector((state) => state.carStore.currentCar);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const getCar = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/cars/${id}`);
      const car = res.data;
      dispatch(getCurrentCar({ currentCar: car }));
    } catch (err) {
      navigate('/notFound');
      console.log(err);
    }
  };

  useEffect(() => {
    getCar();
  }, []);

  if (currentCar.realtime_operation_st === '대기') {
    return <Waiting />;
  }

  if (currentCar.realtime_operation_st === '운행') {
    return <Running />;
  }

  if (currentCar.realtime_operation_st === '충전') {
    return <Charging />;
  }
};

export default CarDetail;

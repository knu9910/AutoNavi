import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentCar } from '../../store/carSlice';
import Running from './Running';
import Charging from './Charging';
import Waiting from './Waiting';
import { getChargeHistory, getOneTripHistory } from '../../store/historySlice';

const CarDetail = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
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

  const handleGetCharge = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/history/chargeFind/${id}/2023-09-26/${currentDate}`,
      );
      const chargeData = res.data;
      dispatch(getChargeHistory({ chargeData }));
    } catch (err) {
      navigate('/notFound');
      console.log(err);
    }
  };

  const handleGetTrip = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/history/getTripHistory/${id}`,
      );
      const tripData = res.data;
      dispatch(getOneTripHistory({ tripData }));
    } catch (err) {
      navigate('/notFound');
      console.log(err);
    }
  };

  useEffect(() => {
    getCar();
    handleGetCharge();
    handleGetTrip();
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

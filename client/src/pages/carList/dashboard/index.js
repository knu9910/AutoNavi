import '../../../styles/carList.css';
import 'chart.js';
import MainChart from './MainChart';
import DoughnutChart from './DoughnutChart';
import History from './History';
import TotalDistance from './TotalDistance';
import TotalBattery from './TotalBattery';
import MostDriveCar from './MostDriveCar';
import ChargeChart from './ChargeChart';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  getCarsTripHistorys,
  getTodayTotalDistance,
} from '../../../store/historySlice';
import { useEffect } from 'react';
import { metersToKMAndM } from '../../../helperFunction';

const CarDashBoard = () => {
  const dispatch = useDispatch();

  const handleCarsTripHistorys = async () => {
    const res = await axios.get(
      'http://localhost:8080/api/history/getAllTripHistory',
    );
    const allTripHistorys = res.data;
    dispatch(getCarsTripHistorys({ allTripHistorys }));
  };

  const handleTodayTotalDistance = async () => {
    const res = await axios.get(
      'http://localhost:8080/api/history/getTodayTotalDistance',
    );
    const { totalDistance } = res.data;
    const distance = metersToKMAndM(Number(totalDistance));
    dispatch(getTodayTotalDistance({ distance }));
  };

  useEffect(() => {
    handleCarsTripHistorys();
    handleTodayTotalDistance();
  }, []);
  return (
    <>
      <div className="dashBoard">
        <div className="box-dashBoard">
          <History />
        </div>
        <MainChart />

        <div className="nav-3">
          <div className="doughnut-chart">
            <DoughnutChart />
            <div className="smallbox">
              <TotalDistance />
            </div>
            <div className="smallbox">
              <TotalBattery />
            </div>
            <div className="smallbox">
              <MostDriveCar />
            </div>
          </div>
        </div>
      </div>
      <div>
        <ChargeChart />
      </div>
    </>
  );
};
export default CarDashBoard;

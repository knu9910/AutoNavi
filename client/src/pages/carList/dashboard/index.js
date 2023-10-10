import '../../../styles/carList.css';
import 'chart.js';
import MainChart from './MainChart';
import OperationState from './OpreationState';
import History from './History';
import TotalDistance from './TotalDistance';
import MostDriveCar from './MostDriveCar';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  getCarsTripHistorys,
  getTodayTotalChargePrice,
  getTodayTotalDistance,
} from '../../../store/historySlice';
import { useEffect } from 'react';
import { metersToKMAndM } from '../../../helperFunction';
import TodayCharPrice from './TodayCharPrice';
import { Link } from 'react-router-dom';
import ChargeChart from './ChargeChart';

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

  const handleTodayChargePrice = async () => {
    const res = await axios.get(
      'http://localhost:8080/api/history/getTodayChargeTotal',
    );

    const totalChargePrice = res.data.totalCharge;
    dispatch(getTodayTotalChargePrice({ chargePrice: totalChargePrice }));
  };

  useEffect(() => {
    handleCarsTripHistorys();
    handleTodayTotalDistance();
    handleTodayChargePrice();
  }, []);

  return (
    <div>
      <div className="AdashBoard">
        <div className="dashBoard">
          <div className="nav-2">
            <div className="doughnut-chart">
              <OperationState />
            </div>
            <div className="smallbox">
              <TotalDistance />
            </div>
            <div className="smallbox">
              <TodayCharPrice />
            </div>
            <div className="smallbox">
              <MostDriveCar />
            </div>
          </div>
          <div>
            <MainChart />
          </div>
        </div>
        <div className="dashBoard">
          <div className="boxdashboard">
            <Link to="/car/carHistory" className="GoHistory">
              최근 운행 기록
            </Link>
            <div className="scroll">
              <div className="nav-1">
                <History />
              </div>
            </div>
          </div>
          <div className="nav-3">
            <ChargeChart />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarDashBoard;

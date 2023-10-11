import { useDispatch } from 'react-redux';
import '../../styles/mainHistory.css';
import HistoryList from './HistoryList';
import { useEffect } from 'react';
import {
  getCarsTripHistorys,
  getChargeHistoryAll,
} from '../../store/historySlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarHistory = () => {
  const dispatch = useDispatch();

  const handleGetChargeHistory = async () => {
    const res = await axios.get(
      'http://localhost:8080/api/history/getChargeHistoryAll',
    );
    const chargeHistorys = res.data;
    dispatch(getChargeHistoryAll({ chargeHistorys }));
  };

  const handleCarsTripHistorys = async () => {
    const res = await axios.get(
      'http://localhost:8080/api/history/getAllTripHistory',
    );
    const allTripHistorys = res.data;
    dispatch(getCarsTripHistorys({ allTripHistorys }));
  };

  useEffect(() => {
    handleGetChargeHistory();
    handleCarsTripHistorys();
  }, []);
  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="pagego">
          <Link to="/car/chargeHistory" style={{ color: 'white' }}>
            충전 이력 보기
          </Link>
        </div>
      </div>

      <div className="carmainhistory">
        <HistoryList />
      </div>
    </section>
  );
};
export default CarHistory;

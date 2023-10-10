import { useDispatch } from 'react-redux';
import '../../styles/mainHistory.css';
import ChargeHistoryList from './ChargeHistoryList';
import HistoryList from './HistoryList';
import { useEffect } from 'react';
import {
  getCarsTripHistorys,
  getChargeHistoryAll,
} from '../../store/historySlice';
import axios from 'axios';

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
      <div className="carmainhistory">
        <HistoryList />
      </div>
      <div className="carchargehistory">
        <ChargeHistoryList />
      </div>
    </section>
  );
};
export default CarHistory;

import '../../styles/mainHistory.css';
import ChargeHistoryList from './ChargeHistoryList';
import HistoryList from './HistoryList';

const CarHistory = () => {
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

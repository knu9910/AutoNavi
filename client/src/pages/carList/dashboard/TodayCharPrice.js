import { useSelector } from 'react-redux';

const TodayCharPrice = () => {
  const chargePice = useSelector(
    (state) => state.historyStore.todayTotalChargePrice,
  );
  return (
    <div className="totalbox">
      <p>Today Total charge</p>
      <p className="total-content">{chargePice}</p>
    </div>
  );
};
export default TodayCharPrice;

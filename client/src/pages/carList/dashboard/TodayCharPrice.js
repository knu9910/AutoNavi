import { useSelector } from 'react-redux';

const TodayCharPrice = () => {
  const chargePice = useSelector(
    (state) => state.historyStore.todayTotalChargePrice,
  );
  return (
    <div className="totalbox">
      <p>Today&apos;s Total Charge</p>
      <p className="total-content">{chargePice} 원</p>
    </div>
  );
};
export default TodayCharPrice;

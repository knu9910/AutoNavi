import { useSelector } from 'react-redux';

const TotalDistance = () => {
  const totalDistance = useSelector(
    (state) => state.historyStore.todayTotalDistance,
  );
  return (
    <div className="totalbox">
      <p>Today Total Distance</p>
      <p className="total-content">{totalDistance}</p>
    </div>
  );
};
export default TotalDistance;

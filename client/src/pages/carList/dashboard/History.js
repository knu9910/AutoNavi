import { useSelector } from 'react-redux';
import HistoryEntry from './HistoryEntry';
const History = () => {
  const allTripHistorys = useSelector(
    (state) => state.historyStore.allCarsTripHistorys,
  );

  let newTripHistory = allTripHistorys.slice(0, 40); // history를 40까지만 보여주기 위해
  newTripHistory.sort((a, b) => b.id - a.id); // 최근 히스토리로 정렬

  const list = newTripHistory.map((tripHistory) => {
    return <HistoryEntry key={tripHistory.id} tripHistory={tripHistory} />;
  });
  return (
    <div className="hisbigbox">
      <div className="carNoti">
        <ul>{list}</ul>
      </div>
    </div>
  );
};
export default History;

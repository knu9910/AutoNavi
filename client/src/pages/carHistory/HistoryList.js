import { useSelector } from 'react-redux';
import PaginationComp from '../../components/common/PaginationComp';
import MainCarHistoryEntry from './MainCarHistoryEntry';
import { useState } from 'react';

const HistoryList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const allTripHistorys = useSelector(
    (state) => state.historyStore.allCarsTripHistorys,
  );

  let newTripHistory = allTripHistorys.slice(0, 40);
  newTripHistory.sort((a, b) => b.id - a.id);

  const itemsPerPage = 15;
  const historyList = newTripHistory.map((tripHistory) => {
    return (
      <MainCarHistoryEntry key={tripHistory.id} tripHistory={tripHistory} />
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTripHistorys = historyList.slice(startIndex, endIndex);
  return (
    <div className="carhistorybox">
      <div className="carhistory-head">
        <p> ID </p>
        <p> 출발지 </p>
        <p> 도착지 </p>
        <p> 거리 </p>
        <p> 시간 </p>
        <p> 운행 현황 </p>
      </div>
      <div className="carhistory-content">
        <ul>{displayedTripHistorys}</ul>
      </div>
      <div className="hispagination">
        <PaginationComp
          currentPage={currentPage}
          totalPages={Math.ceil(historyList.length / itemsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default HistoryList;

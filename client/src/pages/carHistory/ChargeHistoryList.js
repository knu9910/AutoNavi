import { useState } from 'react';
import { useSelector } from 'react-redux';
import ChargeHistoryEntry from './ChargeHistoryEntry';
import PaginationComp from '../../components/common/PaginationComp';

const ChargeHistoryList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const allChargeHistorys = useSelector(
    (state) => state.historyStore.chargeHistoryAll,
  );

  let newChargeHistory = allChargeHistorys.slice(0, 40);
  newChargeHistory.sort((a, b) => b.id - a.id);

  const historyList = newChargeHistory.map((chargeHistory) => {
    return (
      <ChargeHistoryEntry
        key={chargeHistory.id}
        chargeHistory={chargeHistory}
      />
    );
  });

  const itemsPerPage = 15;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedChargeHistorys = historyList.slice(startIndex, endIndex);

  return (
    <div className="carchargehistorybox">
      <div className="carchargehistory-head">
        <p> ID </p>
        <p> 충전소 이름 </p>
        <p> 주소 </p>
        <p> 요금 </p>
        <p> 시간 </p>
      </div>
      <div className="carchargehistory-content">
        <ul>{displayedChargeHistorys}</ul>
      </div>
      <div className="chargepagination">
        <PaginationComp
          currentPage={currentPage}
          totalPages={Math.ceil(historyList.length / itemsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
export default ChargeHistoryList;

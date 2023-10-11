import { metersToKMAndM, parseDateString } from '../../helperFunction';
import '../../styles/history.css';
import HistoryChart from './HistoryChart';
import { useSelector } from 'react-redux';

const History = () => {
  const tripHistory =
    useSelector((state) => state.historyStore.carTripHistory) || [];

  const chargeHistory =
    useSelector((state) => state.historyStore.chargeHistory) || [];

  //최신순 정렬
  const chargeHistorySort = chargeHistory
    .slice(0, 10)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const tripHistorySort = tripHistory
    .slice(0, 10)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="history_wrap_detail">
      <div className="car_history_wrap">
        <div className="car_info">차량 히스토리</div>
        <div className="history_chart">
          <HistoryChart />
        </div>
        <div className="history_info_wrap">
          <div className="info_input">
            <div className="info_label_history">충전소 이용 내역</div>
            <div className="info_box_history">
              <table className="info_table_history">
                <tbody>
                  {chargeHistorySort.map((historyItem, index) => (
                    <tr key={index} style={{ margin: '20px' }}>
                      <td>
                        {parseDateString(historyItem.createdAt).date}{' '}
                        {parseDateString(historyItem.createdAt).time}
                      </td>
                      <td>{historyItem.name}</td>
                      <td>요금: {historyItem.fee}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="info_input">
            <div className="info_label_history">최근 운행 경로</div>
            <div className="info_box_history">
              <table className="info_table_history">
                <tbody>
                  {tripHistorySort.map((historyItem, index) => (
                    <tr key={index} style={{ margin: '20px' }}>
                      <td>
                        {parseDateString(historyItem.createdAt).date}{' '}
                        {parseDateString(historyItem.createdAt).time}
                      </td>
                      <td>출발지: {historyItem.departure}</td>
                      <td>행선지: {historyItem.destination}</td>
                      <td>거리: {metersToKMAndM(historyItem.distance)}</td>
                      <td>{historyItem.msg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

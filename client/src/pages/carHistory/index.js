import { useSelector } from 'react-redux';
import MainCarHistoryEntry from './MainCarHistoryEntry';
import '../../styles/mainHistory.css';
const CarHistory = () => {
  const allTripHistorys = useSelector(
    (state) => state.historyStore.allCarsTripHistorys,
  );

  let newTripHistory = allTripHistorys.slice(0, 40);
  newTripHistory.sort((a, b) => b.id - a.id);

  const HistoryList = newTripHistory.map((tripHistory) => {
    return (
      <MainCarHistoryEntry key={tripHistory.id} tripHistory={tripHistory} />
    );
  });
  return (
    <section>
      <div className="carmainhistory">
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
            <ul>
              <li>
                <p>무인 1호</p>
                <p> 강남구 어쩌구 저쩌구 </p>
                <p> 강남구 어쩌구 저쩌구 </p>
                <p>135km </p>
                <p>2023.09.20 11:30</p>
                <p> 운행 </p>
              </li>
              <li>
                <p>무인 1호</p>
                <p> 강남구 어쩌구 저쩌구 </p>
                <p> 강남구 어쩌구 저쩌구 </p>
                <p>135km </p>
                <p>2023.09.20 11:30</p>
                <p> 운행 </p>
              </li>
            </ul>
          </div>
          <div className="hispagination">
            <ul>
              <a href="#">
                <li>{'<'}</li>
              </a>
              <a className="is-active" href="#">
                <li>1</li>
              </a>
              <a href="#">
                <li>2</li>
              </a>
              <a href="#">
                <li>3</li>
              </a>
              <a href="#">
                <li>4</li>
              </a>
              <a href="#">
                <li>5</li>
              </a>
              <a href="#">
                <li>{'>'}</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CarHistory;

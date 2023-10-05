import { metersToKMAndM, parseDateString } from '../../../helperFunction';

const HistoryEntry = ({ tripHistory }) => {
  console.log(tripHistory);
  let { distance, destination, departure, car_name, createdAt, msg } =
    tripHistory;

  distance = metersToKMAndM(distance);
  let { date, time } = parseDateString(createdAt);

  return (
    <li>
      <div>
        <span>{car_name}</span>
        <span>출발지: {departure} </span>
        <span>목적지: {destination} </span>
        <span>거리 : {distance} </span>
        <span>
          시간 : {date} {time}
        </span>
      </div>
    </li>
  );
};

export default HistoryEntry;

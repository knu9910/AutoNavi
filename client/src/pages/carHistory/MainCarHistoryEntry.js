import { metersToKMAndM, parseDateString } from '../../helperFunction';

const MainCarHistoryEntry = ({ tripHistory }) => {
  let { distance, destination, departure, car_name, createdAt, msg } =
    tripHistory;

  distance = metersToKMAndM(distance);
  let { date, time } = parseDateString(createdAt);

  return (
    <li>
      <p>{car_name}</p>
      <p>{departure} </p>
      <p>{destination} </p>
      <p>{distance} </p>
      <p>
        {date} {time}
      </p>
      <p>{msg}</p>
    </li>
  );
};

export default MainCarHistoryEntry;

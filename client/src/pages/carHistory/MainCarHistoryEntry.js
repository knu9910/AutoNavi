import { metersToKMAndM, parseDateString } from '../../helperFunction';

const MainCarHistoryEntry = ({ tripHistory }) => {
  console.log(tripHistory);
  let { distance, destination, departure, car_name, createdAt, msg } =
    tripHistory;

  distance = metersToKMAndM(distance);
  let { date, time } = parseDateString(createdAt);

  return (
    <li>
      <div>
        <p>{car_name}</p>
        <p>{departure} </p>
        <p>{destination} </p>
        <p>{distance} </p>
        <p>
          {date} {time}
        </p>
        <p>{msg}</p>
      </div>
    </li>
  );
};

export default MainCarHistoryEntry;

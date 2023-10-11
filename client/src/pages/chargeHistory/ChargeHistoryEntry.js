import { parseDateString } from '../../helperFunction';

const ChargeHistoryEntry = ({ chargeHistory }) => {
  const { car_name, name, location, fee, createdAt } = chargeHistory;

  let { date, time } = parseDateString(createdAt);
  return (
    <li>
      <p>{car_name}</p>
      <p>{name}</p>
      <p>{location}</p>
      <p>{fee}원</p>
      <p>
        {date} {time}
      </p>
    </li>
  );
};
export default ChargeHistoryEntry;

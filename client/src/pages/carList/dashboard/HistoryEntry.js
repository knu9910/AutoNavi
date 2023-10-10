const HistoryEntry = ({ tripHistory }) => {
  console.log(tripHistory);
  let { destination, departure, car_name, msg } = tripHistory;

  return (
    <li>
      <div className="historyinfo">
        <p>
          {car_name} {msg}
        </p>
        <p>출발지: {departure} </p>
        <p>목적지: {destination} </p>
      </div>
    </li>
  );
};

export default HistoryEntry;

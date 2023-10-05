import { useSelector } from 'react-redux';
import MostDriveCarEntry from './MostDirveCarEntry';

const MostDriveCar = () => {
  const mostDrivenList = useSelector(
    (state) => state.historyStore.mostDrivenList,
  );
  const list = mostDrivenList.map((car, idx) => {
    return <MostDriveCarEntry key={car.id} car={car} num={idx + 1} />;
  });

  return (
    <div className="totalbox">
      <p>Most Driven Vehicle</p>
      <ul className="small-listbox">{list}</ul>
    </div>
  );
};
export default MostDriveCar;

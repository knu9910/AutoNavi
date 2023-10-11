const MostDriveCarEntry = ({ car }) => {
  return (
    <li className="small-carlist">
      <span className="small-number"></span>
      <span className="small-name">{car.car_name}</span>
    </li>
  );
};
export default MostDriveCarEntry;

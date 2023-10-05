const MostDriveCarEntry = ({ car, num }) => {
  return (
    <li className="small-carlist">
      <span className="small-number">{num}.</span>
      <span className="small-name">{car.car_name}</span>
    </li>
  );
};
export default MostDriveCarEntry;

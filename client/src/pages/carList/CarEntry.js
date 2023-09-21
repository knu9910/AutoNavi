import { Link } from 'react-router-dom';
import bus from '../../img/bus.jpg';

const CarEntry = ({ car }) => {
  const { car_name, id } = car;
  return (
    <div className="card-1">
      <li className="car">
        <Link to={`/car/detail/${id}`}>
          <img className="bus-img" src={bus} alt=" "></img>
          <p className="businfo">{car_name}</p>
        </Link>
      </li>
    </div>
  );
};
export default CarEntry;

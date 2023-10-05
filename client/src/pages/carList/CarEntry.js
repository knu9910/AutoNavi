import { Link } from 'react-router-dom';
import { metersToKMAndM } from '../../helperFunction';

const CarEntry = ({ car, history }) => {
  const { operation_st, car_name, id } = car;
  const cum_distance = metersToKMAndM(history.cum_distance);
  return (
    <div className="card-1">
      <li className="car">
        <Link className="carlist-info" to={`/car/detail/${id}`}>
          <p className="businfo">{operation_st}</p>
          <p className="businfo">{car_name}</p>
          <p className="businfo">{cum_distance}</p>
          <p className="businfo">{history.cum_battery} Kwh</p>
        </Link>
      </li>
    </div>
  );
};
export default CarEntry;

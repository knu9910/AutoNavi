import { Link } from 'react-router-dom';

const CarEntry = ({ car, history }) => {
  const { operation_st, car_name, id } = car;

  return (
    <div className="card-1">
      <li className="car">
        <Link className="carlist-info" to={`/car/detail/${id}`}>
          <p className="businfo">{operation_st}</p>
          <p className="businfo">{car_name}</p>
          <p className="businfo">{history.cum_distance}</p>
          <p className="businfo">{history.cum_battery}</p>
        </Link>
      </li>
    </div>
  );
};
export default CarEntry;

import { Link } from 'react-router-dom';

const CarEntry = ({ car }) => {
  const { operation_st, car_name, battery, destination, id } = car;
  return (
    <div className="card-1">
      <li className="car">
        <Link className="carlist-info" to={`/car/detail/${id}`}>
          <p className="businfo">{operation_st}</p>
          <p className="businfo">{car_name}</p>
          <p className="businfo">{destination}30.000km</p>
          <p className="businfo">{battery}185.235</p>
        </Link>
      </li>
    </div>
  );
};
export default CarEntry;

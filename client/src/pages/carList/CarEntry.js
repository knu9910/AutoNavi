import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const CarEntry = ({ car }) => {
  const { operation_st, car_name, id } = car;
  const [carData, setCarData] = useState({});

  useEffect(() => {
    const getCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/history/getHistoryByCar/${id}`,
        );
        const carData = response.data;
        setCarData(carData);
      } catch (err) {
        Navigate('/notFound');
        console.error(err);
      }
    };

    getCar();
  }, [id]);

  return (
    <div className="card-1">
      <li className="car">
        <Link className="carlist-info" to={`/car/detail/${id}`}>
          <p className="businfo">{operation_st}</p>
          <p className="businfo">{car_name}</p>
          <p className="businfo">{carData?.cum_distance}</p>
          <p className="businfo">{carData?.cum_battery}</p>
        </Link>
      </li>
    </div>
  );
};
export default CarEntry;

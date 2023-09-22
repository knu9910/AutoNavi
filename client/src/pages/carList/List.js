import { useEffect, useState } from 'react';
import PaginationComp from '../../components/common/PaginationComp';
import { useDispatch, useSelector } from 'react-redux';
import CarEntry from './CarEntry';
import axios from 'axios';
import { getCarsInfo } from '../../store/carSlice';

const List = () => {
  const [carInOp, setCarInOp] = useState(true);
  const [carCharge, setCharge] = useState(true);
  const [carWaiting, setWaiting] = useState(true);

  const carsInfo = useSelector((state) => state.carStore.carsInfo);
  const dispatch = useDispatch();

  const handleGetCars = async () => {
    const res = await axios.get('http://localhost:8080/api/cars');
    const data = res.data;
    dispatch(getCarsInfo({ carsInfo: data }));
  };

  let cars = [];

  const handleOpst = (opst, str) => {
    if (opst) {
      cars = cars.concat(carsInfo.filter((car) => car.operation_st === str));
    }
  };

  useEffect(() => {
    handleGetCars();
  }, []);

  handleOpst(carInOp, '운행');
  handleOpst(carCharge, '충전');
  handleOpst(carWaiting, '대기');
  const list = cars.map((car) => {
    return <CarEntry key={car.id} car={car} />;
  });
  return (
    <>
      <div className="list">
        <div className="carsearch-box">
          <input
            className="carsearch-bar"
            type="text"
            name=""
            placeholder="Search..."
          />
          <div className="carsearch-button" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <div className="checkbox">
          <span className="check1">
            <input
              type="checkbox"
              id="운행중"
              name="opStatus"
              value="running"
              checked={carInOp}
              onChange={(e) => setCarInOp(e.target.checked)}
            />
            <label htmlFor="운행중">운행중</label>
          </span>
          <span className="check2">
            <input
              type="checkbox"
              id="충전중"
              name="chargeStatus"
              value="charging"
              checked={carCharge}
              onChange={(e) => setCharge(e.target.checked)}
            />
            <label htmlFor="충전중">충전중</label>
          </span>
          <span className="check3">
            <input
              type="checkbox"
              id="대기중"
              name="waiting"
              checked={carWaiting}
              onChange={(e) => setWaiting(e.target.checked)}
            />
            <label htmlFor="대기중">대기중</label>
          </span>
        </div>
        {list}
        <div className="paging">
          <PaginationComp />
        </div>
      </div>
    </>
  );
};
export default List;

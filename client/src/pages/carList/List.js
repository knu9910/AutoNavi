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
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const carsInfo = useSelector((state) => state.carStore.carsInfo);

  const carsHistorys = useSelector(
    (state) => state.historyStore.allCarsHistorys,
  );
  const dispatch = useDispatch();

  const handleGetCars = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/cars');
      const data = res.data;
      dispatch(getCarsInfo({ carsInfo: data }));
    } catch (err) {
      console.log(err);
    }
  };

  // 검색 기능
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //검색, 체크박스 필터
  const handleOpst = (opst, str) => {
    let filteredCars = [];

    if (opst) {
      filteredCars = carsInfo.filter((car) => car.operation_st === str);
    }

    if (!search) {
      return filteredCars;
    }
    const regExp = new RegExp(search, 'i');
    filteredCars = filteredCars.filter((car) => regExp.test(car.car_name));

    return filteredCars;
  };

  useEffect(() => {
    handleGetCars();
  }, []);

  const filteredCars = handleOpst(carInOp, '운행')
    .concat(handleOpst(carCharge, '충전'))
    .concat(handleOpst(carWaiting, '대기'));

  const itemsPerPage = 8;

  // 페이지별 data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCars = filteredCars.slice(startIndex, endIndex);

  const list = displayedCars.map((car) => {
    const carHistory = carsHistorys.find(
      (history) => car.id === history.car_id,
    );

    return <CarEntry key={car.id} car={car} history={carHistory} />;
  });
  return (
    <>
      <div className="boxheader">
        <div className="carsearch-box">
          <input
            className="carsearch-bar"
            type="text"
            name=""
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
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
      </div>

      <div className="carlist">
        <div className="carbox">
          <div className="carbox-head">
            <p> Status </p>
            <p> ID </p>
            <p> Total Distance </p>
            <p> Battery Utilization </p>
          </div>

          {list}
        </div>
      </div>
      <div className="car-paging">
        <div className="paging">
          <PaginationComp
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCars.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};
export default List;

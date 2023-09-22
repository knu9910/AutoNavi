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
  const dispatch = useDispatch();

  const handleGetCars = async () => {
    const res = await axios.get('http://localhost:8080/api/cars');
    const data = res.data;
    dispatch(getCarsInfo({ carsInfo: data }));
  };

  // let cars = [];

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

  // const list = cars.map((car) => {
  //   return <CarEntry key={car.id} car={car} />;
  // });

  // 페이지당 데이터 8개 제한
  const itemsPerPage = 8;

  // 페이지별 data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCars = filteredCars.slice(startIndex, endIndex);

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
          {displayedCars.map((car) => (
            <CarEntry key={car.id} car={car} />
          ))}
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

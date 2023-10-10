import { useState } from 'react';

const ChargeHistoryList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="carchargehistorybox">
      <div className="carchargehistory-head">
        <p> ID </p>
        <p> 충전소 이름 </p>
        <p> 주소 </p>
        <p> 요금 </p>
        <p> 시간 </p>
      </div>
      <div className="carchargehistory-content">
        <ul>
          <li>
            <p>무인 1호</p>
            <p> 전기차 충전소 </p>
            <p> 강남구 어쩌구 저쩌구 </p>
            <p> 50000원 </p>
            <p>2023.09.20 11:30</p>
          </li>
          <li>
            <p>무인 1호</p>
            <p> 강남구 어쩌구 저쩌구 </p>
            <p> 강남구 어쩌구 저쩌구 </p>
            <p>135km </p>
            <p>2023.09.20 11:30</p>
          </li>
        </ul>
      </div>
      <div className="chargepagination">
        <ul>
          <a href="#">
            <li>{'<'}</li>
          </a>
          <a className="is-active" href="#">
            <li>1</li>
          </a>
          <a href="#">
            <li>2</li>
          </a>
          <a href="#">
            <li>3</li>
          </a>
          <a href="#">
            <li>4</li>
          </a>
          <a href="#">
            <li>5</li>
          </a>
          <a href="#">
            <li>{'>'}</li>
          </a>
        </ul>
      </div>
    </div>
  );
};
export default ChargeHistoryList;

import React from 'react';
import bus from '../../img/bus.jpg';
import '../../styles/carList.css';
import Pagination from 'react-bootstrap/Pagination';

import { Link } from 'react-router-dom';

const carList = () => {
  return (
    <>
      <section>
        <p>차량 등록 현황</p>

        <div className="car-list">
          <div className="list">
            <div className="checkbox">
              <span className="check1">
                <input
                  type="checkbox"
                  id="운행중"
                  name="chargeStatus"
                  value="running"
                />
                <label htmlFor="운행중">운행중</label>
              </span>
              <span className="check2">
                <input
                  type="checkbox"
                  id="충전중"
                  name="chargeStatus"
                  value="charging"
                />
                <label htmlFor="충전중">충전중</label>
              </span>
            </div>

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
            <div className="card-1">
              <li className="car">
                <Link
                  to="https://google.com"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <img className="bus-img" src={bus} alt=" "></img>
                  <p className="businfo">12가 1234</p>
                </Link>
              </li>
            </div>
            <div className="card-2">
              <li className="car">
                <Link
                  to="https://google.com"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <img className="bus-img" src={bus} alt=" "></img>
                </Link>
                <p className="businfo">12가 1234</p>
              </li>
            </div>
            <div className="card-3">
              <li className="car">
                <Link
                  to="https://google.com"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <img className="bus-img" src={bus} alt=" "></img>
                </Link>
                <p className="businfo">12가 1234</p>
              </li>
            </div>
            <div className="card-1">
              <li className="car">
                <Link
                  to="https://google.com"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <img className="bus-img" src={bus} alt=" "></img>
                  <p className="businfo">12가 1234</p>
                </Link>
              </li>
            </div>
            <div className="card-2">
              <li className="car">
                <Link
                  to="https://google.com"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <img className="bus-img" src={bus} alt=" "></img>
                </Link>
                <p className="businfo">12가 1234</p>
              </li>
            </div>
            <div className="card-3">
              <li className="car">
                <Link
                  to="https://google.com"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <img className="bus-img" src={bus} alt=" "></img>
                </Link>
                <p className="businfo">12가 1234</p>
              </li>
            </div>
            <div className="card-1">
              <li className="car">
                <Link
                  to="https://google.com"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <img className="bus-img" src={bus} alt=" "></img>
                  <p className="businfo">12가 1234</p>
                </Link>
              </li>
            </div>
            <div className="card-2">
              <li className="car">
                <Link
                  to="https://google.com"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <img className="bus-img" src={bus} alt=" "></img>
                </Link>
                <p className="businfo">12가 1234</p>
              </li>
            </div>
            <div className="card-3">
              <li className="car">
                <Link
                  to="https://google.com"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <img className="bus-img" src={bus} alt=" "></img>
                </Link>
                <p className="businfo">12가 1234</p>
              </li>
            </div>
            <div className="paging">
              <Pagination size="md">
                <Pagination.Prev />
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </div>
          </div>
        </div>
      </section>

      <footer></footer>
    </>
  );
};

export default carList;

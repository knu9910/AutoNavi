import React from 'react';
import bus from '../../img/bus.jpg';
import '../../styles/carList.css';

import { Link } from 'react-router-dom';

const carList = () => {
  return (
    <>
      <content>
        <p>차량 등록 현황</p>
        <input
          className="carsearch-bar"
          type="text"
          name=""
          placeholder="Search..."
        />
        <button className="carsearch-button" type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
        <div className="car-list">
          <div className="list">
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
          </div>
        </div>
      </content>

      <footer></footer>
    </>
  );
};

export default carList;

import React from 'react';
import '../styles/startPage.css';
import AutoNaviLogo from '../img/autoNavi_Logo.jpg';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <>
      <div className="mainpage">
        <div className="Logo">
          <img className="Logoimg" src={AutoNaviLogo} alt="" />
        </div>
        <div className="font-fix">
          <p className="font">무인 운송차량 관제 시스템</p>
        </div>
        <div className="buttontaget">
          <Link to="/auth/login">
            <button className="main_btn">Sign in</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default StartPage;

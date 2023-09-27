import React, { useState } from 'react';
import Axios from 'axios';

import { useNavigate } from 'react-router-dom';

import mainLogo from '../../img/autoNavi_Logo.jpg';
import '../../styles/LogIn.css';
import { useDispatch } from 'react-redux';
import { isControl, isLogin, isMaster } from '../../store/userSlice';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = () => {
    Axios.post('http://localhost:8080/api/users/login', {
      userId: userId,
      password: password,
    })
      .then((response) => {
        console.log('Login Response:', response.data);
        if (response.data.message === 'Login successful') {
          // 사용자 정보를 Redux 스토어에 저장
          dispatch(isLogin());

          if (response.data.role === 'master') {
            dispatch(isMaster());
          }

          if (response.data.controlRights === '있음') {
            dispatch(isControl());
          }

          // 로컬 스토리지에 저장
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('controlRights', response.data.controlRights);

          navigate('/main');
        } else {
          alert('id 또는 비밀번호를 잘못 입력했습니다.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('id 또는 비밀번호를 잘못 입력했습니다.');
      });
  };

  return (
    <>
      <div className="sign-page">
        <div className="signinpage">
          <div className="signinLogo">
            <img className="signinLogoimg" src={mainLogo} alt=""></img>
            <p className="signinfont">무인 운송차량 관제 시스템</p>
          </div>
        </div>
        <div className="wrapper">
          <div className="container-signin">
            <div className="sign-in-container">
              <p className="signin-font">Sign In</p>
              <div className="signinDetail">
                <input
                  type="id"
                  placeholder="Employee ID"
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button className="form_btn" onClick={login}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

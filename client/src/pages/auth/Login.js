import React, { useState } from 'react';
import Axios from 'axios';

import mainLogo from '../../img/autoNavi_Logo.jpg';
// import '../../css/home.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    Axios.post('http://localhost:8080/users/login', {
      userId: userId,
      password: password,
    })
      .then((response) => {
        if (response.data.message === 'Login successful') {
          console.log(response.data.message);
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
    <div className="mainpage">
      <div className="Logo">
        <img className="Logoimg" src={mainLogo} />
      </div>
      <div className="font-fix">
        <p className="font">무인 운송차량 관제 시스템</p>
      </div>

      <div className="wrapper">
        <div className="container">
          <div className="sign-in-container">
            <form className="signinDetail">
              <p>Sign In</p>
              <input
                type="id"
                placeholder="Admin ID"
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
              <div className="buttontarget">
                <button className="main_btn" onClick={login}>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

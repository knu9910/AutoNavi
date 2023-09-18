import React, { useState } from 'react';
import Axios from 'axios';

import mainLogo from '../../img/autoNavi_Logo.jpg';
import '../../styles/LogIn.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    Axios.post('http://localhost:8080/api/users/login', {
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
        alert('로그인 실패');
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
              <form className="signinDetail">
                <p>Sign In</p>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

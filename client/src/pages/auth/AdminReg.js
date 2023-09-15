import '../../styles/adminReg.css';
import blueLogo from '../../img/bluelogo.jpg';
import React, { useState } from 'react';
import Axios from 'axios';

const AdminReg = () => {
  const [userName, setUserName] = useState('');
  const [userIdReg, setUserIdReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [controlRights, setControlRights] = useState('');

  const register = () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 check
    if (passwordReg !== confirmPassword) {
      alert('비밀번호를 똑같이 입력해주세요.');
      return;
    }

    Axios.post('http://localhost:8080/users/register', {
      userName: userName,
      userId: userIdReg,
      password: passwordReg,
      email: email,
      position: position,
      controlRights: controlRights,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <header className="ContactPerson">
        <img className="bluelogo" src={blueLogo} alt="bluelogo" />
      </header>

      <div className="wrapper-signup">
        <div className="container-signup">
          <div className="signup-container">
            <form className="signup-Detail">
              <p>관리자 등록</p>
              <div className="admin-input">
                <input
                  type="text"
                  placeholder="name"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />

                <input
                  type="id"
                  placeholder="Contact Person no."
                  onChange={(e) => {
                    setUserIdReg(e.target.value);
                  }}
                />
              </div>
              <div className="admin-input">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="Password Check"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              <div className="admin-input">
                <input
                  type="email"
                  placeholder="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <select
                  name="position"
                  className="admin-input"
                  onChange={(e) => {
                    setPosition(e.target.value);
                  }}
                >
                  <option value="사원">사원</option>
                  <option value="팀장">팀장</option>
                  <option value="..?">..?</option>
                </select>
                <div className="admin-checkb">
                  <p>차량 제어 권한</p>
                  <div className="admin-cbox">
                    <input
                      style={{ display: 'none' }}
                      type="checkbox"
                      name="controlRights"
                      id="controlRightsYes"
                      value="있음"
                      onChange={(e) => {
                        setControlRights(e.target.checked ? '있음' : '없음');
                      }}
                    />
                    <label htmlFor="controlRightsYes"></label>
                    <div></div>
                  </div>
                </div>
              </div>
              <button className="form_btn" onClick={register}>
                관리자 등록
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReg;

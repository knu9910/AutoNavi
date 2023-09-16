import '../../styles/adminReg.css';
import blueLogo from '../../img/bluelogo.jpg';
import React, { useState } from 'react';
import axios from 'axios';

const AdminReg = () => {
  const [userName, setUserName] = useState('');
  const [userIdReg, setUserIdReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [controlRights, setControlRights] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    const control = controlRights ? '있음' : '없음';

    if (passwordReg !== confirmPassword) {
      alert('비밀번호를 똑같이 입력해주세요.');
      return;
    }

    await axios
      .post('http://localhost:8080/users/register', {
        userName: userName,
        userId: userIdReg,
        password: passwordReg,
        email: email,
        position: position,
        controlRights: control,
      })
      .then((response) => {
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
            <p>관리자 등록</p>
            <form className="signup-Detail">
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
              <div className="select-btn">
                <div className="admin-input">
                  <input
                    type="email"
                    placeholder="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <select
                  name="position"
                  className="admin-input-select"
                  onChange={(e) => {
                    setPosition(e.target.value);
                  }}
                >
                  <option value="" selected>
                    Position
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="TL">TL</option>
                  <option value="Employee">Employee</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
              <div className="admin-checkb">
                <p>차량 제어 권한</p>
                <div className="admin-cbox">
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="controlRights"
                    id="controlRightsYes"
                    value={controlRights ? true : false}
                    onChange={(e) => {
                      setControlRights(e.target.checked);
                    }}
                  />
                  <label htmlFor="controlRightsYes"></label>
                  <div></div>
                </div>
              </div>
              <button className="form_btn" onClick={register}>
                등록
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReg;

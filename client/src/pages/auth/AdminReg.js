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

  //이메일 정규표현식
  const validEmail = (email) => {
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const register = async (e) => {
    e.preventDefault();

    // 정보를 입력하지 않은 부분이 있는지 check
    if (
      userName === '' ||
      userIdReg === '' ||
      passwordReg === '' ||
      confirmPassword === '' ||
      email === '' ||
      position === ''
    ) {
      alert('관리자 정보를 모두 입력해주세요.');
      return;
    }

    // 비밀번호 길이 check
    if (passwordReg.length < 7 || passwordReg.length > 15) {
      alert('비밀번호는 7자 이상 15자 이하로 입력해주세요.');
      return;
    }

    // 비밀번호와 비밀번호 확인이 일치하는지 check
    if (passwordReg !== confirmPassword) {
      alert('비밀번호를 똑같이 입력해주세요.');
      return;
    }

    //이메일이 형식에 맞는지 check(정규표현식 함수 return값이 false인가?)
    if (!validEmail(email)) {
      alert('올바르지 않은 이메일 형식입니다');
      return;
    }

    const control = controlRights ? '있음' : '없음';

    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/register',
        {
          userName: userName,
          userId: userIdReg,
          password: passwordReg,
          email: email,
          position: position,
          controlRights: control,
        },
      );

      // 서버로부터 응답 확인(잘 등록되었는가?)
      if (response.data && response.data.id) {
        alert('관리자 정보가 등록되었습니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message; // 아이디, 이메일 중복메시지(user라우팅서버에서 설정)
        alert(errorMessage);
      } else {
        console.error('등록 실패:', error);
        alert('관리자 정보 등록에 실패했습니다.');
      }
    }
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
                  placeholder="Employee ID"
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
                    type="text"
                    placeholder="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <select
                  name="position"
                  className="admin-input-select"
                  value={position}
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

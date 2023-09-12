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
    <div className="register">
      <input
        type="text"
        placeholder="이름"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="사원코드"
        onChange={(e) => {
          setUserIdReg(e.target.value);
        }}
      />

      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />

      <input
        type="password"
        placeholder="비밀번호 확인"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />

      <input
        type="email"
        placeholder="이메일"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="직급"
        onChange={(e) => {
          setPosition(e.target.value);
        }}
      />
      <p>차량 제어 권한</p>
      <input
        type="radio"
        name="controlRights"
        value="있음"
        id="yes"
        onChange={(e) => {
          setControlRights(e.target.value);
        }}
      />
      <label htmlFor="yes">있음</label>
      <input
        type="radio"
        name="controlRights"
        value="없음"
        id="no"
        onChange={(e) => {
          setControlRights(e.target.value);
        }}
      />
      <label htmlFor="no">없음</label>
      <button onClick={register}>관리자 등록</button>
    </div>
  );
};

export default AdminReg;

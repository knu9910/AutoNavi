import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import blueLogo from '../../img/bluelogo.jpg';
import '../../styles/adminEdit.css';

const AdminEdit = () => {
  const { id } = useParams(); // URL에서 관리자 ID 가져오기
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminData, setAdminData] = useState({
    userName: '',
    userId: '',
    password: '',
    email: '',
    position: '',
    controlRights: false,
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_SERVER}/api/users/${id}`)
        .then((response) => {
          setAdminData(response.data);
        })
        .catch((error) => {
          console.error('데이터 가져오기 오류:', error);
        });
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      if (
        adminData.userName === '' ||
        adminData.userId === '' ||
        adminData.password === '' ||
        confirmPassword === '' ||
        adminData.email === '' ||
        adminData.position === ''
      ) {
        alert('관리자 정보를 모두 입력해주세요.');
        return;
      }

      if (adminData.password !== confirmPassword) {
        alert('비밀번호를 똑같이 입력해주세요.');
        return;
      }
      // 서버로 수정 요청 보내기
      await axios.put(
        `${process.env.REACT_APP_API_SERVER}/api/users/${id}`,
        adminData,
      );
      alert('관리자 정보가 수정되었습니다.');
    } catch (error) {
      console.error('수정 실패:', error);
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
            <p>관리자 수정</p>
            <div className="signup-Detail">
              <div className="admin-input">
                <input
                  type="text"
                  placeholder="name"
                  value={adminData.userName}
                  onChange={(e) =>
                    setAdminData({ ...adminData, userName: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Employee ID"
                  value={adminData.userId}
                  onChange={(e) =>
                    setAdminData({ ...adminData, userId: e.target.value })
                  }
                />
              </div>
              <div className="admin-input">
                <input
                  type="password"
                  placeholder="Password"
                  value={adminData.password}
                  onChange={(e) =>
                    setAdminData({ ...adminData, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password Check"
                  value={confirmPassword}
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
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData({ ...adminData, email: e.target.value })
                    }
                  />
                </div>
                <select
                  className="admin-input-select"
                  value={adminData.position}
                  onChange={(e) =>
                    setAdminData({ ...adminData, position: e.target.value })
                  }
                >
                  <option value="">Position</option>
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
                    checked={adminData.controlRights === '있음'}
                    onChange={(e) =>
                      setAdminData({
                        ...adminData,
                        controlRights: e.target.checked ? '있음' : '없음',
                      })
                    }
                  />
                  <label htmlFor="controlRightsYes"></label>
                  <div></div>
                </div>
              </div>
              <button className="form_btn" onClick={handleUpdate}>
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEdit;

import '../../styles/adminList.css';
import React from 'react';
import { Link } from 'react-router-dom';
const AdminList = () => {
  return (
    <>
      <div className="cp-search-box">
        <div className="cp-box1">
          <button
            className="cp-button1"
            onClick={() => (window.location.href = '/auth/AdminReg')}
          >
            <p>관리자 등록</p>
          </button>
        </div>
        <div className="cp-box2">
          <form className="cp-search">
            <input
              className="cp-text"
              type="text"
              name=""
              placeholder="Search..."
            />
            <button className="cp-button" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="cp-container">
        <table className="cp-table">
          <thead>
            <tr>
              <th>사원번호</th>
              <th>이름</th>
              <th>직급</th>
              <th>권한</th>
              <th>...</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>726228</td>
              <td>신규림</td>
              <td>사원</td>
              <td>A</td>
              <td style={{ float: 'right' }}>
                <button className="cp-edit" href="#">
                  수정
                </button>
                <button className="cp-delete" href="#">
                  삭제
                </button>
              </td>
            </tr>
            <tr>
              <td>726228</td>
              <td>신규림</td>
              <td>사원</td>
              <td>A</td>
              <td style={{ float: 'right' }}>
                <button className="cp-edit" href="#">
                  수정
                </button>
                <button className="cp-delete" href="#">
                  삭제
                </button>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="5" className="text-center">
                autonavi@autonavi.kr{' '}
                <Link to="" target="_blank">
                  autonavi
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AdminList;

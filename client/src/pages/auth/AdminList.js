import '../../styles/adminList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  // 서버에서 데이터 가져오기!!
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users/list')
      .then((response) => {
        // 자동 순번매기기
        const dataNo = response.data.map((admin, index) => ({
          ...admin,
          no: index + 1,
        }));
        setAdminList(dataNo);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goNext = () => {
    const maxPage = Math.ceil(filterAdminList().length / itemsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 페이지당 표시되는 게시물 수 변경(핸들러)
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  // 검색어 입력 하면 결과 업데이트하기
  const filterAdminList = () => {
    if (!search) {
      return adminList;
    }

    const regExp = new RegExp(search, 'i');
    const filteredData = adminList.filter(
      (admin) =>
        regExp.test(admin.userId) ||
        regExp.test(admin.userName) ||
        regExp.test(admin.position) ||
        regExp.test(admin.controlRights) ||
        regExp.test(admin.email),
    );
    return filteredData;
  };

  //페이지별 data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filterAdminList().slice(startIndex, endIndex);

  // 검색어 입력 시 검색 결과 갱신
  const DoSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  //삭제버튼 누르면 데이터 삭제하기
  const DeleteAdmin = async (id) => {
    try {
      // 서버로 삭제요청
      await axios.delete(`http://localhost:8080/api/users/${id}`);

      // 삭제 요청 성공 하면 클라이언트에서도 삭제하기
      setAdminList((prevAdminList) => {
        const updatedList = prevAdminList.filter((admin) => admin.id !== id);

        // dataNo 업뎃
        const updatedDataNo = updatedList.map((admin, index) => ({
          ...admin,
          no: index + 1,
        }));

        return updatedDataNo;
      });
    } catch (error) {
      console.error('삭제 오류:', error);
    }
  };

  return (
    <>
      <div className="cp-search-box">
        <div className="cp-box1">
          <Link to="/auth/adminReg">
            <button className="cp-button1">
              <p>관리자 등록</p>
            </button>
          </Link>
        </div>
        <div className="cp-box2">
          <form className="cp-search">
            <input
              className="cp-text"
              type="text"
              name=""
              placeholder="Search..."
              value={search}
              onChange={DoSearch}
            />
            <div className="cp-button" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
          </form>
        </div>
      </div>
      <div className="cp-container">
        <table className="cp-table">
          <thead>
            <tr>
              <th>No</th>
              <th>사원번호</th>
              <th>이름</th>
              <th>직급</th>
              <th>권한</th>
              <th>email</th>
            </tr>
          </thead>

          <tbody>
            {displayedData.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.no}</td>
                <td>{admin.userId}</td>
                <td>{admin.userName}</td>
                <td>{admin.position}</td>
                <td>{admin.controlRights}</td>
                <td>{admin.email}</td>

                <td style={{ float: 'right' }}>
                  <Link to="/auth/adminedit">
                    <button className="cp-edit" href="#">
                      수정
                    </button>
                  </Link>
                  <button
                    className="cp-delete"
                    onClick={() => DeleteAdmin(admin.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="table-foot">
              <td>
                <span className="item-filter-text">Items per Page: </span>
                <div className="item-filter" tabIndex="1">
                  <input
                    className="selectopt"
                    name="test"
                    type="radio"
                    id="opt1"
                    value={5}
                    checked={itemsPerPage === 5}
                    onChange={handleItemsPerPageChange}
                  />
                  <label htmlFor="opt1" className="option">
                    5
                  </label>
                  <input
                    className="selectopt"
                    name="test"
                    type="radio"
                    id="opt2"
                    value={10}
                    checked={itemsPerPage === 10}
                    onChange={handleItemsPerPageChange}
                  />
                  <label htmlFor="opt2" className="option">
                    10
                  </label>
                  <input
                    className="selectopt"
                    name="test"
                    type="radio"
                    id="opt3"
                    value={15}
                    checked={itemsPerPage === 15}
                    onChange={handleItemsPerPageChange}
                  />
                  <label htmlFor="opt3" className="option">
                    15
                  </label>
                </div>
              </td>

              <td colSpan="5" className="text-center">
                autonavi@autonavi.kr{' '}
                <Link to="/" target="_blank">
                  autonavi
                </Link>
              </td>
              <td className="arrow-box">
                <button className="arr left" onClick={goPrev}>
                  <div className="arrow"></div>
                </button>
                <button className="arr right" onClick={goNext}>
                  <div className="arrow"></div>
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AdminList;

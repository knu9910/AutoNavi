import '../../styles/adminList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PaginationComp from '../../components/common/PaginationComp';
import HistoryList from '../carHistory/HistoryList';

const AdminList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // or your default items per page
  const [search, setSearch] = useState('');
  const [adminList, setAdminList] = useState([]); // Your list of data

  const totalPages = Math.ceil(adminList.length / itemsPerPage);

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

  // 삭제기능: 삭제버튼 클릭 시 경고창 표시(confirm)
  const showDeleteAlert = (id) => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      // 삭제 확인 클릭한 경우에만 삭제 요청함
      handleDelete(id);
      alert('관리자 정보가 삭제되었습니다.');
    }
  };

  // 데이터 삭제 함수
  const handleDelete = async (id) => {
    try {
      // 서버로 삭제 요청
      await axios.delete(`http://localhost:8080/api/users/${id}`);

      // 삭제 요청 성공 시 클라이언트에서도 삭제하기
      setAdminList((prevAdminList) =>
        prevAdminList.filter((admin) => admin.id !== id),
      );

      // 삭제 후 순번 업데이트
      setAdminList((prevAdminList) =>
        prevAdminList.map((admin, index) => ({
          ...admin,
          no: index + 1,
        })),
      );
    } catch (error) {
      console.error('삭제 실패:', error);
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
        <div className="cp-table">
          <p> No </p>
          <p> 사원번호 </p>
          <p> 이름 </p>
          <p> 직급 </p>
          <p> 권한 </p>
          <p> E-mail </p>
          <p> ... </p>
        </div>
        <div className="cp-content">
          {displayedData.map((admin) => (
            <ul key={admin.id}>
              <li className="admin_no">{admin.no}</li>
              <li className="admin_userId">{admin.userId}</li>
              <li className="admin_userName">{admin.userName}</li>
              <li className="admin_position">{admin.position}</li>
              <li className="admin_controlRights">{admin.controlRights}</li>
              <li className="admin_email">{admin.email}</li>
              <li>
                <Link to={`/auth/adminedit/${admin.id}`}>
                  <button className="cp-edit" href="#">
                    수정
                  </button>
                </Link>
                <button
                  className="cp-delete"
                  onClick={() => showDeleteAlert(admin.id)}
                >
                  삭제
                </button>
              </li>
            </ul>
          ))}
        </div>
        <div>
          <div className="table-foot">
            <div className="admin-pagination">
              <p className="item-filter-text">items per page: </p>
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
              <td colSpan="5" className="text-center"></td>
              <PaginationComp
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminList;

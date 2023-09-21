import blueLogo from '../../img/bluelogo.jpg';
import '../../styles/adminEdit.css';

const AdminEdit = () => {
  return (
    <>
      <header className="ContactPerson">
        <img className="bluelogo" src={blueLogo} alt="bluelogo" />
      </header>
      <div className="wrapper-signup">
        <div className="container-signup">
          <div className="signup-container">
            <p>관리자 수정</p>
            <form className="signup-Detail">
              <div className="admin-input">
                <input type="text" placeholder="name" />

                <input type="id" placeholder="Contact Person no." />
              </div>
              <div className="admin-input">
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Password Check" />
              </div>
              <div className="select-btn">
                <div className="admin-input">
                  <input type="email" placeholder="email" />
                </div>
                <select className="admin-input-select">
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
                  />
                  <label htmlFor="controlRightsYes"></label>
                  <div></div>
                </div>
              </div>
              <button className="form_btn">등록</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEdit;

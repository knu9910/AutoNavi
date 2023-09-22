import { Link } from 'react-router-dom';
import '../../styles/carReg.css';

const CarReg = () => {
  function PreviewImage() {
    var preview = new FileReader();
    preview.onload = function (e) {
      document.getElementById('user_image').src = e.target.result;
    };

    preview.readAsDataURL(document.getElementById('user_profile_img').files[0]);
  }
  return (
    <>
      <section>
        <div className="carrst-container">
          <p className="carrst-title"> 차량 등록 </p>

          <div className="carreg-form">
            <div className="carrstimg-container">
              <div>
                <img id="user_image" src="#" alt="" />
              </div>
              <div className="custom-file-upload">
                <label>
                  <input
                    accept=".jpg"
                    style={{ display: 'none' }}
                    onChange={PreviewImage}
                    type="file"
                    id="user_profile_img"
                  />
                  <i className="fa fa-cloud-upload"></i>Img Upload
                </label>
              </div>
            </div>
            <div className="form-container">
              <div className="carrstform-container">
                <form action="#">
                  <div className="form-row">
                    <div className="car_reg_inner">
                      <div className="info_label">차량ID</div>
                      <input className="info_box" />
                      <div className="info_label">차량번호</div>
                      <input className="info_box" />
                      <div className="info_label">차명</div>
                      <input className="info_box" />
                      <div className="info_label">차종</div>
                      <input className="info_box" />
                      <div className="info_label">제조년월</div>
                      <input className="info_box" />
                      <div className="info_label">등록일</div>
                      <input className="info_box" />
                    </div>
                  </div>
                  <div className="form-row submit-btn">
                    <Link to="/carlist">
                      <input
                        className="carreg-btn"
                        type="submit"
                        value="차량등록"
                      />
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarReg;

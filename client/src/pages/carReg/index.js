import { Link, useNavigate } from 'react-router-dom';
import '../../styles/carReg.css';
import { useState } from 'react';
import axios from 'axios';

const CarReg = () => {
  const [carName, setCarName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [carType, setCayType] = useState('');
  const [carMfg, setCarMfg] = useState('');
  const [batteryType, setBatteryType] = useState('PowerFlow');

  const navigate = useNavigate();

  const addCar = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post('http://localhost:8080/api/cars/carReg', {
        car_number: carNumber,
        battery_type: batteryType,
        car_type: carType,
        car_name: carName,
        mfg_date: carMfg,
      });
      const { id } = res.data;
      if (!id) return alert('이미 존재하는 차량입니다');
      alert('차량등록이 완료되었습니다');
      navigate('/car/carlist');
    } catch (err) {
      console.log(err);
      alert('이미 존재하는 차량입니다.');
    }
  };

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
                      <div className="info_label">차명</div>
                      <input
                        className="info_box"
                        onChange={(e) => setCarName(e.target.value)}
                      />
                      <div className="info_label">차량번호</div>
                      <input
                        className="info_box"
                        onChange={(e) => setCarNumber(e.target.value)}
                      />
                      <div className="info_label">차종</div>
                      <input
                        className="info_box"
                        onChange={(e) => setCayType(e.target.value)}
                      />
                      <div className="info_label">제조년월</div>
                      <input
                        className="info_box"
                        onChange={(e) => setCarMfg(e.target.value)}
                      />
                      <div className="info_label">배터리종류</div>
                      <input
                        className="info_box"
                        value="PowerFlow"
                        onChange={(e) => setBatteryType(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row submit-btn">
                    <input
                      className="carreg-btn"
                      type="submit"
                      value="차량등록"
                      onClick={addCar}
                    />
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

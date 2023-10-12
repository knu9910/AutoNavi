import { useNavigate } from 'react-router-dom';
import '../../styles/carReg.css';
import { useState } from 'react';
import axios from 'axios';
import { addCar } from '../../store/carSlice';
import { useDispatch } from 'react-redux';

const CarReg = () => {
  const [carName, setCarName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [carType, setCayType] = useState('');
  const [carMfg, setCarMfg] = useState('');
  const [batteryType, setBatteryType] = useState('PowerFlow');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleAddCar = async (e) => {
    try {
      e.preventDefault();
      let car = {
        car_number: carNumber,
        battery_type: batteryType,
        car_type: carType,
        car_name: carName,
        mfg_date: carMfg,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/cars/carReg`,
        car,
      );
      const { id } = res.data;

      if (!id) return alert('이미 존재하는 차량입니다');
      car.car_id = id;
      dispatch(addCar({ car }));
      alert('차량등록이 완료되었습니다');
      navigate('/car/carlist');
    } catch (err) {
      console.log(err);
      alert('이미 존재하는 차량입니다.');
    }
  };

  return (
    <>
      <section>
        <div className="carrst-container">
          <p className="carrst-title"> 차량 등록 </p>

          <div className="carreg-form">
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
                      onClick={handleAddCar}
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

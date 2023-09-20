import { Link } from 'react-router-dom';
import '../../styles/carReg.css';
import React, { useState } from 'react';
import blueLogo from '../../img/bluelogo.jpg';

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
          <div className="carrstimg-container">
            <div className="custom-file-upload">
              <label>
                <img
                  id="user_image"
                  style={{ display: 'flex' }}
                  src="#"
                  alt=""
                />
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
                <p className="carrst-title"> 차량 등록 </p>
                <div className="form-row">
                  <div className="input-data">
                    <input type="text" required />
                    <div className="underline"></div>
                    <label htmlFor="">차량 번호</label>
                  </div>
                  <div className="input-data">
                    <input type="text" required />
                    <div className="underline"></div>
                    <label htmlFor="">차종</label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-data">
                    <input type="text" required />
                    <div className="underline"></div>
                    <label htmlFor="">제조연월</label>
                  </div>
                  <div className="input-data">
                    <input type="text" required />
                    <div className="underline"></div>
                    <label htmlFor="">충전용량</label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-data textarea">
                    <div className="form-row submit-btn">
                      <div className="input-data">
                        <div className="inner"></div>
                        <Link to="/carlist">
                          <input type="submit" value="차량등록" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarReg;

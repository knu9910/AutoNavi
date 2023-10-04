import '../../styles/history.css';
import 'charts.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const History = () => {
  const [carData, setCarData] = useState({});
  const [chargeHistory, setChargeHistory] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;

  useEffect(() => {
    const getCar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/history/getHistoryByCar/${id}`,
        );
        const carData = response.data;
        setCarData(carData);
      } catch (err) {
        navigate('/notFound');
        console.error(err);
      }
    };

    const getChargeHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/history/chargeFind/${id}/2023-09-26/${currentDate}`,
        );
        const chargeHistoryData = response.data;
        setChargeHistory(chargeHistoryData);
      } catch (err) {
        navigate('/notFound');
        console.error(err);
      }
    };

    getCar();
    getChargeHistory();
  }, [id]);

  const cumBatterySize = carData?.cum_battery * 0.015;
  const tireChangeSize = carData?.tire_change * 0.1;
  const batteryChangeSize = carData?.battery_change * 0.1;

  return (
    <div className="history_wrap_detail">
      <div className="car_history_wrap">
        <div className="car_info">차량 히스토리</div>
        <div className="table1">
          <table
            id="chart1"
            className="charts-css bar show-labels data-spacing-15"
          >
            <caption> 총 거리와 배터리 사용량 </caption>
            <thead>
              <tr>
                <th scope="col"> Distance and Battery </th>
                <th scope="col"> Amount </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"> 누적 배터리 사용량 </th>
                <td style={{ '--size': cumBatterySize }}>
                  <span className="data"> {carData?.cum_battery} </span>
                </td>
              </tr>
              <tr>
                <th scope="row"> 타이어 교체 횟수 </th>
                <td style={{ '--size': tireChangeSize }}>
                  <span className="data"> {carData?.tire_change} </span>
                </td>
              </tr>
              <tr>
                <th scope="row"> 배터리 교체 횟수 </th>
                <td style={{ '--size': batteryChangeSize }}>
                  <span className="data"> {carData?.battery_change} </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="history_info_wrap">
          <div className="info_input">
            <div className="info_label_history">충전소 이용 내역</div>
            <div className="info_box_history">
              <table className="info_table_history">
                <tbody>
                  {chargeHistory.slice(0, 5).map((historyItem, index) => (
                    <tr key={index}>
                      <td>{historyItem.createdAt}</td>
                      <td>{historyItem.name}</td>
                      <td>{historyItem.fee}</td>
                      <br />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="info_input">
            <div className="info_label_history">최근 운행 경로</div>
            <div className="info_box_history"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

import '../../styles/history.css';
import HistoryChart from './HistoryChart';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const History = () => {
  // const [carData, setCarData] = useState({});
  const [chargeHistory, setChargeHistory] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;

  useEffect(() => {
    // const getCar = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:8080/api/history/getHistoryByCar/${id}`,
    //     );
    //     const carData = response.data;
    //     setCarData(carData);
    //   } catch (err) {
    //     navigate('/notFound');
    //     console.error(err);
    //   }
    // };

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

    // getCar();
    getChargeHistory();
  }, [id]);

  return (
    <div className="history_wrap_detail">
      <div className="car_history_wrap">
        <div className="car_info">차량 히스토리</div>
        <div className="history_chart">
          <HistoryChart />
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
          <div className="info_input">
            <div className="info_label_history">사고 발생 내역</div>
            <div className="info_box_history"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

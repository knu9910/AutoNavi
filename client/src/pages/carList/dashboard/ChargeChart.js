import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const ChargeChart = () => {
  const [chargeData, setChargeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API에서 데이터 가져오기
        const response = await axios.get(
          'http://localhost:8080/api/history/chargeFindAll/2023-09-02/2023-10-06',
        );
        const data = response.data; // API 응답 데이터

        // API에서 받아온 데이터를 상태에 저장
        setChargeData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData(); // 데이터 가져오는 함수 호출
  }, []);

  const carNames = chargeData.map((item) => item.car_name);
  const totalCharges = chargeData.map((item) => parseFloat(item.total_charge));

  const chartData = {
    labels: carNames, // 차 이름을 라벨로 사용
    datasets: [
      {
        label: 'Total Charge Amount',
        data: totalCharges, // API에서 받아온 토탈 충전 요금 데이터 사용
        backgroundColor: '#0300a5',
        borderColor: '#0300a5',
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Bar
          className="chargeChart"
          data={chartData}
          style={{ background: 'white', width: '1000px' }}
        />
      )}
    </div>
  );
};

export default ChargeChart;

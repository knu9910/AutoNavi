import 'chart.js';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const HistoryChart = () => {
  const [carData, setCarData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const chartRef = useRef(null);

  const xValues = [
    '누적 배터리 사용량',
    '사고 발생 횟수',
    '타이어 교체 횟수',
    '배터리 교체 횟수',
  ];
  const barColors = ['#3B6BA5', '#72A5D3', '#98DCE8', '#B1D3E3'];

  // 데이터 로딩
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

    getCar();
  }, [id, navigate]);

  // 차트 렌더링
  useEffect(() => {
    const canvas = document.getElementById('myChart');
    if (!canvas) {
      console.error("Canvas element with id 'myChart' not found.");
      return;
    }

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const newChart = new Chart(canvas, {
      type: 'bar',
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
        },
        // scales: { x: { display: false } },
      },
      data: {
        labels: xValues,
        datasets: [
          {
            barPercentage: 0.5,
            backgroundColor: barColors,
            data: [
              carData?.cum_battery,
              carData?.accident,
              carData?.tire_change,
              carData?.battery_change,
            ],
          },
        ],
      },
    });
    chartRef.current = newChart;
  }, [carData]);

  return (
    <div style={{ width: '630px' }}>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default HistoryChart;

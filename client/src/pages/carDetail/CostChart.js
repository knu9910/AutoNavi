import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import '../../styles/costChart.css';
import axios from 'axios';
import { useParams } from 'react-router';

const CostChart = () => {
  const { id } = useParams();
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartFees, setChartFees] = useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;

  const handleChartDataChange = async (type) => {
    try {
      const costRes = await axios.get(
        `http://localhost:8080/api/history/chargeFind/${id}/2023-09-20/${currentDate}`,
      );
      const data = costRes.data;
      setChartData(data);
      setChartLabels(data);

      var chartFeesData;
      var chartLabelsData;

      if (type === 'day') {
        chartLabelsData = data.map((row) => row.location);
        chartFeesData = data.map((row) => row.id);
      } else if (type === 'month') {
        chartLabelsData = data.map((row) => row.createdAt);
        chartFeesData = data.map((row) => row.fee);
      } else if (type === 'year') {
        chartLabelsData = data.map((row) => row.name);
        chartFeesData = data.map((row) => row.car_id);
      } else {
        chartLabelsData = data.map((row) => row.location);
        chartFeesData = data.map((row) => row.fee);
      }

      setChartFees(chartFeesData);
      setChartLabels(chartLabelsData);
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const getCost = async () => {
      const costRes = await axios.get(
        `http://localhost:8080/api/history/chargeFind/${id}/2023-09-20/${currentDate}`,
      );
      const costData = costRes.data;

      const canvas = document.getElementById('costChart');
      if (!canvas) {
        console.error("Canvas element with id 'myChart' not found.");
        return;
      }

      if (chartRef.current) {
        chartRef.current.destroy();
      }
      console.log(costData);
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      const newChart = new Chart(canvas, {
        type: 'bar',
        options: {
          scales: {
            x: {
              display: true,
            },
            y: {
              beginAtZero: true,
              max: 10000, // 최대값 설정
            },
          },
          indexAxis: 'x',
          plugins: {
            legend: {
              display: false,
            },
          },
        },
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: '총 충전요금',
              data: chartFees,

              backgroundColor: 'rgb(100, 153, 233)',
            },
          ],
        },
      });
      chartRef.current = newChart;
    };
    getCost();
  }, [id, chartLabels, chartFees]);

  useEffect(() => {
    handleChartDataChange('day'); //초기 값 지정
  }, []);

  return (
    <div className="costChart">
      <button className="delete" onClick={() => handleChartDataChange('day')}>
        day
      </button>
      <button className="delete" onClick={() => handleChartDataChange('month')}>
        month
      </button>
      <button className="delete" onClick={() => handleChartDataChange('year')}>
        year
      </button>
      <div style={{ width: '630px' }}>
        <canvas id="costChart"></canvas>
      </div>
    </div>
  );
};

export default CostChart;

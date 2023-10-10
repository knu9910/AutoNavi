import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import '../../styles/costChart.css';
import axios from 'axios';
import { useParams } from 'react-router';

const CostChart = () => {
  const { id } = useParams();
  const chartRef = useRef(null);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartFees, setChartFees] = useState([]);

  const handleChartDataChange = async (type) => {
    try {
      var chartFeesData;
      var chartLabelsData;

      if (type === 'day') {
        const res = await axios.get(
          `http://localhost:8080/api/history/getChargeTotal/${id}`,
        );
        const weekData = res.data;
        chartLabelsData = weekData.map((row) => row.date);
        chartFeesData = weekData.map((row) => row.total_charge);
      } else if (type === 'month') {
        const res = await axios.get(
          `http://localhost:8080/api/history/getMonthlyChargeTotal/${id}`,
        );
        const month = res.data;
        chartLabelsData = month.map((row) => `${row.month} 월`);
        chartFeesData = month.map((row) => row.total_charge);
      }
      setChartFees(chartFeesData);
      setChartLabels(chartLabelsData);
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const getCost = async () => {
      const canvas = document.getElementById('costChart');
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
      <div className="buttons">
        <button
          className="daymonth"
          onClick={() => handleChartDataChange('day')}
        >
          day
        </button>
        <button
          className="daymonth"
          onClick={() => handleChartDataChange('month')}
        >
          month
        </button>
      </div>
      <div className="chart">
        <canvas id="costChart"></canvas>
      </div>
    </div>
  );
};

export default CostChart;

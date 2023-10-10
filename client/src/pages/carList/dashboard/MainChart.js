import React, { useEffect, useRef, useState } from 'react';
import 'chart.js';
import Chart from 'chart.js/auto';
import axios from 'axios';
const MainChart = () => {
  const monthDisRef = useRef(null);
  const dayDisRef = useRef(null);

  const [chartInstances, setChartInstances] = useState({
    monthDis: null,
    dayDis: null,
    doughnutChart: null,
  });

  useEffect(() => {
    const chart = async () => {
      const res = await axios.get(
        'http://localhost:8080/api/history/getDailyDistanceData',
      );
      const dailyData = res.data;

      const res2 = await axios.get(
        'http://localhost:8080/api/history/getMonthlyTotalDistance',
      );
      const monthData = res2.data;
      const { monthDis, dayDis, doughnutChart } = chartInstances;

      if (monthDis) {
        monthDis.destroy();
      }
      if (dayDis) {
        dayDis.destroy();
      }
      if (doughnutChart) {
        doughnutChart.destroy();
      }

      if (monthDisRef.current) {
        const monthDisChart = new Chart(monthDisRef.current, {
          type: 'bar',
          data: {
            labels: monthData.map((row) => row.month),
            datasets: [
              {
                label: '전 차량 월 별 이동거리',
                data: monthData.map((row) => row.total_distance),
                borderWidth: 1,
                backgroundColor: '#0300a5',
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                display: false,
                beginAtZero: false,
              },
            },
          },
        });
        setChartInstances((prevInstances) => ({
          ...prevInstances,
          monthDis: monthDisChart,
        }));
      }

      if (dayDisRef.current) {
        const dayDisConfig = {
          type: 'line',
          data: {
            labels: dailyData.map((row) => row.date),
            datasets: [
              {
                label: '전 차량 일 별 평균 이동거리',
                data: dailyData.map((row) => row.total_distance),
                borderWidth: 1,
                borderColor: '#0300a5',
              },
            ],
          },
          options: {
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            stacked: false,
            plugins: {
              title: {
                display: true,
              },
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                type: 'linear',
                display: false,
                position: 'left',
              },
              y1: {
                type: 'linear',
                display: false,
                position: 'right',
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
          },
        };

        const dayDisChart = new Chart(dayDisRef.current, dayDisConfig);
        setChartInstances((prevInstances) => ({
          ...prevInstances,
          dayDis: dayDisChart,
        }));
      }
    };
    chart();
  }, []);
  return (
    <div className="chart-dashBoard">
      <div className="middle" style={{ marginTop: '40px' }}></div>
      <canvas className="chart-char" ref={monthDisRef}></canvas>
      <canvas className="chart-char" ref={dayDisRef}></canvas>
    </div>
  );
};
export default MainChart;

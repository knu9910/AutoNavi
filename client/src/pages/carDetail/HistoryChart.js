import 'chart.js';
import Chart from 'chart.js/auto';
import { useEffect } from 'react';

const HistoryChart = () => {
  const xValues = [
    '누적 배터리 사용량',
    '사고 발생 횟수',
    '타이어 교체 횟수',
    '배터리 교체 횟수',
  ];
  const yValues = [145, 12, 84, 34];
  const barColors = [
    'rgb(100, 153, 233)',
    'rgb(158, 221, 255)',
    'rgb(166, 246, 255)',
    'rgb(190, 255, 247)',
  ];

  useEffect(() => {
    const canvas = document.getElementById('myChart');
    if (!canvas) {
      console.error("Canvas element with id 'myChart' not found.");
      return;
    }

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    new Chart(canvas, {
      type: 'bar',
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          // x: {
          //   display: false,
          // },
        },
      },
      data: {
        labels: xValues,
        datasets: [
          {
            barPercentage: 0.6,
            backgroundColor: barColors,
            data: yValues,
          },
        ],
      },
    });
  }, []);

  return (
    <div style={{ width: '600px' }}>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default HistoryChart;

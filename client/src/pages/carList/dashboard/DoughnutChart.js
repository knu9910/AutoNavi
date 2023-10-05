import React, { useEffect, useRef, useState } from 'react';
import 'chart.js';
import Chart from 'chart.js/auto';

const DoughnutChart = () => {
  const doughnutChartRef = useRef(null);

  const [showDistanceCharts] = useState(false);
  const [chartInstances, setChartInstances] = useState({
    doughnutChart: null,
  });

  useEffect(() => {
    const { doughnutChart } = chartInstances;

    if (doughnutChart) {
      doughnutChart.destroy();
    }

    if (doughnutChartRef.current) {
      const data = {
        labels: ['운행', '미운행'],
        datasets: [
          {
            data: [15, 10],
            backgroundColor: ['#0300a5', '#D7F0FF'],
            cutout: '65%',
          },
        ],
      };

      const options = {
        plugins: {},
      };

      const doughnutChart = new Chart(doughnutChartRef.current, {
        type: 'doughnut',
        data: data,
        options: options,
      });

      setChartInstances((prevInstances) => ({
        ...prevInstances,
        doughnutChart,
      }));
    }
  }, [showDistanceCharts]);
  return <canvas className="ochart" ref={doughnutChartRef}></canvas>;
};
export default DoughnutChart;

import React, { useEffect, useRef, useState } from 'react';
import 'chart.js';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

const OpreationState = () => {
  const doughnutChartRef = useRef(null);

  const [showDistanceCharts] = useState(false);
  const [chartInstances, setChartInstances] = useState({
    doughnutChart: null,
  });

  const carsInfo = useSelector((state) => state.carStore.carsInfo);
  const waitingcars = carsInfo.filter(
    (waitingCar) => waitingCar.operation_st === '대기',
  );
  const operationCars = carsInfo.length - waitingcars.length;
  const waitCars = waitingcars.length;

  useEffect(() => {
    const { doughnutChart } = chartInstances;

    if (doughnutChart) {
      doughnutChart.destroy();
    }

    if (doughnutChartRef.current) {
      const data = {
        labels: ['대기', '운행'],
        datasets: [
          {
            data: [waitCars, operationCars],
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
export default OpreationState;

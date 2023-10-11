import React, { useEffect, useRef, useState } from 'react';
import 'chart.js';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

const OperationState = () => {
  const doughnutChartRef = useRef(null);

  const [chartInstances, setChartInstances] = useState({
    doughnutChart: null,
  });

  const carsInfo = useSelector((state) => state.carStore.carsInfo);

  const waitingCars = carsInfo.filter((car) => car.operation_st === '대기');
  const operationCars = carsInfo.length - waitingCars.length;
  const waitingCarCount = waitingCars.length;

  const initializeChart = (ref) => {
    if (ref.current) {
      const data = {
        labels: ['대기', '운행'],
        datasets: [
          {
            data: [waitingCarCount, operationCars],
            backgroundColor: ['#0300a5', '#D7F0FF'],
            cutout: '65%',
          },
        ],
      };

      const options = {
        plugins: {},
      };

      return new Chart(ref.current, {
        type: 'doughnut',
        data: data,
        options: options,
      });
    }
    return null;
  };

  useEffect(() => {
    const { doughnutChart } = chartInstances;

    if (doughnutChart) {
      doughnutChart.destroy();
    }

    const newDoughnutChart = initializeChart(doughnutChartRef);

    setChartInstances((prevInstances) => ({
      ...prevInstances,
      doughnutChart: newDoughnutChart,
    }));

    return () => {
      if (newDoughnutChart) {
        newDoughnutChart.destroy();
      }
    };
  }, [waitingCarCount, operationCars]);

  return <canvas className="operation-chart" ref={doughnutChartRef}></canvas>;
};

export default OperationState;

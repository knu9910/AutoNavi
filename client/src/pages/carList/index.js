import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../../styles/carList.css';
import List from './List';
import Chart from 'chart.js/auto';

const CarList = () => {
  const monthCharRef = useRef(null);
  const yearCharRef = useRef(null);
  const monthDisRef = useRef(null);
  const yearDisRef = useRef(null);
  const doughnutChartRef = useRef(null);

  const [showDistanceCharts, setShowDistanceCharts] = useState(false);
  const [chartInstances, setChartInstances] = useState({
    monthChar: null,
    yearChar: null,
    monthDis: null,
    yearDis: null,
    doughnutChart: null,
  });

  useEffect(() => {
    const { monthChar, yearChar, monthDis, yearDis, doughnutChart } =
      chartInstances;

    // Destroy existing Chart instances
    if (monthChar) {
      monthChar.destroy();
    }
    if (yearChar) {
      yearChar.destroy();
    }
    if (monthDis) {
      monthDis.destroy();
    }
    if (yearDis) {
      yearDis.destroy();
    }
    if (doughnutChart) {
      doughnutChart.destroy();
    }

    // Create the appropriate chart based on the selected view
    if (showDistanceCharts) {
      // Create distance charts
      if (monthDisRef.current) {
        const monthDisChart = new Chart(monthDisRef.current, {
          type: 'bar',
          data: {
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                label: '전 차량 월 별 이동거리',
                data: [80, 96, 100, 120, 111, 94, 96, 74, 88],
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

      if (yearDisRef.current) {
        // Create year distance chart
        const yearDisConfig = {
          type: 'line',
          data: {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [
              {
                label: '전 차량 년 별 평균 이동거리',
                data: [80, 85, 90, 88, 100],
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

        const yearDisChart = new Chart(yearDisRef.current, yearDisConfig);
        setChartInstances((prevInstances) => ({
          ...prevInstances,
          yearDis: yearDisChart,
        }));
      }
    } else {
      // Create battery charts
      if (monthCharRef.current) {
        const monthCharChart = new Chart(monthCharRef.current, {
          type: 'bar',
          data: {
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                label: '전 차량 월 별 평균 배터리 사용량',
                data: [12, 19, 3, 5, 2, 3],
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
          monthChar: monthCharChart,
        }));
      }

      if (yearCharRef.current) {
        // Create year battery chart
        const yearCharConfig = {
          type: 'line',
          data: {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [
              {
                label: '전 차량 년 별 평균 배터리 사용량',
                data: [5, 10, 8, 15, 10],
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

        const yearCharChart = new Chart(yearCharRef.current, yearCharConfig);
        setChartInstances((prevInstances) => ({
          ...prevInstances,
          yearChar: yearCharChart,
        }));
      }
    }

    // Create the doughnut chart
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

  return (
    <>
      <section>
        <div className="car-list">
          <List />
        </div>
        <div className="dashBoard">
          <div className="box-dashBoard">
            <div className="carNoti">
              <p>
                <FontAwesomeIcon icon={faBell} style={{ color: '#000000' }} />
                History
              </p>
            </div>
          </div>
          <div className="chart-dashBoard">
            <div className="middle">
              <label>
                <input
                  type="radio"
                  name="radio"
                  checked={!showDistanceCharts}
                  onChange={() => setShowDistanceCharts(false)}
                />
                <div className="front-end box">
                  <span>Battery</span>
                </div>
              </label>

              <label>
                <input
                  type="radio"
                  name="radio"
                  checked={showDistanceCharts}
                  onChange={() => setShowDistanceCharts(true)}
                />
                <div className="back-end box">
                  <span>Distance</span>
                </div>
              </label>
            </div>
            <div>
              {/* Render the appropriate chart based on the selected view */}
              {showDistanceCharts ? (
                <>
                  <canvas className="chart-char" ref={monthDisRef}></canvas>
                  <canvas className="chart-char" ref={yearDisRef}></canvas>
                </>
              ) : (
                <>
                  <canvas className="chart-char" ref={monthCharRef}></canvas>
                  <canvas className="chart-char" ref={yearCharRef}></canvas>
                </>
              )}
            </div>
          </div>
          <div className="nav-3">
            <div className="doughnut-chart">
              <canvas className="ochart" ref={doughnutChartRef}></canvas>
              <div className="smallbox">
                <div className="totalbox">
                  <p>Today Total Distance</p>
                  <p className="total-content"></p>
                </div>
              </div>
              <div className="smallbox">
                <div className="totalbox">
                  <p>Today Total Battery</p>
                  <p className="total-content"></p>
                </div>
              </div>
              <div className="smallbox">
                <div className="totalbox">
                  <p>Most Driven Vehicle</p>
                  <ul className="small-listbox">
                    <li className="small-carlist">
                      <span className="small-number">1.</span>
                      <span className="small-name">무인 1호</span>
                    </li>
                    <li className="small-carlist">
                      <span className="small-number">2.</span>
                      <span className="small-name">무인 2호</span>
                    </li>
                    <li className="small-carlist">
                      <span className="small-number">3.</span>
                      <span className="small-name">무인 3호</span>
                    </li>
                    <li className="small-carlist">
                      <span className="small-number">4.</span>
                      <span className="small-name">무인 4호</span>
                    </li>
                    <li className="small-carlist">
                      <span className="small-number">5.</span>
                      <span className="small-name">무인 5호</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarList;

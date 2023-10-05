import '../../../styles/carList.css';
import 'chart.js';
import MainChart from './mainChart';
import DoughnutChart from './doughnutChart';
import History from './history';
import TotalDistance from './totalDistance';
import TotalBattery from './totalBattery';
import MostDriveCar from './mostDriveCar';

const CarDashBoard = () => {
  return (
    <div className="dashBoard">
      <div className="box-dashBoard">
        <History />
      </div>
      <MainChart />
      <div className="nav-3">
        <div className="doughnut-chart">
          <DoughnutChart />
          <div className="smallbox">
            <TotalDistance />
          </div>
          <div className="smallbox">
            <TotalBattery />
          </div>
          <div className="smallbox">
            <MostDriveCar />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarDashBoard;

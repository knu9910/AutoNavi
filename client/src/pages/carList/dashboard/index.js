import '../../../styles/carList.css';
import 'chart.js';
import MainChart from './MainChart';
import DoughnutChart from './DoughnutChart';
import History from './History';
import TotalDistance from './TotalDistance';
import TotalBattery from './TotalBattery';
import MostDriveCar from './MostDriveCar';

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

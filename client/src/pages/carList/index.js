import '../../styles/carList.css';
import List from './List';
import CarDashBoard from './dashboard/index';

const CarList = () => {
  return (
    <>
      <section>
        <div className="car-list">
          <List />
        </div>
        <CarDashBoard />
      </section>
    </>
  );
};

export default CarList;

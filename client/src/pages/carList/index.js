import '../../styles/carList.css';
import List from './List';

const carList = () => {
  return (
    <>
      <section>
        <p>차량 등록 현황</p>
        <div className="car-list">
          <List />
        </div>
      </section>
    </>
  );
};

export default carList;

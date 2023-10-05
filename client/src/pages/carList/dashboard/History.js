import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
const History = () => {
  return (
    <div className="carNoti">
      <p>
        <FontAwesomeIcon icon={faBell} style={{ color: '#000000' }} />
        History
      </p>
    </div>
  );
};
export default History;

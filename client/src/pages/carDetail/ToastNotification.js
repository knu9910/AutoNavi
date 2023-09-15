import '../../styles/toastNotification.css';
import check from '../../img/check.png';
const ToastNotification = () => {
  return (
    <div className="toast_alert">
      <img alt="!" src={check} />
      <p>5678 차량이 운행을 시작하였습니다.</p>
    </div>
  );
};

export default ToastNotification;

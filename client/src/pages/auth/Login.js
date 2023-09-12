import mainLogo from '../../img/autoNavi_Logo.jpg';
import '../../css/home.css';
const Login = () => {
  return (
    <div className="mainpage">
      <div className="Logo">
        <img className="Logoimg" src={mainLogo} />
      </div>
      <div className="font-fix">
        <p className="font">무인 운송차량 관제 시스템</p>
      </div>
      <div className="buttontaget">
        <button className="main_btn">Sign in</button>
      </div>
    </div>
  );
};

export default Login;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import { Provider } from 'react-redux';
import store from './store/store';
import StartPage from './pages/StartPage';
import Main from './pages/main';
import AdminList from './pages/auth/AdminList';
import AdminReg from './pages/auth/AdminReg';
import AdminEdit from './pages/auth/AdminEdit';
import CarList from './pages/carList';
import CarReg from './pages/carReg';
import CarDetail from './pages/carDetail';

// 차량등록 페이지, 차량 등록 현황 페이지
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/adminList" element={<AdminList />} />
          <Route path="/auth/adminReg" element={<AdminReg />} />
          <Route path="/auth/adminedit" element={<AdminEdit />} />
          <Route path="/car/carList" element={<CarList />} />
          <Route path="/car/carReg" element={<CarReg />} />
          <Route path="/car/detail/:id" element={<CarDetail />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

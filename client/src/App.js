import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import StartPage from './pages/StartPage';
import Main from './pages/main';
import CarList from './pages/carList';
import CarReg from './pages/carReg';
import CarDetail from './pages/carDetail';
import LayOut from './components/layout';
import NotFound from './pages/NotFound';
import { AdminList, AdminReg, AdminEdit, Login } from './pages/auth';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<StartPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/main" element={<Main />} />
              <Route path="/auth/adminList" element={<AdminList />} />
              <Route path="/auth/adminedit" element={<AdminEdit />} />
              <Route path="/car/carList" element={<CarList />} />
              <Route path="/car/carReg" element={<CarReg />} />
              <Route path="/car/detail/:id" element={<CarDetail />} />
              <Route path="/auth/adminReg" element={<AdminReg />} />
            </Route>
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

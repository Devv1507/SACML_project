import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './routes';
import { AccountProvider } from './context/accountContext';

import RegisterPage from './pages/RegisterPage';
import AccessPage from './pages/AccessPage';
import HomePage from './pages/HomePage';
import AllAccountsPage from './pages/AllAccountsPage';
import UserFormPage from './pages/UserFormPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import UserInfoPage from './pages/UserInfoPage';
import UpdateAccountPage from './pages/UpdateAccountPage';
import CreditRequestForm from './pages/CreditRequestForm';
import AllCreditRequests from './pages/AllCreditRequests';
import SpecificRequestAnalytics from './pages/SpecificRequestAnalytics';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AccountProvider>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<AccessPage />}></Route>
            <Route path='/api/v1/sign-up' element={<RegisterPage />}></Route>
            {/* Private Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/api/v1/home' element={<HomePage />}></Route>
              <Route path='/api/v1/home/all' element={<AllAccountsPage />} ></Route>
              <Route path='/api/v1/home/update/:id/' element={<UpdateAccountPage />} ></Route>
              <Route path='api/v1/home/credit-requests/add' element={<CreditRequestForm />}></Route>
              <Route path='api/v1/home/credit-requests/all' element={<AllCreditRequests />}></Route>
              <Route path='api/v1/home/credit-requests/analytics/:id' element={<SpecificRequestAnalytics />}></Route>
              {/* User Routes */}
              <Route path='/api/v1/home/users/add' element={<UserFormPage />} ></Route>
              <Route path='/api/v1/home/users/:id' element={<UserInfoPage />} ></Route>
            </Route>
            <Route path='*' element={<h1>Not Found</h1>}></Route>
          </Routes>
        </AccountProvider>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

import RegisterPage from './pages/RegisterPage';
import AccessPage from './pages/AccessPage';
import HomePage from './pages/HomePage';
import AllAccountsPage from './pages/AllAccountsPage';
import UserFormPage from './pages/UserFormPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import { ProtectedRoute } from './routes';
import { AccountProvider } from './context/accountContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<AccessPage />}></Route>
          <Route path='/api/v1/sign-up' element={<RegisterPage />}></Route>
        </Routes>
        <AccountProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path='/api/v1/home' element={<HomePage />}></Route>
              <Route path='/api/v1/home/all' element={<AllAccountsPage />} ></Route>
              <Route path='/api/v1/home/users/add' element={<UserFormPage />} ></Route>
            </Route>
          </Routes>
        </AccountProvider>
      </BrowserRouter>
      <Footer />
    </AuthProvider>
  );
}

export default App;

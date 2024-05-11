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
import ProfilePage from './pages/ProfilePage';
import AllAccountsPage from './pages/AllAccountsPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      < Navbar />
        <Routes>
          <Route path='/' element={<AccessPage />}></Route>
          <Route path='/api/v1/sign-up' element={<RegisterPage />}></Route>
          <Route path='/api/v1/home' element={<HomePage />}></Route>
          <Route path='/api/v1/home' element={<ProfilePage />}></Route>
          <Route path='/api/v1/home/all' element={<AllAccountsPage />}></Route>
        </Routes>
      </BrowserRouter>
      < Footer />
    </AuthProvider>
  );
}

export default App;

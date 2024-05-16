import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from "../context/authContext";
import { useEffect, useState } from 'react';

function Navbar() {
  const { isAuthenticated, logOut, user } = useAuth();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    const date = new Date();
    const currentMonth = date.toLocaleString('default', { month: 'short' });
    setDay(date.getDate());
    setMonth(currentMonth);
  }, []);

  return (
    <nav className='navbar navbar-expand-lg navbar-light '>
      <ul className='navbar-nav ms-auto'>
        <li className='nav-item'>
          <div className='timeSquare'>
            <p className='day'>{day}</p>
            <p className='month'>{month}</p>
          </div>
        </li>
      </ul>

      <ul className='navbar-nav mr-auto align-items-center'>
        <img src='/imgs/icon.png' className='icon-nav' />

        <Dropdown>
          <Dropdown.Toggle className='dropdown-button'>
            <FontAwesomeIcon
              icon='fa-bars'
              className='fa-2x'
              aria-hidden='true'
            ></FontAwesomeIcon>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>Sobre nosotros</Dropdown.Item>
            {isAuthenticated ? (
              <Dropdown.Item to="/" onClick={() => logOut()}>Cerrar sesión</Dropdown.Item>
            ): (
              <Dropdown.Item href='/api/v1/sign-up'>Registrarse</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <li className='nav-item active'>
          <a className='nav-link' href='#'>
            <img src='/imgs/iconAttention.png' id='iconAtt' />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from "../context/authContext";

function Navbar() {
  const { isAuthenticated, logOut, user } = useAuth();

  return (
    <nav className='navbar navbar-expand-lg navbar-light '>
      <ul className='navbar-nav ms-auto'>
        <li className='nav-item'>
          <div className='timeSquare'>
            <p className='_-28'>28</p>
            <p className='feb'>Mar</p>
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
            <Dropdown.Item href='#/action-2'>Registrarse</Dropdown.Item>
            {isAuthenticated && (
              <Dropdown.Item to="/" onClick={() => logOut()}>Cerrar sesión</Dropdown.Item>
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

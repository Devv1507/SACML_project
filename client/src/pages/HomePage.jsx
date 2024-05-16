import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { useAccounts } from '../context/accountContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { account, adminRole, getAccount, userCompleted } = useAccounts();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setValue } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAccount();
        setValue('title', account.title);
        setValue('description', account.description);
        setValue('date',account.date ? dayjs(account.date).utc().format('YYYY-MM-DD'): '');
        setValue('completed', account.completed);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleClick = (route) => {
    navigate(route);
  };

  const handleClickCollapse = () => {
    setOpen(!open);
  };

  return (
    <div>
      {adminRole ? (
        <>
          <h1 className='h1-body'>Home: Administrador</h1>
        </>
      ) : (
        <>
          {userCompleted ? (
            <>
              <h1 className='h1-body'>Home: Usuario</h1>
            </>
          ) : (
            <>
              <h1 className='h1-body'>Home: Invitado</h1>
            </>
          )}
        </>
      )}

      <div className='row justify-content-center align-items-center w-100 h-auto'>
        <div className='col-md-4 justify-content-center'>
          <div className='card'>
            <div className='card-body justify-content-center align-items-center'>
              <h5 className='card-title'>Panel de opciones</h5>
              {adminRole ? (
                <>
                  <div className='mb-3 w-100 text-center'>
                    <button
                      className='btn-primay w-100'
                      onClick={() => handleClick('api/v1/home/all')}
                    >
                      Gestionar Cuentas
                    </button>
                  </div>
                  <div className='mb-3 text-center'>
                    <button
                      className='btn-primay w-100'
                      onClick={() => handleClick('api/v1/home/users/all')}
                    >
                      Gestionar Usuarios
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {userCompleted ? (
                    <div className='mb-3 text-center'>
                      <button
                        type='button'
                        className='btn-primary w-100 btn-block'
                        disabled
                      >
                        Realizar Petición de Crédito
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className='mb-3 text-center'>
                        <button
                          type='button'
                          className='btn-primary w-100 btn-block disabled-link'
                          disabled
                        >
                          Realizar Petición de Crédito
                        </button>
                      </div>
                      <div className='mb-3'>
                        <p className='p-center'>
                          La opción de arriba aparece deshabilitada?
                        </p>
                        <a href='/api/v1/home/users/add' className='p-center'>
                          Completar registro de usuario
                        </a>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className='col-md-4 justify-content-center'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Información de la Cuenta</h5>
              <>
                <Button
                  className={`button-re w-100 ${open ? 'active' : ''}`}
                  onClick={handleClickCollapse}
                >
                  {open ? 'Ocultar' : 'Mostrar'}
                </Button>
                <Collapse in={open}>
                  <div className='card card-body'>
                    <h5>Detalles de la Cuenta</h5>
                    <p>Nombre: {account.name}</p>
                    <p>Email: {account.email}</p>
                    <p>
                      Tipo de Cuenta:
                      {adminRole ? ' Administrador' : (userCompleted ? 'Usuario' : ' Invitado')}
                    </p>
                  </div>
                </Collapse>
              </>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>Información Personal</h5>

              <div className='mb-3 text-center'>
                <button
                  className='btn-primay w-100'
                  onClick={() =>
                    handleClick(`api/v1/home/users/${account.id}`)
                  }
                >
                  Ver
                </button>
              </div>
            </div>
          </div>

          <div className='card mt-3'>
            <div className='card-body'>
              <h5 className='card-title'>Schedule</h5>
              <p>{/* date */}</p>
              <div id='calendar'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

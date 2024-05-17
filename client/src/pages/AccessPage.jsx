import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function AccessPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const { logIn, isAuthenticated, errors: loginErrors } = useAuth();

  const navigate = useNavigate();
  /* const location = useLocation();
  const from = location.state?.from?.pathname || "/"; */

  const onSubmit = handleSubmit(async (values) => {
    logIn(values);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('api/v1/home');
    }
  }, [isAuthenticated]);
  
  // clear errors after 5 seconds (version for object errors)
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <main className='welcome-page'>
      <div className='h1-main'>
        <h1>Soluciones E-finance</h1>
      </div>
      <div className='card-body position-absolute top-70 start-50 translate-middle justify-content-center'>
        {loginErrors.map((error, i) => (
          <div className='text-alert-white mt-2' key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <div className='row h-50'>
            <div className='col w-50  d-flex flex-column'>
              {errors.email && (
                <p className='text-alert'>El correo electrónico es requerido</p>
              )}
              <input type='text' {...register('email', { required: true })} className='mt-auto'
                placeholder='Correo electrónico' autoFocus/>
            </div>
            <div className='col w-50 d-flex flex-column'>
              {errors.password && (
                <p className='text-alert'> La contraseña es requerida </p>
              )}
              <input type='password' {...register('password', { required: true })} className='mt-auto'
                placeholder='Contraseña' />
            </div>
          </div>
          <div className='d-flex mt-3 mb-3 gap-2 justify-content-center position-relative'>
            <button type='submit btn-primary'>Iniciar Sesión</button>
            <a href='#' className='p-center position-absolute end-0'>
              Olvidé mi contraseña
            </a>
          </div>
          <div>
            <p className='p-center'>
              ¿Aún no tienes cuenta?{' '}
              <Link to='/api/v1/sign-up' className='p-center'>
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AccessPage;

import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

function AccessPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { logIn, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {logIn(values);});

  useEffect(() => {
    if (isAuthenticated) {
      navigate("api/v1/home");
    }
  }, [isAuthenticated]);

  return (
    <div className='welcome-page'>
      {loginErrors.map((error, i) => (
        <div className='bg-danger text-alert-white mt-2' key={i}>
          {error}
        </div>
      ))}
      <div className='h1-main'>
        <h1>Soluciones E-finance</h1>
      </div>
      <div className='d-flex position-absolute top-70 start-50 translate-middle'>
        <form onSubmit={onSubmit}>
          <div className='d-flex justify-content-end'>
            <a href='#' className='p-center'>
              Olvidé mi contraseña
            </a>
          </div>
          <div className='inputs-welcome'>
            <input
              type='text'
              {...register('email', { required: true })}
              placeholder='Correo electrónico'
              autoFocus
            />
            {errors.email && (
              <p className='text-alert'> El correo electrónico es requerido </p>
            )}
            <input
              type='password'
              {...register('password', { required: true })}
              placeholder='Contraseña'
            />

            {errors.password && (
              <p className='text-alert'> La contaseña es requerida </p>
            )}
          </div>
          <div className='d-flex mt-3 mb-3 gap-2 justify-content-center'>
            <button type='submit'>Iniciar Sesión</button>
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
    </div>
  );
}

export default AccessPage;

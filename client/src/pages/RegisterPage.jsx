import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/api/v1/home');
  }, [isAuthenticated]);

  return (
    <div className='container p-3'>
      <div className='col-md-4 mx-auto'>
        <div className='card text-center'>
          <div className='card-header'>
            <h4>Registrate</h4>
          </div>

          <div className='card-body'>
            {registerErrors.map((error, i) => (
              <div className='text-alert-white mt-2' key={i}>
                {error}
              </div>
            ))}
            <form
              onSubmit={onSubmit}
            >
              <div className='mb-3 mt-3'>
                <input
                  type='text'
                  {...register('name', { required: true, minLength: 3 })}
                  className='form-control'
                  placeholder='Nombre'
                  autoFocus
                />
                {errors.name && (
                  <p className='text-alert'>
                    {' '}
                    El nombre de la cuenta es requerido{' '}
                  </p>
                )}
              </div>
              <div className='mb-3'>
                {}
                <input
                  type='email'
                  {...register('email', { required: true })}
                  className='form-control'
                  placeholder='Correo electrónico'
                />
                {errors.email && (
                  <p className='text-alert'> El email es requerido </p>
                )}
              </div>
              <div className='mb-3'>
                <input
                  type='password'
                  {...register('password', { required: true })}
                  className='form-control'
                  placeholder='Contraseña'
                />
                {errors.password && (
                  <p className='text-alert'> La contaseña es obligatoria </p>
                )}
              </div>
              <div className='mb-3'>
                <input
                  type='password'
                  {...register('rePassword', { required: true })}
                  className='form-control'
                  placeholder='Confirmación de contraseña'
                />
                {errors.rePassword && (
                  <p className='text-alert'> Es necesaria la confirmación </p>
                )}
              </div>
              <div className='d-flex gap-2'>
                <button type='submit' className='btn btn-primary w-100'>
                  {' '}
                  Guardar{' '}
                </button>
              </div>
            </form>
            <div className='p-4'>
              <p className='p-center'>
                Ya estas registrado?{' '}
                <Link to='/' className='p-center'>
                  Ingresa
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

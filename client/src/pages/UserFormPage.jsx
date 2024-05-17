import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {useAccounts} from '../context/accountContext';

function UserFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const {addUser, errors: registerErrors} = useAccounts();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    await addUser(values);
    navigate('/api/v1/home');
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <div className='container-p-2'>
      <form name='registerForm' onSubmit={onSubmit}>
        <h4>Información de la Cuenta</h4>
        <div className='row'>
          {registerErrors.map((error, i) => (
            <div className='text-alert-white mt-2' key={i}>
              {error}
            </div>
          ))}
          <div className='col md-6'>
            <div className='cell'>
              <input
                type='text'
                {...register('name', { required: true })}
                placeholder='Nombre'
                className='wide-square'
                autoFocus
              />
              {errors.name && <p className='text-alert'> Nombre requerido </p>}
            </div>
            <div className='cell'>
              <select name='IdType' className='wide-square'>
                <option value='CC'>Cédula de Ciudadania</option>
                <option value='CE'>Cédula de Extranjería</option>
                <option value='PE'>Permiso de Extranjería</option>
              </select>
            </div>
            <div className='cell'>
              <input
                {...register('address', { required: true })}
                type='text'
                placeholder='Dirección de domicilio'
                className='wide-square'
              />
              {errors.address && (
                <p className='text-alert'> La dirección es requerida </p>
              )}
            </div>
            <div className='cell'>
              <select
                {...register('city', { required: true })}
                className='wide-square'
              >
                <option value='Cali'>Cali</option>
                <option value='Medellín'>Medellín</option>
                <option value='Bogotá'>Bogotá</option>
                <option value='Buga'>Buga</option>
              </select>
            </div>
            <div className='cell'>
              <input
                {...register('email', { required: true })}
                type='email'
                placeholder='Correo de respaldo'
                className='wide-square'
              />
            </div>
          </div>

          <div className='col md-6'>
            <div className='cell'>
              <input
                {...register('surname', { required: true })}
                type='text'
                placeholder='Apellido'
                className='wide-square'
              />
              {errors.surname && (
                <p className='text-alert'> Apellido requerido </p>
              )}
            </div>
            <div className='cell'>
              <input
                {...register('userId', { required: true })}
                type='text'
                placeholder='Nº de Documento de Identidad'
                className='wide-square'
              />
            </div>
            <div className='cell'>
              <input
                {...register('neighboor', { required: true })}
                type='text'
                placeholder='Barrio'
                className='wide-square'
              />
            </div>
            <div className='cell'>
              <select
                {...register('department', { required: true })}
                className='wide-square'
              >
                <option value='Valle'>Valle del Cauca</option>
                <option value='Cundinamarca'>Cundinamarca</option>
                <option value='Cauca'>Cauca</option>
                <option value='Santander'>Santander</option>
              </select>
            </div>
            <div className='cell'>
              <input
                {...register('phone', { required: true })}
                type='text'
                placeholder='Número de Celular'
                className='wide-square'
              />
              {errors.phone && (
                <p className='text-alert'>
                  {' '}
                  El número de celular es requerido{' '}
                </p>
              )}
            </div>
          </div>
          <div className='w-10'>
            <button type='submit' name='btn' id='btnForm' >
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserFormPage;

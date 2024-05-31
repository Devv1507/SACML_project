import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAccounts } from '../context/accountContext';
import { useNavigate } from 'react-router-dom';

function CreditRequestForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
      } = useForm();
      const {addCredit, errors: creditErrors} = useAccounts();
      const navigate = useNavigate();

    const onSubmit = handleSubmit(async (values) => {
        await addCredit(values);
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
      <form name='creditRequest' onSubmit={onSubmit}>
        <h4>Solicitud de Crédito</h4>
        <div className='row'>
          {creditErrors.map((error, i) => (
            <div className='text-alert-white mt-2' key={i}>
              {error}
            </div>
          ))}
          <div className='col md-6'>
            <div className='cell'>
              <input
                type='number'
                {...register('job', { required: true })}
                placeholder='Cargo actual'
                className='wide-square'
                autoFocus
              />
              {errors.job && <p className='text-alert'> Campo requerido </p>}
            </div>

            <div className='cell'>
                <select
                {...register('savings_account', { required: true })}
                className='wide-square'
                >
                <option value='little'>Menos de 10 SMLV</option>
                <option value='moderate'>Entre 10 - 20 SMLV</option>
                <option value='high'>Más de 20 SMLV</option>
              </select>
            </div>
            <div className='cell'>
                <div className='text-start '>
                    <label  htmlFor="creditHistory">Adjuntar historial crediticio:</label>
                </div>
                <div className='col'>
                    <input
                    type='file'
                    {...register('creditHistory', { required: false })}
                    placeholder='Cargo actual'
                    accept="image/png, image/jpeg"
                    id="creditHistory"
                    className='wide-square'
                    />
                    {errors.creditHistory && <p className='text-alert'> Campo requerido </p>}
                </div>
            </div>
            <div className='cell'>
              <input
                {...register('duration', { required: true })}
                type='number'
                placeholder='Tiempo de Pago (meses)'
                className='wide-square'
              />
              {errors.duration && (
                <p className='text-alert'>
                  {' '}
                  El campo es requerido{' '}
                </p>
              )}
            </div>
          </div>

          <div className='col md-6'>
            <div className='cell'>
                <select
                {...register('housing', { required: true })}
                className='wide-square'
                >
                <option value='own'>Casa propia</option>
                <option value='rent'>Renta</option>
                <option value='free'>Subsidiado</option>
              </select>
            </div>
            <div className='cell'>
              <select
                {...register('checking_account', { required: true })}
                className='wide-square'
              >
                <option value='little'>Menos de 10 SMLV</option>
                <option value='moderate'>Entre 10 - 20 SMLV</option>
                <option value='high'>Más de 20 SMLV</option>
                <option value='rich'>Más de 100 SMLV</option>
              </select>
            </div>
            <div className='cell'>
            <select
                {...register('purpose', { required: true })}
                className='wide-square'
              >
                <option value='little'>Para electrodomésticos</option>
                <option value='moderate'>Entre 10 - 20 SMLV</option>
                <option value='high'>Más de 20 SMLV</option>
                <option value='rich'>Más de 100 SMLV</option>
              </select>
            </div>
            <div className='cell'>
              <input
                {...register('credit_amount', { required: true })}
                type='text'
                placeholder='Monto de Crédito Solicitado'
                className='wide-square'
              />
            </div>
           
          </div>
          <div className='w-10'>
            <button type='submit' name='btn' id='btnForm' >
              Radicar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreditRequestForm
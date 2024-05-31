import { useEffect, useState } from 'react';
import { getCreditAnalyticsRequest } from '../api/credit-request';
import { useParams } from 'react-router-dom';

function SpecificRequestAnalytics() {
  const [creditAnalytics, setCreditAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const getCreditAnalytics = async (id) => {
    try {
      const res = await getCreditAnalyticsRequest(id);
      setCreditAnalytics(res.data.message);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCreditAnalytics(id);
  }, [id]);

  if (loading) {
    return (
      <div className='container-fluid p-5 h-100 d-flex flex-column justify-content-center align-items-center'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container-fluid p-5 h-100 d-flex flex-column justify-content-center align-items-center'>
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='container-fluid p-5 h-100 d-flex flex-column justify-content-center align-items-center'>
      <div className='card h-50'>
        <div className='card-body text-start'>
          <h5 className='card-title text-center'>Analíticas del Crédito: </h5>
          <div className='row'>
            <div className='col'>
              {creditAnalytics.predictions &&
              creditAnalytics.predictions.length > 0 ? (
                <div className='p-1'>
                  {creditAnalytics.predictions.map((prediction, index) => (
                    <div key={index}>
                      <p> <b>Predicción del caso</b> : {prediction.predictions}</p>
                      <p>
                        Probabilidad asociada: {prediction.prediction_probs}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='p-1'>
                  <p>No hay predicciones disponibles</p>
                </div>
              )}
            </div>

            <div className='col'>
              {creditAnalytics.explanation_image ? (
                <div className='p-1'>
                  <img
                    src={`data:image/png;base64,${creditAnalytics.explanation_image}`}
                    alt='Analítica de Crédito'
                    className='img-fluid'
                  />
                </div>
              ) : (
                <div className='p-1'>
                  <p>No hay imagen disponible</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='position-absolute bottom-10 start-50 translate-middle-x'>
        <a
          href='/api/v1/home/credit-requests/all'
          className='btn btn-primary'
          role='button'
        >
          Regresar
        </a>
      </div>
    </div>
  );
}

export default SpecificRequestAnalytics;

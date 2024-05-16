import { useEffect } from 'react';
import { useAccounts } from '../context/accountContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AllAccountsPage() {
  const { allAccounts, getAllAccounts } = useAccounts();
  
  useEffect(() => {
    getAllAccounts();
  }, []);

  return (
    <section className='page-section'>
      <div className='row'>
        {allAccounts.length > 0 ? (
          allAccounts.map((account) => (
            <div key={account.id} className='col-md-3'>
              <div className='card mb-3'>
                <div className='card-body '>
                  <h4 className='card-title d-flex justify-content-between align-items-center'>
                    {account.name}
                    <a href={`/api/v1/home/update/${account.id}`}>
                      <FontAwesomeIcon icon='fa-pencil' aria-hidden='true'></FontAwesomeIcon>
                    </a>
                  </h4>
                  <p>{account.email}</p>
                  <form
                    action={`/api/v1/home/${account.id}?_method=DELETE`}
                    method='POST'
                  >
                    <input type='hidden' name='_method' value='DELETE' />
                    <button type='submit' className='btn btn-danger btn-sm'>
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-md-12'>
            <p>No hay cuentas disponibles.</p>
          </div>
        )}
      </div>
      <div className='button-container position-absolute bottom-10 start-50 translate-middle-x'>
        <Link to='/api/v1/home/' className='btn btn-primary' role='button'>
          Regresar
        </Link>
      </div>
    </section>
  );
}

export default AllAccountsPage;

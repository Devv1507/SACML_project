import { useEffect } from 'react';
import { useAccounts } from '../context/accountContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button  from 'react-bootstrap/Button';

function AllAccountsPage() {
  const { allAccounts, getAllAccounts, deleteAccount } = useAccounts();
  
  useEffect( () => {
    const fetchData = async () => {
      try {
        await getAllAccounts();
        console.log(allAccounts);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };
    fetchData();
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
                    <Link to={`/api/v1/home/update/${account.id}`}>
                      <FontAwesomeIcon icon='fa-pencil' aria-hidden='true'></FontAwesomeIcon>
                    </Link>
                  </h4>
                  <p>{account.email}</p>
                    <Button className='btn btn-danger btn-sm' onClick={() => deleteAccount(account.id)} >
                      Delete
                    </Button>
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

import {useEffect, useState} from 'react'
import { useAccounts } from '../context/accountContext'
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faHourglassStart, faPencilAlt, faFolder, faEye } from '@fortawesome/free-solid-svg-icons'
import ReactPaginate from 'react-paginate';

function AllCreditRequests() {
    const { allCreditPetitions, getAllCredit } = useAccounts();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5); // value to adjust the number of items displayed per page

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = allCreditPetitions.slice(offset, offset + itemsPerPage);

    useEffect( () => {
        const fetchData = async () => {
          try {
            await getAllCredit();
          } catch (error) {
            console.error('Error fetching petitions data:', error);
          }
        };
        fetchData();
      }, []);

      return (
        <div className="container-fluid p-5 h-100 d-flex flex-column justify-content-center align-items-center">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Usuario</th>
                        <th scope="col">Ocupación</th>
                        <th scope="col">Vivienda</th>
                        <th scope="col">Historial Crediticio</th>
                        <th scope="col">Ahorros</th>
                        <th scope="col">Cheques</th>
                        <th scope="col">Propósito</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Duración</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Decisión</th>
                        <th scope="col">Estadísticas</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((request) => (
                            <tr key={request.id}>
                                <td className="align-middle">
                                    <a href={`/api/v1/home/credit-requests/${request.userId}`} className="disabled-link">
                                        <FontAwesomeIcon icon={faEye} aria-hidden="true" />
                                    </a>
                                </td>
                                <td className="align-middle"> Administración </td>
                                <td className="align-middle">{request.housing}</td>
                                <td className="align-middle">{request.creditHistory}</td>
                                <td className="align-middle">{request.savings_account}</td>
                                <td className="align-middle">{request.checking_account}</td>
                                <td className="align-middle">{request.purpose}</td>
                                <td className="align-middle">{request.credit_amount}</td>
                                <td className="align-middle">{request.duration}</td>
                                <td className="align-middle">
                                    {request.completed ? (
                                        <FontAwesomeIcon icon={faCheckSquare} aria-hidden="true" />
                                    ) : (
                                        <FontAwesomeIcon icon={faHourglassStart} aria-hidden="true" />
                                    )}
                                </td>
                                <td className="align-middle">
                                    {request.completed ? (
                                        <a href={`/api/v1/home/credit-requests/decision/${request.userId}`} className="disabled-link">
                                            <FontAwesomeIcon icon={faFolder} aria-hidden="true" />
                                        </a>
                                    ) : (
                                        <a href={`/api/v1/home/credit-requests/decision/${request.userId}`}>
                                            <FontAwesomeIcon icon={faFolder} aria-hidden="true" />
                                        </a>
                                    )}
                                </td>
                                <td className="align-middle">
                                    <a href={`/api/v1/home/credit-requests/analytics/${request.userId}`}>
                                        <FontAwesomeIcon icon="fa-solid fa-chart-pie" aria-hidden="true" />
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center">No hay solicitudes de crédito</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'← Previous'}
                nextLabel={'Next →'}
                breakLabel={'...'}
                pageCount={Math.ceil(allCreditPetitions.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
            <div className="position-absolute bottom-10 start-50 translate-middle-x">
                <a href="/api/v1/home/" className="btn btn-primary" role="button">Regresar</a>
            </div>
        </div>
    );
}

export default AllCreditRequests;
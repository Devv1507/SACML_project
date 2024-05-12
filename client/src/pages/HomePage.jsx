


function HomePage() {
  return (
    <div>
      <h1 class='h1-body'>Home: Administrador</h1>
      <h1 class='h1-body'>Home: Invitado</h1>
      <h1 class='h1-body'>Home: Usuario</h1>
      <div class='row justify-content-center align-items-center w-100 h-auto'>
        <div class='col-md-4 justify-content-center'>
          <div class='card'>
            <div class='card-body'>
              {/* {{#if boolStatus}} */}
              {/* {{#if haveRequest.completed}} */}
              <div class='mb-3'>
                <p class='p-center'>Estado de la Solicitud: Rechazado</p>
              </div>
              {/* {{else}} */}
              <div class='mb-3'>
                <p class='p-center'>Estado de la Solicitud: Pendiente</p>
              </div>
              {/* {{/if}}
                {{/if}}
                {{#if adminRole}} */}
              <div class='mb-3 text-center'>
                <a
                  class='btn btn-primary'
                  href='/api/v1/home/credit-requests/all'
                  role='button'
                >
                  <p>Gestionar Peticiones</p>
                </a>
              </div>
              <div class='mb-3 text-center'>
                <a
                  class='btn btn-primary'
                  href='/api/v1/home/all'
                  role='button'
                >
                  <p>Gestionar Cuentas</p>
                </a>
              </div>
              <div class='mb-3 text-center'>
                <a
                  class='btn btn-primary'
                  href='/api/v1/home/users/all'
                  role='button'
                >
                  <p>Gestionar Usuarios</p>
                </a>
              </div>
              {/* {{else}}
                {{#if account.disabled}} */}
              <div class='mb-3 text-center'>
                <button
                  type='button'
                  class='btn btn-primary btn-block'
                  disabled
                >
                  <p>Realizar Petición de Crédito</p>
                </button>
              </div>
              <div class='mb-3'>
                <p class='p-center'>
                  La opción de arriba aparece deshabilitada?
                </p>
                <a href='/api/v1/home/users/add' class='p-center'>
                  Completar registro de usuario
                </a>
              </div>
              {/* {{else}} */}
              <div class='mb-3 text-center'>
                <a
                  class='btn btn-primary'
                  href='/api/v1/home/credit-requests/add'
                  role='button'
                >
                  <p>Realizar Petición de Crédito</p>
                </a>
              </div>
              <div class='mb-3 text-center'>
                <a
                  class='btn btn-primary'
                  href='/api/v1/home/credit-requests/{{account.id}}'
                  role='button'
                >
                  <p>Revisar petición radicada</p>
                </a>
              </div>
              {/* {{/if}}
                {{/if}} */}
            </div>
          </div>
        </div>

        <div class='col-md-4 justify-content-center'>
          <div class='card'>
            <div class='card-body'>
              <h5 class='card-title'>Información de la Cuenta</h5>
              <button
                class='btn btn-secondary btn-block w-100'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#accountDetails'
                aria-expanded='false'
                aria-controls='accountDetails'
              >
                Mostar
              </button>
              <div class='collapse' id='accountDetails'>
                <div class='card card-body'>
                  <h5>Detalles de la Cuenta</h5>
                  <p>Nombre: {/* {{account.name}} */}</p>
                  <p>Email: {/* {{account.email}} */}</p>
                  {/* {{#if adminRole}} */}
                  <p>Tipo de Cuenta: Administrador </p>
                  {/* {{else}} */}
                  {/* {{#if account.disabled}} */}
                  <p>Tipo de Cuenta: Invitado </p>
                  {/* {{else}} */}
                  <p>Tipo de Cuenta: Usuario </p>
                  {/* {{/if}} */}
                  {/* {{/if}} */}
                </div>
              </div>
            </div>
            {/* {{#unless account.disabled}} */}
            <div class='card-body'>
              <h5 class='card-title'>Información Personal</h5>
              <div class='d-flex gap-2'>
                <a
                  class='btn btn-primary w-100'
                  href='/api/v1/home/users/{{account.id}}'
                  role='button'
                >
                  <p>Ver</p>
                </a>
              </div>
            </div>
            {/* {{/unless }} */}
          </div>
          <div class='card mt-3'>
            <div class='card-body'>
              <h5 class='card-title'>Schedule</h5>
              <div id='calendar'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

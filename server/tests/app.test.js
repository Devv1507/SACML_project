const app = require('../app.js');
const request = require('supertest');

describe('Describe the POST requests of register end-point /api/v1/sign-up', () => {

  test('Should respond with a 409 status to warn internal conflict, \
   have an object with a message key and the message is the expected', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(
      {name: 'Roberto', email: 'test@test.com', password: 'abc123', rePassword: 'abc123'});
    const parsedResponse = JSON.parse(response.text);
    expect(response.statusCode).toBe(409);
    expect(parsedResponse).toHaveProperty('message');
    expect(parsedResponse.message).toBe('El correo ingresado ya se encuentra registrado');
  });

  test('Should respond with a 400 status to warn incorrect request, a message of type array and the array must be length > 0', async () => {
    const response = await request(app).post('/api/v1/sign-up').send({name: '', email: '12131231'});
    expect(response.statusCode).toBe(400);
    expect(response.text.split('')).toBeInstanceOf(Array);
    expect(response.text.length).toBeGreaterThan(0);
  });

  test('Should respond with a 400 status to warn incorrect request, a message of type array with password confirmation error', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(
      {name: 'Roberto', email: 'test8@test.com', password: 'cba123', rePassword: 'abc123'});
    expect(response.statusCode).toBe(400);
    const errorMessageArray = JSON.parse(response.text);
    expect(errorMessageArray).toBeInstanceOf(Array);
    expect(errorMessageArray).toContain('Las contraseñas no coinciden, intente de nuevo');
  });

  test('Should respond with a 201 status to sign an account was created with a JSON message ', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(
      {name: 'Orco', email: 'test15@test.com', password: 'abc123', rePassword: 'abc123'}
    );
    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
  });
});

describe('Describe the POST requests of authentication end-point /api/v1/login', () => {

  test('Should respond with a 400 status to warn incorrect request and should have a message of type array', async () => {
    const response = await request(app).post('/api/v1/login').send('');
    expect(response.statusCode).toBe(400);
    expect(response.text.split('')).toBeInstanceOf(Array);
  });
});

describe('Describe the GET requests of authorization and private end-point /api/v1/home', () => {
  
  test('Should respond with a 401 status to warn unauthenticated', async () => {
    const response = await request(app).get('/api/v1/home').send('');
    expect(response.statusCode).toBe(401);
  });
});
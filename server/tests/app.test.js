const app = require('../app.js');
const request = require('supertest');

describe('Describe the route of the request GET to end-point /api/v1/', () => {

  test('Should respond with a 400 status', async () => { 
    response = await request(app).get('/api/v1').send('email=Jose');
    expect(response.statusCode).toBe(400);
   })
});
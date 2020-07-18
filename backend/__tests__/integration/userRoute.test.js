import 'regenerator-runtime/runtime';

import request from 'supertest';
import app from '../../src/app';

describe('User Controller', () => {
  it('should create an user', async () => {
    const user = {
      name: 'Maycon',
      email: 'm@m',
      password: '123456',
    };

    const response = await request(app).post('/user').send(user);

    expect(response.status).toBe(200);
  });

  it('should list users', async () => {
    const response = await (await request(app).get('/user')).body;
    expect(typeof response).toBe('object');
  });
});

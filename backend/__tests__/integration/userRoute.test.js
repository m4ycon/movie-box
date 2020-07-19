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
    const response = await request(app)
      .get('/user')
      .then(res => res.body);
    expect(typeof response).toBe(typeof Object.prototype);
  });

  it('should create and find this user', async () => {
    const user = {
      name: 'Maycon',
      email: 'new@email',
      password: '123456',
    };

    await request(app).post('/user').send(user);

    const response = await request(app)
      .get('/user/find')
      .query(user)
      .then(res => res.body);

    expect(response.name).toBe(user.name);
  });
});

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

    const { message } = await request(app)
      .post('/user')
      .send(user)
      .then(res => res.body);

    expect(message.length > 0).toBe(true);
  });

  it('should not create an user, email exists', async () => {
    const user1 = {
      name: 'Maria',
      email: 'unique@email',
      password: '123456',
    };

    const user2 = {
      name: 'John',
      email: 'unique@email',
      password: '654321',
    };

    await request(app).post('/user').send(user1);
    const { status } = await request(app).post('/user').send(user2);

    expect(status).toBe(400);
  });

  it('should list users', async () => {
    const usersList = await request(app)
      .get('/user')
      .then(res => res.body);

    expect(usersList.length).toBe(2);
  });

  it('should create and find this user', async () => {
    const user = {
      name: 'Maycon',
      email: 'other@email',
      password: '123456',
    };

    await request(app).post('/user').send(user);

    const response = await request(app)
      .get('/user/find')
      .query(user)
      .then(res => res.body);

    expect(response[0].name).toBe(user.name);
  });

  it('should get watched list', async () => {
    const { watched } = await request(app)
      .get('/user/1/watched')
      .then(res => res.body);

    expect(watched).toBe(null);
  });

  it('should not get watched list, invalid id', async () => {
    const { error } = await request(app)
      .get('/user/9999/watched')
      .then(res => res.body);

    expect(error.length > 0).toBe(!null);
  });

  it('should add an item to watched list', async () => {
    await request(app)
      .put('/user/1/watched?movie=123')
      .then(res => res.body);

    await request(app)
      .put('/user/1/watched?movie=456')
      .then(res => res.body);

    const { watched } = await request(app)
      .get('/user/1/watched')
      .then(res => res.body);

    expect(watched.includes(123 && 456)).toBe(true);
  });

  it('should not add an item to an invalid id', async () => {
    const { error } = await request(app)
      .put('/user/9999/watched?movie=123')
      .then(res => res.body);

    expect(error.length > 0).toBe(!null);
  });
});

import 'regenerator-runtime/runtime';

import request from 'supertest';
import app from '../../src/app';

const userModel = {
  name: 'Maycon',
  email: '1@email.com',
  password: '123456',
};

describe('User Controller', () => {
  it('should create an user', async () => {
    const { user } = await request(app)
      .post('/user')
      .send(userModel)
      .then(res => res.body);

    expect(user).toBe(1);
  });

  it('should login a user', async () => {
    const res = await request(app)
      .get('/user/login')
      .auth(userModel.email, userModel.password)
      .then(res => res.body);

    userModel.id = res.user;
    userModel.token = res.token;

    expect(res.user).toBe(1);
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

    const res1 = await request(app).post('/user').send(user1);
    const res2 = await request(app).post('/user').send(user2);

    expect(res1.status === 200 && res2.status === 400).toBe(true);
  });

  it('should list users', async () => {
    const usersList = await request(app)
      .get('/user')
      .then(res => res.body);

    expect(usersList.length).toBe(2);
  });

  it('should find this user', async () => {
    const { users } = await request(app)
      .get('/user/find')
      .query({ email: userModel.email })
      .then(res => res.body);

    expect(users[0].id).toBe(userModel.id);
  });

  it('should get watched list', async () => {
    const { moviesWatched } = await request(app)
      .get('/user/1/watched')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    expect(typeof moviesWatched).toBe(typeof Array.prototype);
  });

  it('should not get watched list, invalid id', async () => {
    const { error } = await request(app)
      .get('/user/9999/watched')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    expect(error.length > 0).toBe(!null);
  });

  it('should add an item to watched list', async () => {
    await request(app)
      .put('/user/1/watched?movie=123')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    await request(app)
      .put('/user/1/watched?movie=456')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    const { moviesWatched } = await request(app)
      .get('/user/1/watched')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    expect(moviesWatched.includes(123 && 456)).toBe(true);
  });

  it('should not add an item to watched with an invalid id', async () => {
    const { error } = await request(app)
      .put('/user/9999/watched?movie=123')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    expect(error.length > 0).toBe(!null);
  });

  it('should add an item to watch later list', async () => {
    await request(app)
      .put('/user/1/watch-later?movie=123')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    await request(app)
      .put('/user/1/watch-later?movie=456')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    const { watchLater } = await request(app)
      .get('/user/1/watch-later')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    expect(watchLater.includes(123 && 456)).toBe(true);
  });

  it('should not add an item to watch later with an invalid id', async () => {
    const { error } = await request(app)
      .put('/user/9999/watch-later?movie=123')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    expect(error.length > 0).toBe(!null);
  });

  it('should delete an item from watch later', async () => {
    await request(app)
      .delete('/user/1/watch-later?movie=123')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    const { watchLater } = await request(app)
      .get('/user/1/watch-later')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    expect(watchLater.includes(123)).toBe(false);
  });

  it('should not delete an item from watch later, invalid id', async () => {
    const { error } = await request(app)
      .delete('/user/9999/watch-later?movie=123')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    expect(error.length > 0).toBe(!null);
  });

  it('should delete an item from watched', async () => {
    await request(app)
      .delete('/user/1/watched?movie=123')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    const { moviesWatched } = await request(app)
      .get('/user/1/watched')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    expect(moviesWatched.includes(123)).toBe(false);
  });

  it('should not delete an item from watched, invalid id', async () => {
    const { error } = await request(app)
      .delete('/user/9999/watched?movie=123')
      .set('Authorization', `bearer ${userModel.token}`)
      .then(res => res.body);

    expect(error.length > 0).toBe(!null);
  });
});

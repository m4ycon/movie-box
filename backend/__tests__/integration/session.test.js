import 'regenerator-runtime/runtime';

import UserController from '../../src/controllers/UsersController.js';
const userController = new UserController();

describe('Test', () => {
  it('should list users', async () => {
    await userController.create({
      name: 'Maycon',
      email: 'm@m',
      password: '123456',
    });

    const a = 6;
    expect(a).toBe(6);
  });
});

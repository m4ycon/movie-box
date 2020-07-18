import connection from '../database/connection';

class UsersController {
  constructor() {
    this._table = 'users';
  }

  async index() {
    try {
      return await connection(this._table).select('*');
    } catch (err) {
      throw new Error(err);
    }
  }

  async create(user) {
    try {
      await connection(this._table).insert(user);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default UsersController;

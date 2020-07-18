import connection from '../database/connection';

class UserController {
  constructor() {
    this._table = 'users';
  }

  async index() {
    try {
      return await connection(this._table).select('*');
    } catch (err) {
      throw err;
    }
  }

  async create(user) {
    try {
      await connection(this._table).insert(user);
    } catch (err) {
      throw err;
    }
  }

  async findOne(where) {
    try {
      const result = await connection(this._table).where(where);

      if (!result) return { message: 'User not found.' };
      return result[0];
    } catch (err) {
      throw err;
    }
  }
}

export default UserController;

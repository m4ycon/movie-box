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
      const { email } = user;

      const emailExists = await this.find({ email });
      if (emailExists.length) return { error: 'Email already registered' };

      await connection(this._table).insert(user);
      return { message: 'User created successfully.' };
    } catch (err) {
      throw err;
    }
  }

  async find(where) {
    try {
      const result = await connection(this._table).where(where);
      if (!result.length) return { message: 'User not found.' };

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getWatched(userID) {
    try {
      const result = await connection(this._table)
        .select('movies_watched')
        .where({ id: userID });
      if (!result.length) return { error: 'User not found.' };

      return { watched: result[0].movies_watched };
    } catch (err) {
      throw err;
    }
  }
}

export default UserController;

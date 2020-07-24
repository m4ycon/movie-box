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

  async getWatchLater(userID) {
    try {
      const result = await connection(this._table)
        .select('watch_later')
        .where({ id: userID });
      if (!result.length) return { error: 'User not found.' };

      return { watchLater: result[0].watch_later };
    } catch (err) {
      throw err;
    }
  }

  async setWatched(userID, movieID) {
    try {
      if (!(await this._userExists(userID)))
        return { error: 'User not found.' };

      let { movies_watched } = await connection(this._table)
        .select('movies_watched')
        .where({ id: userID })
        .then(res => res[0]);

      if (movies_watched === null) movies_watched = [];
      // This next "if" is for __tests__, because of how sqlite works
      if (
        typeof movies_watched === 'number' ||
        typeof movies_watched === 'string'
      )
        movies_watched = [movies_watched];

      await connection(this._table)
        .update({
          movies_watched: [...movies_watched, movieID],
        })
        .where({ id: userID });
      return {};
    } catch (err) {
      throw err;
    }
  }

  async setWatchLater(userID, movieID) {
    try {
      if (!(await this._userExists(userID)))
        return { error: 'User not found.' };

      let { watch_later } = await connection(this._table)
        .select('watch_later')
        .where({ id: userID })
        .then(res => res[0]);

      if (watch_later === null) watch_later = [];
      // This next "if" is for __tests__, because of how sqlite works
      if (typeof watch_later === 'number' || typeof watch_later === 'string')
        watch_later = [watch_later];

      await connection(this._table)
        .update({
          watch_later: [...watch_later, movieID],
        })
        .where({ id: userID });
      return {};
    } catch (err) {
      throw err;
    }
  }

  async _userExists(userID) {
    const idExists = await connection(this._table)
      .select('id')
      .where({ id: userID })
      .then(res => res[0]);
    return idExists ? true : false;
  }
}

export default UserController;

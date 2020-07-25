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
    return this._getList(userID, 'movies_watched');
  }

  async getWatchLater(userID) {
    return this._getList(userID, 'watch_later');
  }

  async setWatched(userID, movieID) {
    return this._setList(userID, movieID, 'movies_watched');
  }

  async setWatchLater(userID, movieID) {
    return this._setList(userID, movieID, 'watch_later');
  }

  async _getList(userID, listName) {
    try {
      const userExists = await this._userExists(userID);
      if (!userExists) return { error: 'User not found.' };

      let { [listName]: list } = await connection(this._table)
        .select(listName)
        .where({ id: userID })
        .then(res => res[0]);

      list = this._formatList(list);

      listName = this._snakeToCamelCase(listName);
      return { [listName]: list };
    } catch (err) {
      throw err;
    }
  }

  async _setList(userID, movieID, listName) {
    try {
      const userExists = await this._userExists(userID);
      if (!userExists) return { error: 'User not found.' };

      let { [listName]: list } = await connection(this._table)
        .select(listName)
        .where({ id: userID })
        .then(res => res[0]);

      list = this._formatList(list);

      await connection(this._table)
        .update({
          [listName]: [...list, movieID],
        })
        .where({ id: userID });
      return {};
    } catch (err) {
      throw err;
    }
  }

  async _userExists(userID) {
    const user = await connection(this._table)
      .select('id')
      .where({ id: userID })
      .then(res => res[0]);
    return user ? true : false;
  }

  _snakeToCamelCase(str) {
    return str.replace(
      /([A-Za-z]+)_([A-Za-z]{1})([A-Za-z]+)/,
      (str, $1, $2, $3) => $1 + $2.toUpperCase() + $3
    );
  }

  _formatList(list) {
    // function used to treat list returned by db, standardizing
    if (list === null) list = [];
    if (typeof list === 'string') list = list.split(',');
    if (typeof list === 'number') list = [list];
    return list.map(e => parseInt(e));
  }
}

export default UserController;

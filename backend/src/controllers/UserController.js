import connection from '../database/connection';
import snakeToCamelCase from '../helpers/snakeToCamelCase';
import bcrypt from 'bcrypt';

class UserController {
  constructor() {
    this._table = 'users';
  }

  async index() {
    try {
      return await connection(this._table).select('*');
    } catch (error) {
      throw error;
    }
  }

  async create(user) {
    try {
      const { name, email, password } = user;

      const emailExists = await this.find({ email });
      if (emailExists.length)
        return { status: 400, error: 'Email already registered' };

      const hashPassword = await this._hashPassword(password);

      const id = await connection(this._table)
        .insert(
          {
            name,
            email,
            password: hashPassword,
          },
          ['id']
        )
        .then(res => res[0]);

      if (typeof id === 'object') return id;
      return { id };
    } catch (error) {
      throw error;
    }
  }

  async find(where) {
    try {
      const result = await connection(this._table).where(where);
      if (!result.length) return { status: 404, error: 'User not found.' };

      return { users: result };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    const user = await this.find({ email }).then(res => res.users[0]);
    if (!user) return { status: 400, error: 'Unregistered email' };

    const isMatch = await this._comparePasswords(password, user.password);
    if (!isMatch) return { status: 401, error: 'Invalid password' };

    return { user: user.id };
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

  async delWatched(userID, movieID) {
    return this._delList(userID, movieID, 'movies_watched');
  }

  async delWatchLater(userID, movieID) {
    return this._delList(userID, movieID, 'watch_later');
  }

  async _getList(userID, listName) {
    try {
      const userExists = await this._userExists(userID);
      if (!userExists) return { status: 404, error: 'User not found.' };

      let { [listName]: list } = await connection(this._table)
        .select(listName)
        .where({ id: userID })
        .then(res => res[0]);

      list = this._formatList(list);

      listName = snakeToCamelCase(listName);
      return { [listName]: list };
    } catch (error) {
      throw error;
    }
  }

  async _setList(userID, movieID, listName) {
    if (!movieID) return { status: 400, error: 'Movie ID must be provided' };

    try {
      const userExists = await this._userExists(userID);
      if (!userExists) return { status: 404, error: 'User not found.' };

      let { [listName]: list } = await connection(this._table)
        .select(listName)
        .where({ id: userID })
        .then(res => res[0]);

      list = this._formatList(list);

      if (list.includes(Number(movieID)))
        return { status: 400, error: 'Movie ID already in the list' };

      await connection(this._table)
        .update({
          [listName]: [...list, movieID],
        })
        .where({ id: userID });
      return {};
    } catch (error) {
      throw error;
    }
  }

  async _delList(userID, movieID, listName) {
    try {
      const userExists = await this._userExists(userID);
      if (!userExists) return { status: 404, error: 'User not found.' };

      let { [listName]: list } = await connection(this._table)
        .select(listName)
        .where({ id: userID })
        .then(res => res[0]);

      list = this._formatList(list);
      const filteredMovies = list.filter(id => id !== Number(movieID));

      await connection(this._table)
        .update({
          [listName]: filteredMovies,
        })
        .where({ id: userID });

      return {};
    } catch (error) {
      throw error;
    }
  }

  async _userExists(userID) {
    const user = await connection(this._table)
      .select('id')
      .where({ id: userID })
      .then(res => res[0]);
    return user ? true : false;
  }

  _formatList(list) {
    // function used to treat list returned by db, standardizing
    if (list === null) list = [];
    if (typeof list === 'string') list = list.split(',');
    if (typeof list === 'number') list = [list];
    return list.map(e => parseInt(e));
  }

  async _hashPassword(password) {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);

      return hashPassword;
    } catch (error) {
      throw error;
    }
  }

  async _comparePasswords(password, hashPassword) {
    try {
      const isMatch = await bcrypt.compare(password, hashPassword);
      return isMatch;
    } catch (error) {
      throw error;
    }
  }
}

export default UserController;

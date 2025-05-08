// models/User.js
const mysql = require('mysql');
const bcrypt = require('bcrypt');

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async register(user) {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)`;
    const values = [user.username, user.email, user.password];
    try {
      await connection.query(query, values);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      connection.end();
    }
  }

  static async login(email, password) {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `SELECT * FROM Users WHERE Email = ?`;
    const values = [email];
    try {
      const result = await connection.query(query, values);
      if (result.length > 0) {
        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (isPasswordValid) {
          return user;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      connection.end();
    }
  }
  async getUser() {
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [this.usernameToFind, this.emailToFind]
    );
    return result.rows[0];
  }

  async updateUser() {
    const result = await db.query(
      'UPDATE users SET password = $1 WHERE username = $2 OR email = $3 RETURNING *',
      [this.password, this.usernameToFind, this.emailToFind]
    );
    return result.rows[0];
  }

  async deleteUser() {
    const result = await db.query(
      'DELETE FROM users WHERE username = $1 OR email = $2 RETURNING *',
      [this.usernameToFind, this.emailToFind]
    );
    return result.rows[0];
  }
}

module.exports = User;
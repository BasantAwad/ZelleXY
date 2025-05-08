// models/orders.js
const mysql = require('mysql');

class Order {
  constructor(userID, productID, quantity, orderDate) {
    this.userID = userID;
    this.productID = productID;
    this.quantity = quantity;
    this.orderDate = orderDate;
  }

  static async getOrders(userID) {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `SELECT * FROM Orders WHERE UserID = ?`;
    const values = [userID];
    try {
      const result = await connection.query(query, values);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      connection.end();
    }
  }

  static async createOrder(order) {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `INSERT INTO Orders (UserID, ProductID, Quantity, OrderDate) VALUES (?, ?, ?, ?)`;
    const values = [order.userID, order.productID, order.quantity, order.orderDate];
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
  
  async updateOrder() {
    const result = await db.query(
      'UPDATE orders SET product_id = $1, quantity = $2 WHERE id = $3 RETURNING *',
      [this.productId, this.quantity, this.idToFind]
    );
    return result.rows[0];
  }

  async deleteOrder() {
    const result = await db.query(
      'DELETE FROM orders WHERE id = $1 RETURNING *',
      [this.idToFind]
    );
    return result.rows[0];
  }
}

module.exports = Order;
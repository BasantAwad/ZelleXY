// models/Product.js
const mysql = require('mysql');

class Product {
  constructor(productName, picture, price, description, category, quantity) {
    this.productName = productName;
    this.price = price;
    this.description = description;
    this.category = category;
    this.quantity = quantity;
    this.picture = picture;
  }

  static async createProduct() {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `INSERT INTO Products (ProductName, Price, Description, Category, Quantity, picture) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [Product.ProductName, Product.price, Product.description, Product.category, Product.quantity, Product.picture];
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

  static async getProducts() {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `SELECT * FROM Products`;
    try {
      const result = await connection.query(query);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      connection.end();
    }
  }
  async updateProduct() {
    const result = await db.query(
      'UPDATE products SET name = $1, description = $2, price = $3, , categroy = $4 ,quantity = $5, image =$6 WHERE id = $7 RETURNING *',
      [this.name, this.description, this.price, this.category, this.quantity, this.image, this.idToFind]
    );
    return result.rows[0];
  }

  async deleteProduct() {
    const result = await db.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [this.idToFind]
    );
    return result.rows[0];
  }
}

module.exports = Product;
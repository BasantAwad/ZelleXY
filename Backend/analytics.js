// models/analytics.js
const mysql = require('mysql');

class Analytics {
  constructor(pageViews, sales, avgOrderValue, mostOrderedProductID, businessID) {
    this.pageViews = pageViews;
    this.sales = sales;
    this.avgOrderValue = avgOrderValue;
    this.mostOrderedProductID = mostOrderedProductID;
    this.businessID = businessID;
  }

  static async getAnalytics(businessID) {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `SELECT * FROM Analytics WHERE BusinessID = ?`;
    const values = [businessID];
    try {
      const result = await connection.query(query, values);
      if (result.length > 0) {
        return result[0];
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

  static async createAnalytics(analytics) {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `INSERT INTO Analytics (PageViews, Sales, AvgOrderValue, MostOrderedProductID, BusinessID) VALUES (?, ?, ?, ?, ?)`;
    const values = [analytics.pageViews, analytics.sales, analytics.avgOrderValue, analytics.mostOrderedProductID, analytics.businessID];
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
  
  async updateAnalytic() {
    const result = await db.query(
      'UPDATE analytics SET product_id = $1, metric = $2, value = $3 WHERE id = $4 RETURNING *',
      [this.productId, this.metric, this.value, this.idToFind]
    );
    return result.rows[0];
  }

  async deleteAnalytic() {
    const result = await db.query(
      'DELETE FROM analytics WHERE id = $1 RETURNING *',
      [this.idToFind]
    );
    return result.rows[0];
  }
}

module.exports = Analytics;
// models/Business.js
const mysql = require('mysql');

class Business {
  constructor(businessName, ownerID, description, contactInfo) {
    this.businessName = businessName;
    this.ownerID = ownerID;
    this.description = description;
    this.contactInfo = contactInfo;
  }

  static async createBusiness(business) {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `INSERT INTO Businesses (BusinessName, OwnerID, Description, ContactInfo) VALUES (?, ?, ?, ?)`;
    const values = [business.businessName, business.ownerID, business.description, business.contactInfo];
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

  static async getBusinesses() {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `SELECT * FROM Businesses`;
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
  async updateBusiness() {
    const result = await db.query(
      'UPDATE business SET product_id = $1, field = $2, value = $3 WHERE id = $4 RETURNING *',
      [this.productId, this.field, this.value, this.idToFind]
    );
    return result.rows[0];
  }

  async deleteBusiness() {
    const result = await db.query(
      'DELETE FROM business WHERE id = $1 RETURNING *',
      [this.idToFind]
    );
    return result.rows[0];
  }
}

module.exports = Business;
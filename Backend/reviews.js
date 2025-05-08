// models/reviews.js
const mysql = require('mysql');


class Review {
  constructor(userID, productID, rating, reviewText, reviewDate) {
    this.userID = userID;
    this.productID = productID;
    this.rating = rating;
    this.reviewText = reviewText;
    this.reviewDate = reviewDate;
  }

  static async getReviews(productID) {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `SELECT * FROM Reviews WHERE ProductID = ?`;
    const values = [productID];
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

  static async createReview(review) {
    const connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'zellexy',
    });
    const query = `INSERT INTO Reviews (UserID, ProductID, Rating, ReviewText, ReviewDate) VALUES (?, ?, ?, ?, ?)`;
    const values = [review.userID, review.productID, review.rating, review.reviewText, review.reviewDate];
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
  async updateReview() {
    const result = await db.query(
      'UPDATE reviews SET product_id = $1, user_id = $2, rating = $3, comment = $4 WHERE id = $5 RETURNING *',
      [this.productId, this.userId, this.rating, this.comment, this.idToFind]
    );
    return result.rows[0];
  }

  async deleteReview() {
    const result = await db.query(
      'DELETE FROM reviews WHERE id = $1 RETURNING *',
      [this.idToFind]
    );
    return result.rows[0];
  }
}

module.exports = Review;
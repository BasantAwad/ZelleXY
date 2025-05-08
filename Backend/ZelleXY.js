//  ZelleXY.js
const express = require('express');
const Product = require('./Product');
const Review = require('./reviews');
const Analytic = require('./analytics');
const Business = require('./Business');
const User = require('./User');
const Orders = require('./orders');
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');
const cors = require('cors');


const ZelleXY = express();
ZelleXY.use(express.json());
ZelleXY.use(express.urlencoded({ extended : false }));
ZelleXY.use(cors());

ZelleXY.use(cors({
  origin: 'http://127.0.0.1:5501',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zellexy'
};
const pool = mysql.createPool(dbConfig);
pool.on('error', (err) => {
  console.error('MySQL pool error: ', err);
});

//validation for product 
const productValidationRules = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  body('category').notEmpty(),
  body('quantity').notEmpty(),

];

// validation for review creation
const reviewValidationRules = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional(),
];

// validation for analytic creation
const analyticValidationRules = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('metric').notEmpty().withMessage('Metric is required'),
  body('value').notEmpty().withMessage('Value is required'),
];

// validation for business creation
const businessValidationRules = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('field').notEmpty().withMessage('Field is required'),
  body('value').notEmpty().withMessage('Value is required'),
];
// validation for user registration
const userRegistrationValidationRules = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// validation for order creation
const orderCreationValidationRules = [
  body('userID').notEmpty().withMessage('User ID is required'),
  body('productID').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('orderDate').isISO8601().toDate().withMessage('Invalid order date format'),
];



//Users endpoints
ZelleXY.post('/users/register',userRegistrationValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;
  const user = new User(username, email, password);
  const result = await User.register(user);
  if (result) {
    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(500).json({ message: 'Error registering user' });
  }
});
ZelleXY.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.getUserById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

ZelleXY.get('/users/login', async (req, res) => {
  const { email, password } = req.query;
  const user = await User.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const isPasswordValid = await User.verifyPassword(password, user.password);
  if (isPasswordValid) {
    res.status(200).json({ message: 'User logged in successfully', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

ZelleXY.put('/users/update', async (req, res) => {
  const { id, username, email } = req.body;
  const updatedUser = new User(username, email, '');
  updatedUser.id = id;
  const result = await updatedUser.updateUser();
  if (result) {
    res.status(200).json({ message: 'User updated successfully' });
  } else {
    res.status(500).json({ message: 'Error updating user' });
  }
});

ZelleXY.delete('/users/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const deletedUser = new User('', '', '');
  deletedUser.id = id;
  const result = await deletedUser.deleteUser();
  if (result) {
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

ZelleXY.get('/getAll', (request, response) => {
  console.log('test');
})

//Orders endpoints
ZelleXY.post('/orders/create',orderCreationValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userID, productID, quantity, orderDate } = req.body;
  const order = new Order(userID, productID, category, quantity, orderDate);
  const result = await Order.createOrder(order);
  if (result) {
    res.status(201).json({ message: 'Order created successfully' });
  } else {
    res.status(500).json({ message: 'Error creating order' });
  }
});

ZelleXY.get('/orders', async (req, res) => {
  const { userID } = req.query;
  if (!userID) {
    return res.status(400).json({ message: 'Missing userID parameter' });
  }
  const orders = await Order.getOrders(userID);
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: 'Orders not found' });
  }
});
ZelleXY.put('/orders/update', async (req, res) => {
  const { id, userID, productID, quantity, orderDate } = req.body;
  const updatedOrder = new Order(userID, productID, quantity, orderDate);
  updatedOrder.id = id;
  const result = await updatedOrder.updateOrder();
  if (result) {
    res.status(200).json({ message: 'Order updated successfully' });
  } else {
    res.status(500).json({ message: 'Error updating order' });
  }
});

ZelleXY.delete('/orders/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const deletedOrder = new Order('', '', '', '');
  deletedOrder.id = id;
  const result = await deletedOrder.deleteOrder();
  if (result) {
    res.status(200).json({ message: 'Order deleted successfully' });
  } else {
    res.status(500).json({ message: 'Error deleting order' });
  }
});

// Product endpoints
ZelleXY.post('/Product', productValidationRules, async (req, res) => {
  //const errors = validationResult(req);
 // if (!errors.isEmpty()) {
   // return res.status(400).json({ errors: errors.array() });
  //}
  const { name, description, price, category, quantity, image, businessID } = req.body;
  const product = new Product(name, businessID, price, description, category, quantity, image);
  const result = await product.createProduct();
  if (result) {
    res.status(201).json({ message: 'Product created successfully' });
  } else {
    res.status(500).json({ message: 'Error creating product' });
  }
});

ZelleXY.get('/Product', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const product = new Product('', '', '', id);
  const result = await product.getProduct();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

ZelleXY.put('/update', async (req, res) => {
  const { name, description, price, category, quantity, id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const product = new Product(name, description, price, id);
  const result = await product.updateProduct();
  if (result) {
    res.status(200).json({ message: 'Product updated successfully' });
  } else {
    res.status(500).json({ message: 'Error updating product' });
  }
});

ZelleXY.delete('/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const product = new Product('', '', '', id);
  const result = await product.deleteProduct();
  if (result) {
    res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Review endpoints
ZelleXY.post('/review',reviewValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { productId, userId, rating, comment } = req.body;
  const review = new Review(productId, userId, rating, comment);
  const result = await review.createReview();
  if (result) {
    res.status(201).json({ message: 'Review created successfully' });
  } else {
    res.status(500).json({ message: 'Error creating review' });
  }
});

ZelleXY.get('/review', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const review = new Review('', '', '', id);
  const result = await review.getReview();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
});

ZelleXY.put('/review/update', async (req, res) => {
  const { productId, userId, rating, comment, id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const review = new Review(productId, userId, rating, comment, id);
  const result = await review.updateReview();
  if (result) {
    res.status(200).json({ message: 'Review updated successfully' });
  } else {
    res.status(500).json({ message: 'Error updating review' });
  }
});

ZelleXY.delete('/review/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const review = new Review('', '', '', id);
  const result = await review.deleteReview();
  if (result) {
    res.status(200).json({ message: 'Review deleted successfully' });
  } else {
    res.status(500).json({ message: 'Error deleting review' });
  }
});

// Analytic endpoints
ZelleXY.post('/analytic',analyticValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { productId, metric, value } = req.body;
  const analytic = new Analytic(productId, metric, value);
  const result = await analytic.createAnalytic();
  if (result) {
    res.status(201).json({ message: 'Analytic created successfully' });
  } else {
    res.status(500).json({ message: 'Error creating analytic' });
  }
});

ZelleXY.get('/analytic', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const analytic = new Analytic('', '', '', id);
  const result = await analytic.getAnalytic();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: 'Analytic not found' });
  }
});

ZelleXY.put('/analytic/update', async (req, res) => {
  const { productId, metric, value, id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const analytic = new Analytic(productId, metric, value, id);
  const result = await analytic.updateAnalytic();
  if (result) {
    res.status(200).json({ message: 'Analytic updated successfully' });
  } else {
    res.status(500).json({message: 'Error updating analytic' });
  }
});

ZelleXY.delete('/analytic/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const analytic = new Analytic('', '', '', id);
  const result = await analytic.deleteAnalytic();
  if (result) {
    res.status(200).json({ message: 'Analytic deleted successfully' });
  } else {
    res.status(500).json({ message: 'Error deleting analytic' });
  }
});

// Business endpoints
ZelleXY.post('/business',businessValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { productId, field, value } = req.body;
  const business = new Business(productId, field, value);
  const result = await business.createBusiness();
  if (result) {
    res.status(201).json({ message: 'Business created successfully' });
  } else {
    res.status(500).json({ message: 'Error creating business' });
  }
});

ZelleXY.get('/business', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const business = new Business('', '', '', id);
  const result = await business.getBusiness();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: 'Business not found' });
  }
});

ZelleXY.put('/business/update', async (req, res) => {
  const { productId, field, value, id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const business = new Business(productId, field, value, id);
  const result = await business.updateBusiness();
  if (result) {
    res.status(200).json({ message: 'Business updated successfully' });
  } else {
    res.status(500).json({ message: 'Error updating business' });
  }
});

ZelleXY.delete('/business/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }
  const business = new Business('', '', '', id);
  const result = await business.deleteBusiness();
  if (result) {
    res.status(200).json({ message: 'Business deleted successfully' });
  } else {
    res.status(500).json({ message: 'Error deleting business' });
  }
});

ZelleXY.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

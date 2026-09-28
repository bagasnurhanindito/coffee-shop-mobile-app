const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Changed to lowercase 'order'

// Fetch user's history
router.get('/history/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('order');
    res.json({ history: orders });
  } catch (error) {
    console.error('Error fetching history:', error.message);
    res.status(500).send('Server Error');
  }
});

// Create a new order
router.post('/history/order', async (req, res) => {
  const { user, order, totalPrice, paymentMethod, status } = req.body;

  try {
    const newOrder = new Order({
      user,
      order,
      totalPrice,
      paymentMethod,
      status,
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const History = require('../models/history');
const Menu = require('../models/menu');

// Route to create an order
router.post('/', async (req, res) => {
  const { user, menuId, totalPrice, paymentMethod, status } = req.body;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    const newOrder = new Order({
      user,
      menu: menuId,
      totalPrice,
      paymentMethod,
      status
    });

    await newOrder.save();

    // Once order is placed, move it to history if it's completed
    if (status === 'completed') {
      const newHistory = new History({
        user,
        order: newOrder._id,
        totalPrice,
        paymentMethod,
        status: 'completed'
      });

      await newHistory.save();
    }

    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'Failed to create order.' });
  }
});

module.exports = router;

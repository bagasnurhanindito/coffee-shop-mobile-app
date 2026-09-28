const Order = require('../models/order');

// Create a new order
exports.createOrder = async (req, res) => {
    const { userId, items, totalPrice } = req.body;
    try {
        const newOrder = new Order({ userId, items, totalPrice, status: 'Pending' });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order history', error });
    }
};
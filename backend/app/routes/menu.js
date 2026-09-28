const express = require('express');
const router = express.Router();
const Menu = require('../models/menu'); // Changed to lowercase 'menu'

// Fetch all menus
router.get('/menu', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json({ menus });
  } catch (error) {
    console.error('Error fetching menus:', error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
const Menu = require('../models/menu');

// Get all menus
exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menus', error });
    }
};

// Add a new menu
exports.addMenu = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const newMenu = new Menu({ name, price, description });
        await newMenu.save();
        res.status(201).json({ message: 'Menu added successfully', menu: newMenu });
    } catch (error) {
        res.status(500).json({ message: 'Error adding menu', error });
    }
};

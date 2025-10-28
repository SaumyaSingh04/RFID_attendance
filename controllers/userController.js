const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const { rfid, name, email, role } = req.body;
    
    try {
        const user = new User({ rfid, name, email, role });
        await user.save();
        res.json({ message: 'User registered', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const User = require('../models/User');

const authenticateRFID = async (req, res, next) => {
    try {
        const { rfidId } = req.body;
        
        if (!rfidId) {
            return res.status(400).json({ error: 'RFID ID required' });
        }

        const user = await User.findOne({ rfidId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { authenticateRFID };
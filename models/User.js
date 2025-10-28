const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    rfid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['Employee', 'Intern'], default: 'Employee' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
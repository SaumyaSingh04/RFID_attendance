const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ['IN', 'OUT'], default: 'IN' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
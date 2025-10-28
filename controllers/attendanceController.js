const User = require('../models/User');
const Attendence = require('../models/Attendance');

exports.checkRFID = async (req, res) => {
    const { rfid } = req.body;
    
    if (!rfid) {
        return res.status(400).json({ message: 'RFID is required' });
    }

    try {
        // Get current time in Indian Standard Time (IST) using toLocaleString with timeZone
        const checkTime = new Date();
        const istTimeString = checkTime.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
        });

        const user = await User.findOne({ rfid });
        
        if (!user) {
            return res.status(404).json({ message: 'RFID not found' });
        }

        // If user is an employee, mark attendance
        let attendanceData = null;
        if (user.role === 'Employee') {
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0));
            const endOfDay = new Date(today.setHours(23, 59, 59, 999));

            let lastAttendance = await Attendence.findOne({
                employee: user._id,
                date: { $gte: startOfDay, $lte: endOfDay },
            }).sort({ date: -1 });

            const status = (!lastAttendance || lastAttendance.status === 'OUT') ? 'IN' : 'OUT';

            const attendance = new Attendence({
                employee: user._id,
                name: user.name,
                email: user.email,
                status: status,
                date: new Date(),
            });
            await attendance.save();
            attendanceData = attendance;
        }

        return res.status(200).json({
            message: `Welcome, ${user.name}!`,
            user: {
                name: user.name,
                email: user.email,
                rfid: user.rfid,
                role: user.role,
                checkTime: istTimeString,
            },
            attendance: attendanceData,
        });
        
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const records = await Attendence.find().sort({ date: -1 });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
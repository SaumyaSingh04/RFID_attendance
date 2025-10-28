const express = require('express');
const { checkRFID, getAttendance } = require('../controllers/attendanceController');

const router = express.Router();

router.post('/scan', checkRFID);
router.get('/', getAttendance);

module.exports = router;
# RFID Attendance System

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB service

3. Setup database with sample users:
```bash
npm run setup
```

4. Start server:
```bash
npm start
```

## Arduino Setup

1. Upload `arduino_rfid.ino` to your Arduino
2. Connect EM-18 RFID reader:
   - VCC → 5V
   - GND → GND  
   - TX → Pin 2
3. Update Wi-Fi credentials and server IP in code

## API Endpoints

- `POST /api/attendance/scan` - RFID scan endpoint
- `GET /attendance` - Get all attendance records
- `POST /api/users/register` - Register new user

## Hardware Required

- Arduino (ESP32/ESP8266 recommended for Wi-Fi)
- EM-18 RFID Reader
- RFID Cards/Tags# RFID_attendance

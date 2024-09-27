// db.js
const mongoose = require('mongoose');

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// สร้าง Schema สำหรับ users
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

// สร้าง Model จาก Schema
const User = mongoose.model('User', userSchema);

module.exports = User;

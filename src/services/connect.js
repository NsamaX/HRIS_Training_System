// connect.js
const mongoose = require('mongoose');

// ใช้ URL ของ MongoDB Atlas และแทนที่ <db_password> ด้วยรหัสผ่านจริงของคุณ
const uri = "mongodb+srv://admin:<db_password>@cluster0.nsd5g.mongodb.net/mydatabase?retryWrites=true&w=majority";

// เชื่อมต่อ MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas!');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1); // ออกจากโปรแกรมเมื่อไม่สามารถเชื่อมต่อได้
  }
};

// Export ฟังก์ชัน connectDB
module.exports = connectDB;

const mongoose = require('mongoose');

// ใช้ URL ของ MongoDB Atlas และตั้งค่า DB_USER และ DB_PASSWORD ใน .env เพื่อเข้าใช้งานจากภายนอก
const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nsd5g.mongodb.net/mydatabase?retryWrites=true&w=majority";

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

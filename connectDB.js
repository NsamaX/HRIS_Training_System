import mongoose from 'mongoose';

const uri = `mongodb+srv://admin:1234@cluster0.nsd5g.mongodb.net/mydatabase?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas!');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
};

export default connectDB;

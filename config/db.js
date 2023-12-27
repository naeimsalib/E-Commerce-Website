// Import necessary dependencies
const mongoose = require('mongoose');

// Database Connection Function
const dbConnection = async () => {
  try {
    // Connecting to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = dbConnection;

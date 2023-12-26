const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection')
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000',
}));

app.use("/api/auth",require('./routes/authRoutes.js'))
 
//error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Error from error handler!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.listen(process.env.PORT,() => {
    connectDb();
    console.log(`server's running on port ${process.env.PORT}`);
});
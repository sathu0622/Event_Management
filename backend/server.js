const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

const {logger} = require('./middleware/logEvents')
const connectToDatabase = require('./config/database')
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

dotenv.config();
const PORT = process.env.PORT || 5500;


app.use(logger)
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allow cookies or authorization headers
  };
  
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

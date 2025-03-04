const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const { logger } = require("./middleware/logEvents");
const connectToDatabase = require("./config/database");
const errorHandler = require('./middleware/errorHandler')
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const organizerRequest = require("./routes/organizerRoutes");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();
const PORT = process.env.PORT || 5500;

app.use(logger);
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from your frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies or authorization headers
};
app.use("/uploads", express.static("uploads"));
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/organizer", organizerRequest);
app.use("/api", eventRoutes);


app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

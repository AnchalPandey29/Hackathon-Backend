const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const app = express();
// Middleware
app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/hrms")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
// Routes
app.use("/api", routes);
// Error handling middleware
app.use(errorHandler);
module.exports = app;

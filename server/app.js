require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/superadmin", require("./routes/superadmin.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/faculty", require("./routes/faculty.routes"));
app.use("/api/student", require("./routes/student.routes"));

module.exports = app;

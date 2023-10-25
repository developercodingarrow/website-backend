const express = require("express");
const app = express();
const globalErrorHandler = require("./utils/errorController");
const UserRoute = require("./routes/UserRoutes");

// Midelwears
app.use(express.json());

// Routes
app.use("/api/v1/first-website/user", UserRoute);

// global Error Control
app.use(globalErrorHandler);
module.exports = app;

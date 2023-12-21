const express = require("express");
const app = express();
const globalErrorHandler = require("./utils/errorController");
const UserRoute = require("./routes/UserRoutes");
const TestRoute = require("./routes/testRoute");
const CompaniesRpute = require("./routes/CompaniesRoute");
const cors = require("cors");

// Midelwears
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/first-website/user", UserRoute);
app.use("/api/v1/first-website/test", TestRoute);
app.use("/api/v1/first-website/companies", CompaniesRpute);

// global Error Control
app.use(globalErrorHandler);
module.exports = app;

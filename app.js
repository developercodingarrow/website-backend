const express = require("express");
const app = express();
const globalErrorHandler = require("./utils/errorController");
const UserRoute = require("./routes/UserRoutes");
const TestRoute = require("./routes/testRoute");
const CompaniesRpute = require("./routes/CompaniesRoute");
const FormFiledRouter = require("./routes/FormFiledRouter");
const ProductRouter = require("./routes/ProductRoute");
const cors = require("cors");

// Midelwears
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/first-website/user", UserRoute);
app.use("/api/v1/first-website/test", TestRoute);
app.use("/api/v1/first-website/companies", CompaniesRpute);
app.use("/api/v1/first-website/form-field", FormFiledRouter);
app.use("/api/v1/first-website/product", ProductRouter);

// global Error Control
app.use(globalErrorHandler);
module.exports = app;

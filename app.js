/**
 * Author: Gerald Addo-Tetteh
 * Project: Inventory Tracker
 *
 * App.js
 * This file is the starting point for the applications
 * where all routes are used and initializations are made.
 */

const express = require("express");
const csurf = require("csurf");
const flash = require("connect-flash");
const session = require("express-session");
require("dotenv").config();

const inventoryRoutes = require("./routes/inventory");
const errorRoutes = require("./routes/errors");
const errorsController = require("./controllers/errors");

const app = express();
const csurfProtection = csurf();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(csurfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(inventoryRoutes);
app.use(errorRoutes);
// used to show internal server errors from controllers
app.use(errorsController.get500);

app.listen(3000);

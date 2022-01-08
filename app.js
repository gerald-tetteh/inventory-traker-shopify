const express = require("express");
const csurf = require("csurf");
const flash = require("connect-flash");
const session = require("express-session");
require("dotenv").config();

const inventoryRoutes = require("./routes/inventory");

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

app.listen(3000);

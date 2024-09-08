const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const itemsRouter = require("./routes/item");
const addCategoryRouter = require("./routes/addCategory");
const categoriesRouter = require("./routes/categories");
const addProductRouter = require("./routes/addProduct");
const supplierRoutes = require("./routes/supplier");
const brandRoutes = require("./routes/brand");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/item", itemsRouter);
app.use("/addCategory", addCategoryRouter);
app.use("/categories", categoriesRouter);
app.use("/addProduct", addProductRouter);
app.use("/supplier", supplierRoutes);
app.use("/brand", brandRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

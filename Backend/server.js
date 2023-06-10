const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/globalErrorController");
const path = require('path');
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());

dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log("DB connection successful!");
});

app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const port = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, 'public')));
const userRoutes = require("./routes/userRoutes");
const trainingsRoutes = require("./routes/TrainingRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/users", userRoutes);
app.use("/trainings", trainingsRoutes);
app.use("/posts", postRoutes);

// handle hundled routes

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handler
app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

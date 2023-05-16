import express, { Application } from "express";
import morgan from "morgan";
import errorHandler from "./middleware/error.middleware";
import ImageRouter from "./routes";

const App: Application = express();

// Logging middleware
App.use(morgan('dev'));

// express.json middleware for parsing json
App.use(express.json());

// express.urlencoded middleware for parsing url-encoded bodies
App.use(express.urlencoded({ extended: false }));

// Set Access-Control-Allow-Origin and Access-Control-Allow-Headers headers
App.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Image handling routes
App.use("/v1/images", ImageRouter);

// Error Handler Middleware
App.use(errorHandler);

export default App;

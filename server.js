const express = require("express");
const http = require("http");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Init App
const app = express();

// Body-parser Middleware
app.use(express.json());

// Load environment settings
dotenv.config({ path: "./config.env" });

const server = http.createServer(app);

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Link to router
app.get("/", (req, res) =>
  res.send(
    "Succesful! Use the POST method with 'https://splitpay-nodejs.onrender.com/split-payments/compute' as your endpoint. Find sample payload here 'https://github.com/AbrahamNobleOX/splitpay-nodejs' "
  )
);
app.use("/split-payments/compute", require("./routes/api/split-payments"));

// Set Listening Port
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server started on port ${port}`));

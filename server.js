const http = require("http");
require("dotenv").config();
const { createConnection } = require("typeorm");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const PORT = 3000;

const app = express();

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  console.error(message);
  res
    .status(statusCode || 500)
    .json({ message: message || "Internal server error" });
});

const server = http.createServer(app);

const serverStart = async () => {
  await createConnection();

  try {
    server.listen(PORT, () => {
      console.log(`server is listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

serverStart();

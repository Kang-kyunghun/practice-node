const http = require("http");
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
  const { message } = err;
  console.error(message);
  res.status(500).json({ message: "Internal server error", error: message });
});

const server = http.createServer(app);

const serverStart = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`server is listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

serverStart();

// const signUp = async (req, res) => {
//   const data = req.body;
//   const query = await pool.query(
//     `INSERT INTO users(name, email, password) VALUES('${data.name}', '${data.email}', '${data.password}');`
//   );

//   res.status(201).json({
//     status: "created",
//     data: {
//       insertedId: query[0].insertedId,
//     },
//   });
// };

// const signIn = async (req, res) => {
//   const data = req.body;
//   const query = await pool.query(
//     `SELECT name, email FROM users WHERE email='${data.email}' and password='${data.password}';`
//   );

//   const result = query[0];

//   if (result.length === 0) {
//     res.status(401).json({
//       status: "Unauthorized",
//       message: "Invalid user",
//     });
//   } else {
//     res.status(200).json({
//       status: "success",
//       data: {
//         name: result[0].name,
//         email: result[0].email,
//       },
//     });
//   }
// };

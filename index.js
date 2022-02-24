const fs = require("fs");
const http = require("http");
const express = require("express");

const app = express();

app.get("/ping", (req, res) => {
  res.status(200).json({ ping: "pong" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
////////////////////
///// http 모듈 /////
// const server = http.createServer((req, res) => {
//   const pathName = req.url;
//   const httpMethod = req.method;

//   if (pathName === "/profile") {
//     if (httpMethod === "GET") {
//       fs.readFile(`${__dirname}/data/profile.json`, "utf-8", (err, data) => {
//         res.writeHead(200, {
//           "Content-type": "application/json",
//         });
//         res.end(data);
//       });
//     }
//   } else if (pathName === "/feeds") {
//     if (httpMethod === "GET") {
//       fs.readFile(`${__dirname}/data/feeds.json`, "utf-8", (err, data) => {
//         const profileData = JSON.parse(data);

//         res.writeHead(200, {
//           "Content-type": "application/json",
//         });
//         res.end(JSON.stringify({ result: profileData }));
//       });
//     } else if (httpMethod === "POST") {
//       req.on("data", (bodyData) => {
//         console.log(bodyData.toString());

//         fs.readFile(`${__dirname}/data/feeds.json`, "utf-8", (err, data) => {
//           const feedData = JSON.parse(data);
//           const result = feedData.push(bodyData.toJSON("utf-8"));

//           console.log(feedData);
//         });

//         res.writeHead(200, {
//           "Content-type": "application/json",
//         });
//         res.end(bodyData);
//       });
//     }
//   } else {
//     res.writeHead(404, {
//       "Content-Type": "text/html",
//     });
//     res.end("<h1>NOT FOUND</h1>");
//   }
// });

// server.listen(8002, "127.0.0.1", () => {
//   console.log("Server started");
// });

const express = require("express");
const pool = require("./database/pool");
const app = express();

app.use(express.json());

const signUp = async (req, res) => {
  const data = req.body;
  const query = await pool.query(
    `INSERT INTO users(name, email, password) VALUES('${data.name}', '${data.email}', '${data.password}');`
  );

  res.status(201).json({
    status: "created",
    data: {
      insertedId: query[0].insertedId,
    },
  });
};

const signIn = async (req, res) => {
  const data = req.body;
  const query = await pool.query(
    `SELECT name, email FROM users WHERE email='${data.email}' and password='${data.password}';`
  );

  const result = query[0];

  if (result.length === 0) {
    res.status(401).json({
      status: "Unauthorized",
      message: "Invalid user",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        name: result[0].name,
        email: result[0].email,
      },
    });
  }
};

const createPosting = async (req, res) => {
  const data = req.body;
  const headers = req.headers;

  const query = await pool.query(
    `INSERT INTO postings(title, content, user_id) VALUES('${data.title}', '${data.content}', ${headers.authorization});`
  );

  res.status(201).json({
    status: "created",
    data: {
      insertedId: query[0].insertedId,
    },
  });
};

app.get("/ping", (req, res) => {
  console.log(req.headers);
  res.status(200).json({ ping: "pong" });
});

app.post("/api/v1/users/signup", signUp);
app.post("/api/v1/users/signin", signIn);
app.post("/api/v1/postings", createPosting);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

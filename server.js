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

const getPostingList = async (req, res) => {
  const query = await pool.query(`SELECT * FROM postings;`);
  const results = query[0];

  res.status(200).json({
    status: "success",
    results: results.length,
    data: results,
  });
};

const getPostingDetail = async (req, res) => {
  const product_id = req.params.posting_id;
  const query = await pool.query(
    `SELECT * FROM postings WHERE id=${product_id};`
  );
  const results = query[0];

  if (results.length === 0) {
    res.status(404).json({
      status: "fail",
      message: "Resource is not found",
      results: results.length,
      data: results,
    });
  } else {
    res.status(200).json({
      status: "success",
      results: results.length,
      data: results,
    });
  }
};

app.get("/ping", (req, res) => {
  res.status(200).json({ ping: "pong" });
});

app.post("/api/v1/users/signup", signUp);
app.post("/api/v1/users/signin", signIn);
app.post("/api/v1/postings", createPosting);
app.get("/api/v1/postings", getPostingList);
app.get("/api/v1/postings/:posting_id", getPostingDetail);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

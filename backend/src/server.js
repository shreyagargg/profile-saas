const express = require("express");
const session = require("express-session");
const db = require("./db");
const cors = require("cors");

const app = express();

app.use(
  cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use(express.json());

app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

app.get("/teachers", (req, res) => {
  db.query("SELECT * FROM teachers", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get("/teachers/:id/students", (req, res) => {
  db.query("SELECT * FROM students WHERE teacher_id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.get("/teachers/:id", (req, res) => {
  const teacherId = req.params.id;
  db.query("SELECT * FROM teachers WHERE id = ?", [teacherId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Teacher not found" });
    res.json(result[0]);
  });
});


const PORT = 5000
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
})
// const express = require("express");
// const session = require("express-session");
// const db = require("./db");
// const cors = require("cors");

// const app = express();

// app.use(
//   cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }))

// app.use(express.json());

// app.use(
//   session({
//     secret: "super-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 // 1 day
//     }
//   })
// );

// app.post("/login", (req, res) => {
//   const teacher = findTeacher(req.body.email);

//   req.session.teacherId = teacher.id;

//   res.json({ ok: true });
// });

// app.get("/teachers", (req, res) => {
//   db.query("SELECT * FROM teachers", (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// });

// app.get("/teachers/:id/students", (req, res) => {
//   db.query("SELECT * FROM students WHERE teacher_id = ?", [req.params.id], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// });

// app.get("/students", (req, res) => {
//   if (!req.session.teacherId)
//     return res.status(401).send("Not logged in");

//   db.query(
//     "SELECT * FROM students WHERE teacher_id = ?",
//     [req.session.teacherId]
//   );
// });


// app.get("/teachers/:id", (req, res) => {
//   const teacherId = req.params.id;
//   db.query("SELECT * FROM teachers WHERE id = ?", [teacherId], (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (result.length === 0) return res.status(404).json({ message: "Teacher not found" });
//     res.json(result[0]);
//   });
// });


// const PORT = 5000
// app.listen(PORT, () => {
//   console.log("Server is running on port 5000");
// })



const express = require("express");
const session = require("express-session");
const db = require("./db");
const cors = require("cors");

const app = express();

/* -------------------- CORS -------------------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* -------------------- SESSION -------------------- */
app.use(
  session({
    name: "saas.sid",
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/* -------------------- DEMO LOGIN (teacherId) -------------------- */
app.post("/login", (req, res) => {
  const { teacherId } = req.body;

  if (!teacherId)
    return res.status(400).json({ message: "teacherId required" });

  db.query(
    "SELECT * FROM teachers WHERE id = ?",
    [teacherId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(401).json({ message: "Invalid teacherId" });

      req.session.teacherId = Number(teacherId);

      res.json({
        ok: true,
        teacherId,
      });
    }
  );
});

/* -------------------- AUTO LOGIN CHECK -------------------- */
app.get("/me", (req, res) => {
  if (!req.session.teacherId)
    return res.status(401).json({ loggedIn: false });

  db.query(
    "SELECT * FROM teachers WHERE id = ?",
    [req.session.teacherId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

/* -------------------- TENANT-SAFE ROUTES -------------------- */

/* URL-based + session-verified */
app.get("/teachers/:id/students", (req, res) => {
  const urlTeacherId = Number(req.params.id);

  if (!req.session.teacherId)
    return res.status(401).send("Not logged in");

  if (urlTeacherId !== req.session.teacherId)
    return res.status(403).send("Forbidden");

  db.query(
    "SELECT * FROM students WHERE teacher_id = ?",
    [urlTeacherId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

/* Optional: session-only version */
app.get("/students", (req, res) => {
  if (!req.session.teacherId)
    return res.status(401).send("Not logged in");

  db.query(
    "SELECT * FROM students WHERE teacher_id = ?",
    [req.session.teacherId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

/* -------------------- TEACHER FETCH (unchanged) -------------------- */
app.get("/teachers/:id", (req, res) => {
  db.query(
    "SELECT * FROM teachers WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(404).json({ message: "Teacher not found" });
      res.json(result[0]);
    }
  );
});

/* -------------------- LOGOUT (optional) -------------------- */
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("saas.sid");
    res.json({ ok: true });
  });
});

/* -------------------- SERVER -------------------- */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

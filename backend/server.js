// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";
import Student from "./models/student.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/studentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/students", studentRoutes);

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
console.log(username, password)
  try {
    // Find student by username
    const student = await Student.findOne({ username });

    if (!student) {
      return res.json({ success: false, message: "Invalid Username" });
    }

    // Plain text password check (later we can use bcrypt)
    if (student.password !== password) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    // Login success → return student data
    res.json({
      success: true,
      student,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/profile/rollno/:rollNo", async (req, res) => {
    console.log(req.params.rollNo);
    
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo }).select("name rollNo course");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// server.js
app.get("/api/results/rollno/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo }).select("results");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(5000, () => console.log("Server running on port 5000"));

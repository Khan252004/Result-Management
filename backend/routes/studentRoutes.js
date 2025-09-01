// routes/studentRoutes.js
import express from "express";
import Student from "../models/student.js";

const router = express.Router();

// Admin: Add or update student results
router.post("/add", async (req, res) => {
  try {
    const { rollNo, name, course, results } = req.body;

    let student = await Student.findOne({ rollNo });
    if (student) {
      // update
      student.results = results;
      await student.save();
      return res.json({ message: "Results updated", student });
    } else {
      // create
      student = new Student({ rollNo, name, course, results });
      await student.save();
      return res.json({ message: "Student added", student });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student: Fetch results by roll number
router.get("/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

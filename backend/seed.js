// seed.js
import mongoose from "mongoose";
import Student from "./models/student.js";

const students =[
  {
    rollNo: "101",
    username: "adnan101",
    password: "password123", // will be hashed automatically
    name: "Adnan Khan",
    course: "B.Tech CSE",
    results: [
      { sem: 1, CGPA: 7.5, remarks: "Good" },
      { sem: 2, CGPA: 8.0, remarks: "Very Good" },
    ],
  },
  {
    rollNo: "102",
    username: "priya102",
    password: "mypassword",
    name: "Priya Sharma",
    course: "B.Tech IT",
    results: [
      { sem: 1, CGPA: 8.2, remarks: "Excellent" },
      { sem: 2, CGPA: 8.5, remarks: "Excellent" },
    ],
  }
];


const MONGO_URI = "mongodb://127.0.0.1:27017/studentDB";

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    await Student.deleteMany({});
    await Student.insertMany(students);
    console.log("🎉 Dummy students inserted");
    process.exit();
  })
  .catch((err) => console.error(err));

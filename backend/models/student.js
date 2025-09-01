import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const resultSchema = new mongoose.Schema({
  sem: { type: Number, required: true },
  CGPA: { type: Number, required: true },
  remarks: { type: String }
});

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true }, // login username
  password: { type: String, required: true }, // hashed password
  name: { type: String, required: true },
  course: { type: String, required: true }, 
  results: [resultSchema],
});

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);
export default Student;

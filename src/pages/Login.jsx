import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login({ setAuth, setStudent }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { username, password });

      if (res.data.success) {
        const student = res.data.student;

        // 🔹 Save studentId and rollNo in localStorage
        localStorage.setItem("studentId", student._id);
        localStorage.setItem("rollNo", student.rollNo);

        setStudent(student); // store student data in state
        setAuth(true);        // mark authenticated

        alert("Login successful!");
        navigate("/profile"); // redirect to profile page
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div className="centered-container">
      <div className="card">
        <h2>Student Login</h2>
        <form onSubmit={handleLogin} className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

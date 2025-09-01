import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import "./App.css"

function App() {
  const [auth, setAuth] = useState(false);
  const [student, setStudent] = useState(null); // 🔹 store student data here

  return (
    <Router>
      <Routes>
        {/* Default route → Login */}
        <Route
          path="/"
          element={
            auth ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setAuth={setAuth} setStudent={setStudent} />
            )
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            auth ? (
              <Dashboard setAuth={setAuth} student={student} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={auth ? <Profile student={student} /> : <Navigate to="/" />}
        />
        <Route
          path="/results"
          element={auth ? <Results student={student} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

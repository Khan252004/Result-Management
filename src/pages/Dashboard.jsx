import React, { useState } from "react";
import "../styles/Dashboard.css";
import Profile from "./Profile";
import Results from "./Results";

export default function Dashboard({ setAuth }) {
  const [activeSection, setActiveSection] = useState("Profile");

  const renderSection = () => {
    switch (activeSection) {
      case "Profile":
        return <Profile />;
      case "Results":
        return <Results />;
      case "Notifications":
        return <p>Stay updated with the latest news and alerts here.</p>;
      case "Settings":
        return <p>Manage your account preferences here.</p>;
      default:
        return <p>Select a section to view details.</p>;
    }
  };

  // 🔹 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("studentRollNo"); // clear roll no
    setAuth(false); // go back to login
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>

      <div className="dashboard-grid">
        <div
          className={`dashboard-card ${activeSection === "Profile" ? "active" : ""}`}
          onClick={() => setActiveSection("Profile")}
        >
          <h3>Profile</h3>
          <p>View and update your personal details</p>
        </div>

        <div
          className={`dashboard-card ${activeSection === "Results" ? "active" : ""}`}
          onClick={() => setActiveSection("Results")}
        >
          <h3>Results</h3>
          <p>Check your academic performance</p>
        </div>

        <div
          className={`dashboard-card ${activeSection === "Notifications" ? "active" : ""}`}
          onClick={() => setActiveSection("Notifications")}
        >
          <h3>Notifications</h3>
          <p>Stay updated with the latest news</p>
        </div>

        <div
          className={`dashboard-card ${activeSection === "Settings" ? "active" : ""}`}
          onClick={() => setActiveSection("Settings")}
        >
          <h3>Settings</h3>
          <p>Manage your account preferences</p>
        </div>
      </div>

      <div className="dashboard-content">{renderSection()}</div>

      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const rollNo = localStorage.getItem("rollNo"); // stored after login
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/rollno/${rollNo}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (rollNo) fetchProfile();
  }, [rollNo]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Roll No:</strong> {profile.rollNo}</p>
      <p><strong>Course:</strong> {profile.course}</p>
    </div>
  );
}

export default Profile;

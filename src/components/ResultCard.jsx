import React, { useEffect, useState } from "react";

function Results() {
  const [student, setStudent] = useState(null);
  const rollNo = localStorage.getItem("studentRollNo");

  useEffect(() => {
    fetch(`http://localhost:5000/api/students/${rollNo}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error(err));
  }, [rollNo]);

  if (!student) return <p>Loading...</p>;

  return (
    <div className="results-page">
      <h2>{student.name} - {student.course}</h2>
      {student.results.map((sem, idx) => (
        <div key={idx} className="sem-result">
          <h3>Semester {sem.sem}</h3>
          <p>CGPA: {sem.CGPA}</p>
          <p>Remarks: {sem.remarks}</p>
        </div>
      ))}
    </div>
  );
}

export default Results;

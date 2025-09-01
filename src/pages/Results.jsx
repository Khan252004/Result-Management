import React, { useEffect, useState } from "react";
import axios from "axios";

function Results() {
  const rollNo = localStorage.getItem("rollNo");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/results/rollno/${rollNo}`);
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    if (rollNo) fetchResults();
  }, [rollNo]);

  if (results.length === 0) return <p>No results available</p>;

  return (
    <div className="results-page">
      <h2>Semester-wise Results</h2>
      <table className="results-table" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Semester</th>
            <th>CGPA</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, index) => (
            <tr key={index}>
              <td>Sem {res.sem}</td>
              <td>{res.CGPA}</td>
              <td>{res.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;

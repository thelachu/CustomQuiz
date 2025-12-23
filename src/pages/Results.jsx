import { useEffect, useState } from "react";
import "./Results.css";

function Results() {
  const [marks, setMarks] = useState(null);
  const [noOfQ, setNoOfQ] = useState(null);

  useEffect(() => {
    const storedMarks = JSON.parse(localStorage.getItem("marks"));
    const storedNoOfQ = JSON.parse(localStorage.getItem("noOfQ"));

    setMarks(storedMarks);
    setNoOfQ(storedNoOfQ);
  }, []);

  if (marks === null || noOfQ === null) {
    return <h2>Loading Results...</h2>;
  }

  return (
    <div className="results-container">
      <h3>Total Questions : {noOfQ}</h3>
      <h2>Correct Answers : {marks}</h2>
      <h2>Wrong Answers : {noOfQ - marks}</h2>
      <h1>
        RESULTS : {marks} / {noOfQ}
      </h1>
    </div>
  );
}

export default Results;

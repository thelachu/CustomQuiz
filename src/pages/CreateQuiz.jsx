import { useState } from "react";
import "./CreateQuiz.css";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
  const navigate = useNavigate();
  const [bundle, setBundle] = useState([]);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState(["", "", ""]);
  function handleWrongAnswers(i, value) {
    setWrongAnswers((prev) => {
      let copy = [...prev];
      copy[i] = value;
      return copy;
    });
  }
  function doneHandle() {
    if (
      question.trim() == "" ||
      correctAnswer.trim() == "" ||
      wrongAnswers[0].trim() == ""
    ) {
      alert("Please fill all required fields!");
      return;
    }
    const newBundle = { question, correctAnswer, wrongAnswers };
    setBundle((prev) => {
      const updated = [...prev, newBundle];
      localStorage.setItem("data", JSON.stringify(updated));
      return updated;
    });
    setQuestion("");
    setCorrectAnswer("");
    setWrongAnswers(["", "", ""]);
  }

  return (
    <div className="custom-container-main">
      <div className="custom-container">
        <div className="questionNumber">QUESTION {bundle.length + 1}</div>
        <div className="question-card">
          <div>
            <span className="questionHeader">Question</span>
          </div>
          <div>
            <textarea
              id="questionInput"
              placeholder="Required"
              name="question"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}></textarea>
          </div>
        </div>
        <div className="correct-answer-card">
          <div>Correct answer</div>
          <div>
            <input
              type="text"
              placeholder="Required"
              id="correctAnswer"
              required
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}></input>
          </div>
        </div>
        <div className="false-answers-card">
          <div>Wrong answers</div>
          <div className="false-inputs">
            <input
              type="text"
              placeholder="Required"
              required
              value={wrongAnswers[0]}
              onChange={(e) => handleWrongAnswers(0, e.target.value)}
            />
            <input
              type="text"
              placeholder="Optional"
              value={wrongAnswers[1]}
              onChange={(e) => handleWrongAnswers(1, e.target.value)}
            />
            <input
              type="text"
              placeholder="Optional"
              value={wrongAnswers[2]}
              onChange={(e) => handleWrongAnswers(2, e.target.value)}
            />
          </div>
        </div>
        <div className="done">
          <button
            id="doneBtn"
            onClick={doneHandle}
            disabled={
              question.trim() == "" ||
              correctAnswer.trim() == "" ||
              wrongAnswers[0].trim() == ""
            }>
            Save
          </button>
          {JSON.parse(localStorage.getItem("data")) && (
            <button
              className="playQuizBtn"
              onClick={() => navigate("/custom-quiz/play-quiz")}
              disabled={bundle.length == 0}>
              Play Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;

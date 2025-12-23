import { json, useNavigate } from "react-router-dom";
import "./PlayQuiz.css";
import { useEffect, useRef, useState } from "react";

function PlayQuiz() {
  const progressBar = useRef(null);
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [showResultBtn, setShowResultBtn] = useState(false);
  const [timerStopped, setTimerStopped] = useState(false);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("data"));
      setQuizData(Array.isArray(data) ? data : []);
    } catch {
      setQuizData([]);
    }
  }, []);

  useEffect(() => {
    if (quizData.length === 0 || timerStopped) return;

    const totalTime = 30;
    let remainingTime = totalTime;

    if (progressBar.current) {
      progressBar.current.style.width = "100%";
    }

    const interval = setInterval(() => {
      remainingTime--;

      if (progressBar.current) {
        progressBar.current.style.width =
          (remainingTime / totalTime) * 100 + "%";
      }

      if (remainingTime <= 0) {
        clearInterval(interval);
        if (currentIndex < quizData.length - 1) {
          setCurrentIndex((p) => p + 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, quizData, timerStopped]);

  useEffect(() => {
    if (quizData.length === 0) return;

    const q = quizData[currentIndex];
    if (!q) return;

    const options = [
      q.correctAnswer,
      ...(Array.isArray(q.wrongAnswers) ? q.wrongAnswers : []),
    ]
      .filter(Boolean)
      .sort(() => Math.random() - 0.5);

    setShuffledOptions(options);
  }, [currentIndex, quizData]);

  useEffect(() => {
    if (
      quizData.length > 0 &&
      Object.keys(selectedAnswers).length === quizData.length
    ) {
      setShowResultBtn(true);
    }
  }, [selectedAnswers, quizData]);

  function handleOptionClick(option) {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
  }

  function handleCheckResults() {
    setTimerStopped(true);

    let marks = 0;
    quizData.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        marks++;
      }
    });

    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    localStorage.setItem("marks", JSON.stringify(marks));
    localStorage.setItem("noOfQ", JSON.stringify(quizData.length));
    navigate("/custom-quiz/play-quiz/results");
  }

  if (quizData.length === 0) {
    return <h2>Loading...</h2>;
  }

  const currentQuestion = quizData[currentIndex];
  const selectedOption = selectedAnswers[currentIndex];

  return (
    <div className="play-quiz">
      <div className="play-quiz-container">
        <div className="progress">
          <span className="progress-bar" ref={progressBar}></span>
        </div>

        <span className="question-box-header">
          {currentIndex + 1}. {currentQuestion.question}
        </span>

        <div className="options-box">
          {shuffledOptions.map((option, index) => (
            <span
              key={index}
              className={`option ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}>
              {option}
            </span>
          ))}
        </div>

        <div className="buttons-box">
          <button
            className="prevBtn"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((p) => p - 1)}>
            Prev
          </button>

          <button
            className="nextBtn"
            disabled={currentIndex === quizData.length - 1}
            onClick={() => setCurrentIndex((p) => p + 1)}>
            Next
          </button>
        </div>

        {showResultBtn && (
          <button className="resultBtn" onClick={handleCheckResults}>
            Check Results
          </button>
        )}
      </div>
    </div>
  );
}

export default PlayQuiz;

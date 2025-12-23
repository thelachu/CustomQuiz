import "./Main.css";
import imageOne from "../assets/banner-illustration-create.svg";
import imageTwo from "../assets/banner-illustration-ai.svg";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  return (
    <main className="main">
      <div className="main-left">
        <div className="quiz-container">
          <div className="image">
            <img className="imageCreate" src={imageOne}></img>
          </div>
          <div className="quiz-right">
            <div className="header-right">
              <h1>Custom Your</h1>
              <h1>Quiz</h1>
            </div>
            {/* <div>
              <p>Create your own quiz</p>
              <p>with options</p>
            </div> */}
            <button onClick={() => navigate("custom-quiz")}>
              Custom Your Quiz
            </button>
          </div>
        </div>
      </div>
      {/* <div className="main-right">
        <div className="quiz-container">
          <div className="image">
            <img className="imageCreate" src={imageTwo}></img>
          </div>
          <div className="quiz-right">
            <h1>Play quiz</h1>
            <p>Play quiz </p>
            <button>Play quiz</button>
          </div>
        </div>
      </div> */}
      <div className="quizInfo"></div>
    </main>
  );
}

export default Main;

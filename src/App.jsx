import Header from "./components/Header";
import CreateQuiz from "./pages/CreateQuiz";
import PlayQuiz from "./pages/PlayQuiz";
import Main from "./components/Main.jsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Results from "./pages/Results.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/custom-quiz" element={<CreateQuiz />}></Route>
        <Route path="/custom-quiz/play-quiz" element={<PlayQuiz />}></Route>
        <Route
          path="/custom-quiz/play-quiz/results"
          element={<Results />}></Route>
        <Route path="*" element={<h1 className="error">404 Error</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;

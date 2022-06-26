import "./App.css";
import Start from "./component/Start";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Question from "./component/Question";
import { useState } from "react";
import Score from "./component/Score";

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const getQuestions = async (config) => {
    var url = "https://opentdb.com/api.php?";
    if (config.amount) {
      url = url + "amount=" + config.amount;
    } else {
      url = url + "amount=" + 10;
    }
    if (config.category) {
      url = url + "&category=" + config.category;
    } else {
      url = url + "&category=" + 18;
    }
    if (config.difficulty && config.difficulty != "any") {
      url = url + "&difficulty=" + config.difficulty;
    }
    if (config.type && config.type != "any") {
      url = url + "&type=" + config.type;
    }

    setUser(config.user);
    //https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple
    const data = await fetch(url);
    const downloaded = await data.json();

    setQuestions(downloaded.results);
    setTotal(config.amount);
  };

  const startQuiz = async (data) => {
    await getQuestions(data);
    navigate("/question/1");
  };
  const endQuiz = async (score) => {
    setScore(score);
    navigate("/score");
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={<Start onStartQuiz={startQuiz}></Start>}
        />

        <Route
          path="/question/:index"
          exact
          element={
            <Question
              questions={questions}
              onEndQuiz={endQuiz}
              user={user}
            ></Question>
          }
        />

        <Route
          path="/score"
          exact
          element={<Score score={score} total={total}></Score>}
        />
      </Routes>
    </div>
  );
}

export default App;

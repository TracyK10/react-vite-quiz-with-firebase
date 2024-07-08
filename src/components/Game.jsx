import { useState, useEffect } from "react";
import Question from "./Question";
import { loadQuestions } from "../helpers/QuestionsHelper";
import "../index.css";

function Game() {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      
      try {
        const questions = await loadQuestions();
        
        console.log(questions);
        setQuestions(questions);
        setCurrentQuestion(questions[0]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="container">
      <h1>Game</h1>
      {loading && <div id="loader"></div>}
      {!loading && currentQuestion && <Question question={currentQuestion} />}
    </div>
  );
}

export default Game;

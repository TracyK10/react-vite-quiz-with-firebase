import { useState, useEffect } from "react";
import Question from "./Question";
import { loadQuestions } from "../helpers/QuestionsHelper";
import "../index.css";
import HUD from "./HUD";
import ScoreForm from "./ScoreForm";

function Game() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await loadQuestions();
        console.log(questions);
        setQuestions(questions);
        changeQuestion(questions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, []);

  function changeQuestion(questionsArray, bonus = 0) {
    if (questionsArray.length === 0) {
      return setGameOver(true) && setScore(prevScore => prevScore + bonus);
    }
    const randomQuestionIndex = Math.floor(
      Math.random() * questionsArray.length
    );
    const currentQuestion = questionsArray[randomQuestionIndex];
    const remainingQuestions = [...questionsArray];
    remainingQuestions.splice(randomQuestionIndex, 1);
    setQuestions(remainingQuestions);
    setCurrentQuestion(currentQuestion);
    setLoading(false);
    setScore((prevScore) => prevScore + bonus);
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
  }

  function handleQuestionChange(bonus = 0) {
    changeQuestion(questions, bonus);
  }

  return (
    <div className="container">
      <h1>Game</h1>
      {loading && !gameOver && <div id="loader"></div>}

      {!gameOver && !loading && currentQuestion && (
        <>
          <HUD score={score} questionNumber={questionNumber} />
          <Question
            changeQuestion={handleQuestionChange}
            question={currentQuestion}
          />
        </>
      )}

      {gameOver && <ScoreForm score={score} />}
    </div>
  );
}

export default Game;

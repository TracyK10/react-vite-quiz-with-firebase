import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate(); // Use useNavigate for navigation

  // Load questions when the component mounts
  useEffect(() => {
    loadQuestions()
      .then((questions) => {
        setQuestions(questions);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Change the question when questions are loaded or currentQuestion changes
  useEffect(() => {
    if (!currentQuestion && questions.length) {
      changeQuestion(questions);
    }
  }, [currentQuestion, questions]);

  // Function to change the current question and update the score
  const changeQuestion = useCallback(
    (questionsArray = questions, bonus = 0) => {
      if (questionsArray.length === 0) {
        setScore((prevScore) => prevScore + bonus);
        setGameOver(true);
        return;
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
    },
    [score, questionNumber, questions]
  );

  // Function to handle question change and update score
  function handleQuestionChange(bonus = 0) {
    changeQuestion(questions, bonus);
  }

  // Function to handle score save and navigate back to home
  function scoreSaved() {
    navigate("/");
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

      {gameOver && <ScoreForm score={score} scoreSaved={scoreSaved} />}
    </div>
  );
}

export default Game;

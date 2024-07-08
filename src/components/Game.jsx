import { useState, useEffect } from "react";
import Question from "./Question";

function Game() {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const url =
        "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple";
      try {
        const res = await fetch(url);
        const { results } = await res.json();

        const questions = results.map((loadedQuestion) => {
          const formattedQuestion = {
            question: loadedQuestion.question,
            options: [...loadedQuestion.incorrect_answers],
          };
          formattedQuestion.answer = Math.floor(Math.random() * 4);

          formattedQuestion.options.splice(
            formattedQuestion.answer,
            0,
            loadedQuestion.correct_answer
          );
          return formattedQuestion;
        });

        console.log(questions);
        setQuestions(questions);
        setCurrentQuestion(questions[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="container">
      <h1>Game</h1>
      {currentQuestion && <Question question={currentQuestion} />}
    </div>
  );
}

export default Game;

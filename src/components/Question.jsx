/* eslint-disable react/prop-types */

import { useState } from "react";

function Question({ question, changeQuestion }) {
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [classToApply, setClassToApply] = useState("");
  const [answer, setAnswer] = useState(false);

  function checkAnswer(selectedAnswer) {
    if (answer) return;
    setAnswer(true);
    setSelectedAnswer(selectedAnswer);

    const classToApply =
      selectedAnswer === question.answer ? "correct" : "incorrect";
    const bonus = selectedAnswer === question.answer ? 10 : 0;
    setClassToApply(classToApply);

    setTimeout(() => {
      setSelectedAnswer(-1);
      setAnswer(false);
      changeQuestion(bonus);
    }, 1000);
  }

  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      {question.options.map((option, index) => (
        <button
          className={selectedAnswer === index ? classToApply : ""}
          onClick={() => checkAnswer(index)}
          dangerouslySetInnerHTML={{ __html: option }}
          key={option}
        ></button>
      ))}
    </div>
  );
}

export default Question;

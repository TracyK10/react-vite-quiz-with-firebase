/* eslint-disable react/prop-types */

function Question({ question }) {
  return (
    <div>
      <h2>{question.question}</h2>
      {
        question.options.map((option) => (
          <button key={option}>{option}</button>
        ))
      }
    </div>
  );
}

export default Question;

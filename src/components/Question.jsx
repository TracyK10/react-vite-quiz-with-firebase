/* eslint-disable react/prop-types */

function Question({ question }) {
  return (
    <div>
      <h2 dangerouslySetInnerHTML={{__html: question.question}}></h2>
      {
        question.options.map((option) => (
          <button dangerouslySetInnerHTML={{__html: option}} key={option}></button>
        ))
      }
    </div>
  );
}

export default Question;

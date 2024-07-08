/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";

function ScoreForm({ score }) {
  const [username, setUsername] = useState("");

  const onUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const saveHighScore = (e) => {
    e.preventDefault();
    const newScore = {
      name: username,
      score,
    };
    console.log(newScore);
  };

  return (
    <div className="container">
      <h1>Score: {score}</h1>
      <form onSubmit={saveHighScore}>
        <input
          value={username}
          type="text"
          name="username"
          id="username"
          placeholder="cool kid"
          onChange={onUserNameChange}
        />
        <button type="submit" className="btn" disabled={!username}>
          Save
        </button>
      </form>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
}

export default ScoreForm;

/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "./Firebase/FirebaseContext";

function ScoreForm({ score, scoreSaved }) {
  const [username, setUsername] = useState("");
  const firebase = useFirebase()



  const onUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const saveHighScore = (e) => {
    e.preventDefault();
    const newScore = {
      name: username,
      score,
    };

    firebase.scores().push(newScore, () => {
      console.log('Score saved!')
      scoreSaved()
    })
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

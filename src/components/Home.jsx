import { Link } from "react-router-dom";
import '../index.css';

function Home() {
  return (
    <div className="container">
      <h1>Quiz App</h1>
        <Link to="/game"><button>Start Game</button></Link>
        <Link to="/highScores"><button>High Scores</button></Link>
    </div>
  )
}

export default Home

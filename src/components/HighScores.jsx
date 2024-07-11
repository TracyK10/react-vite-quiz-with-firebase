import { useEffect, useState } from 'react'
import { useFirebase } from './Firebase/FirebaseContext'

function HighScores() {
  const firebase = useFirebase();
  const [highScores, setHighScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    firebase.scores().once("value", (snapshot) => {
      const data = snapshot.val();
      const sortedData = formatScoreData(data);
      setHighScores(sortedData);
      setLoading(false);
    });
  }, [firebase]);

  const formatScoreData = firebaseScores => {
    const scores = [];

    for (let key in firebaseScores) {
      const val = firebaseScores[key];
      val.key = key;
      scores.push(val);
    }

    const sortedScores = scores
      .sort((score1, score2) => score2.score - score1.score)
      .slice(0, 10);

    return sortedScores;
  
  }
  return (
    <div>
      {loading && <div id='loader'></div>}
      {!loading && 
      <>
      <h1>High Scores</h1>
      <div id="highScoresList">
        {highScores.map((record, key) => (
          <li key={key} className='highscore'>{record.name} - {record.score}</li>
        ))}
      </div>
      </>}
    </div>
  )
}

export default HighScores

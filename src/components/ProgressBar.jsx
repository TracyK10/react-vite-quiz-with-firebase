/* eslint-disable react/prop-types */


function ProgressBar({ max, current}) {
    const width = (current/max) * 100
  return (
    <div id="progress-bar">
      <div id="progressBarFull" style={{width: `${width}%`}}></div>
    </div>
  )
}

export default ProgressBar

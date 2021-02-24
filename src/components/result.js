import React from 'react'
import "../assets/style.css"

function Result({score,playagain}) {
    return (
        <div className="score-board">
        <div className="score">
            Your Score {score} / 5 correct answer 
        </div>
            <button className="playBtn" onClick={playagain}>Play again</button>
        </div>
    )
}

export default Result

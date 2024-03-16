import React from "react";
import "./componentsStyle.css";

function Highscore({ highscores }) {
  console.log(highscores);
  return (
    <div className="highscore-container">
      <h2>Highscores</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {highscores &&
            highscores.map((score, index) => (
              <tr key={index}>
                <td>{score.email}</td>
                <td>{score.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Highscore;

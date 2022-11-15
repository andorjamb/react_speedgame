import React from 'react';
import './GameOver.css';

const GameOver = (props) => {
    return (
        <div className="overlay">
            <div className="gameOver">
                <h2>Game Over</h2>
                <p>Your score was {props.score}</p>
                <button className="close" onClick={props.close}>X</button>
            </div>
        </div>

    );
};

export default GameOver;
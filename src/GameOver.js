import React from 'react';

const GameOver = (props) => {
    return (
        <div>
            <h2>Game Over</h2>
            <p>Your scroe was {props.score}</p>

        </div>
    );
};

export default GameOver;
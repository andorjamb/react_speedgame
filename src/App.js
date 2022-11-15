
import './App.css';
import React, { Component } from 'react';
import Circle from './Circle';
import GameOver from './GameOver';

function getRandom() { return Math.floor(Math.random() * 4) };

class App extends Component {

  state = {
    score: 0,
    active: undefined,
    circles: [1, 2, 3, 4],
    clicked: 0,
    pace: 1000,
    gameOver: false,
    rounds: 0,
  }
  timer;

  clickHandler = (i) => {
    this.setState({ score: this.state.score + 1, });
    if (this.state.active !== i) {
      this.stopGame();
      return;
    }
  }

  stopGame() {
    console.log("game ended.");
    clearTimeout(this.timer);
    window.location.reload();
    /*  this.setState({
       gameOver: !this.state.gameOver
     }) */
  }

  startGame = () => {
    console.log('Game started');
    this.getActive();
  }

  getActive = () => {
    if (this.state.rounds > 3) {
      this.stopGame();
      return;
    }
    let nextActive;
    do { nextActive = getRandom() }
    while (nextActive === this.state.active);

    this.setState({ active: nextActive });
    this.setState({ pace: this.state.pace * 0.95 });
    this.setState({ rounds: 0 });
    this.timer = setTimeout(this.getActive, this.state.pace);
  }

  render() {

    const mapCircles = this.state.circles.map((circle, i) => {
      return (
        <Circle key={i} id={i + 1}
          click={() => { this.clickHandler(i) }}
          active={this.state.active === i}
        />

      )
    });
    return (
      <div className="App" >
        <h1>Speedgame</h1>
        <div className="score-container">
          <p id="scoreDisplay">Your score: {this.state.score}</p></div>
        <div className="circle-container">
          {mapCircles}
        </div>
        {this.state.gameOver && <GameOver close={this.stopGame} score={this.state.score} />}
        <div className="button-container">
          <button id="startButton" onClick={this.startGame}>Start Game</button>
          <button id="stopButton" onClick={this.stopGame}>Stop Game</button>
        </div>
      </div>
    );
  }
}
export default App;

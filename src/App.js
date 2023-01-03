
import './App.css';
import React, { Component } from 'react';
import Circle from './Circle';
import GameOver from './GameOver';

import zap from './audio/zap.mp3';
import endtheme from './audio/endtheme.mp3';
import gameover from './audio/gameOver.mp3';

const clickSound = new Audio(zap);
const music = new Audio(endtheme);
const endGame = new Audio(gameover)

class App extends Component {

  state = {
    score: 0,
    active: undefined,
    circles: [1, 2, 3, 4],
    clicked: 0,
    pace: 1800,
    modal: false,
    gameOn: false,
    misses: 0,

  }
  timer;
  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play()

    } else {
      clickSound.currentTime = 0;
    }
  }

  clickHandler = (i) => {
    if (this.state.gameOn === true) {
      if (this.state.active === i) {
        this.clickPlay();
        this.setState(
          { score: this.state.score + 1 })
        if (this.state.misses > 0) {
          this.setState({ misses: this.state.misses - 1 })
        };
      }
      else if ((this.state.active !== i) && (this.state.misses >= 3)) {
        endGame.play();
        this.stopGame();
        return;
      }
      else if (this.state.active !== i) {
        this.clickPlay();
        this.setState({ misses: this.state.misses + 1 })
      }
    }
  }


  stopGame = () => {
    this.setState({ gameOn: false });
    music.pause();
    clearTimeout(this.timer);
    this.setState({ modal: !this.state.modal, pace: 1800, misses: 0 })

  }

  startGame = () => {
    this.setState({ score: 0 });
    this.setState({ gameOn: true });
    music.play();
    music.loop = true;
    this.getActive();
  }

  getActive = () => {
    if (this.state.misses >= 3) {
      endGame.play();
      this.stopGame();
      return;
    }
    let nextActive;
    do { nextActive = Math.floor(Math.random() * 4) }
    while (nextActive === this.state.active);

    this.setState({ active: nextActive });
    this.setState({ pace: this.state.pace * 0.95 });
    this.setState({ misses: this.state.misses + 1 });
    this.timer = setTimeout(this.getActive, this.state.pace);
  }

  render() {
    const circles = this.state.circles.map((circle, i) => {
      return (
        <div className="circle-container"> <Circle key={i} id={i + 1}
          click={() => this.clickHandler(i)}
          active={this.state.active === i}
        /></div>

      )
    });
    return (
      <div className="App" >
        <h1>Speedgame</h1>
        <div className="score-container">
          <p id="scoreDisplay">Your score: {this.state.score}</p></div>
        <main>  <div className="circle-container">
          {circles}
        </div>
          {this.state.modal && <GameOver close={this.stopGame} score={this.state.score} />}
          <div className="button-container">
            {(this.state.gameOn === false) && <button id="startButton" onClick={this.startGame}>Start Game</button>}
            {this.state.gameOn && <button id="stopButton" onClick={this.stopGame}>Stop Game</button>}
          </div></main>
      </div>
    );
  }
}
export default App;


import './App.css';
import React, { Component } from 'react';
import Circle from './Circle';

class App extends Component {

  state = {
    score: 0,
    circles: [
      { key: 1 },
      { key: 2 },
      { key: 3 },
      { key: 4 },
    ],
  }

  clickHandler = () => {
    this.setState({ score: this.state.score + 1 })
    console.log(this.state.score);

  }

  render() {
    const circles =
      this.state.circles.map((circle) => {
        return (
          <div>
            <Circle key={circle.key}
              click={this.clickHandler}
            />
          </div>
        )
      }
      )

    return (
      <div className="App">
        <h1>Speedgame</h1>
        <div className="score-container">
          <p id="scoreDisplay">Your score: {this.state.score}</p></div>
        <div className="circle-container">
          {circles}
        </div>
        <div className="button-container">
          <button id="startButton">Start Game</button>
          <button id="stopButton">Stop Game</button>
        </div>
      </div>
    );
  }

}

export default App;

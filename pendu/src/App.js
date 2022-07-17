import React, { Component } from 'react'
import './App.css';

import Button, { LETTERS } from './Button.js' 
import Card from './Card'

const randomWords = require('random-words');
const VISUAL_PAUSE_MSECS = 750

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      secretWord: this.generateWord(),
      mistakes: 0,
      guessed: [],
      pressed: [],
      currentGuess: null
    }
  }
 
  getFeedbackForButton(letter) {
    const { currentGuess, secretWord } = this.state;
    if(currentGuess === null || currentGuess !== letter)
      return this.state.pressed.includes(letter) ? 'pressed' : 'unpressed'

    if(secretWord.includes(letter)) {
      return 'justMatched';
    } else {
      return 'justMismatched';
    }
  }

  generateWord() {
    const word = randomWords().toUpperCase();
    //console.log(word)
    return word.split('');
  }

  // Arrow fx for binding
  handleButtonClick = letter => {
    const { secretWord, guessed, mistakes, pressed } = this.state;
    if(pressed.includes(letter))
      return false;
    let newGuessed = [...guessed], newMistakes = mistakes
    if(secretWord.includes(letter)) {
      for(let caracter of secretWord)
        if(caracter === letter)
          newGuessed.push(letter)
    } else {
      newMistakes = mistakes + 1
    }
    this.setState({
      pressed: [...pressed, letter],
      guessed: newGuessed,
      currentGuess: letter,
      mistakes: newMistakes
    });
    setTimeout(() => {
      this.setState({currentGuess: null})
    }, VISUAL_PAUSE_MSECS)
  }

  getFeedbackForCard(letter) {
    if(this.state.currentGuess === letter)
      return 'justGuessed'
    return this.state.guessed.includes(letter) ? 'visible' : 'hidden';
  }

  // Arrow fx for binding
  handleReplay = () => {
    this.setState({
      secretWord: this.generateWord(),
      mistakes: 0,
      guessed: [],
      pressed: [],
      currentGuess: null
    })
  }

  render() {
    const { secretWord, mistakes, guessed } = this.state
    const won = secretWord.length === guessed.length
    return (
      <div className="pendu">
        <h3 className="mistakes">Mistakes: <span className="number">{mistakes}</span></h3>
        <div className="cards">
          { secretWord.map((letter, index) => (
            <Card letter={letter} key={index} feedback={this.getFeedbackForCard(letter)} />
          )) }
        </div>
        <div className={`buttons ${won ? 'hidden' : ''}`}>
          {LETTERS.map((letter) => (
            <Button 
              letter={letter} 
              feedback={this.getFeedbackForButton(letter)} 
              key={letter} 
              onClick={this.handleButtonClick} 
            />
          ))}
        </div>
        <div style={{display: `${won === false ? 'none' : 'block'}`}}>
          <h1>
            Congratulations! You have won with a total of {mistakes} mistakes
          </h1>
          <button className="replay" onClick={this.handleReplay}>
            <img src="./refresh-icon.png" alt="refresh" className="refresh" />
            <h3>Replay</h3>
          </button>
        </div>
      </div>
    )
  }
}

export default App;

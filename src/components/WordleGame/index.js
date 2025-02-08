import {Component} from 'react'
import './index.css'

const fiveLetterWords = [
  'react',
  'paper',
  'books',
  'ponds',
  'apple',
  'about',
  'above',
  'abuse',
  'await',
  'awake',
  'award',
  'aware',
]
const targetWord =
  fiveLetterWords[Math.ceil(Math.random() * fiveLetterWords.length)]-1
console.log(targetWord)
class WordleGame extends Component {
  state = {
    word: targetWord,
    guesses: [],
    currentGuess: '',
    maxAttempts: 6,
    gameOver: false,
    message: '',
  }

  handleInputChange = event => {
    const value = event.target.value.toLowerCase()
    if (value.length <= 5) {
      this.setState({currentGuess: value})
    }
  }

  handleSubmit = () => {
    const {currentGuess, guesses, maxAttempts, word} = this.state
    if (currentGuess.length !== 5 || guesses.length >= maxAttempts) return

    const newGuesses = [...guesses, currentGuess]

    let message = ''
    let gameOver = false

    if (currentGuess === word) {
      message = 'You guessed the word!'
      gameOver = true
    } else if (newGuesses.length >= maxAttempts) {
      message = `Game Over! The word is ${word}`
      gameOver = true
    }

    this.setState({
      guesses: newGuesses,
      currentGuess: '',
      gameOver,
      message,
    })
  }

  renderGuessRow(guess) {
    const {word} = this.state
    return (
      <div className="words-direction">
        {guess.split('').map((char, i) => {
          let bgColor = 'gray-color'

          if (word[i] === char) {
            bgColor = 'green-color'
          } else if (word.includes(char)) {
            bgColor = 'yellow-color'
          }

          return <div className={`word ${bgColor} `}>{char}</div>
        })}
      </div>
    )
  }

  render() {
    const {guesses, currentGuess, maxAttempts, gameOver, message} = this.state

    return (
      <div className="background-container">
        <h1 className="heading">WORDLE GAME</h1>

        <div className="space-y-2">
          {guesses.map(guess => (
            <div>{this.renderGuessRow(guess)}</div>
          ))}
        </div>

        {!gameOver && guesses.length < maxAttempts && (
          <div className="mt-4">
            <input
              type="text"
              value={currentGuess}
              onChange={this.handleInputChange}
              maxLength={5}
              className="input-value"
            />
            <br />
            <button
              type="button"
              onClick={this.handleSubmit}
              className="button-styling"
            >
              Submit
            </button>
          </div>
        )}

        {message && <p className="message-style">{message}</p>}
      </div>
    )
  }
}

export default WordleGame

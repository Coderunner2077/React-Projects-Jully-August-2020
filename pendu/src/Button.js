import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

export const LETTERS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

const Button = ({ letter, feedback, onClick }) => (
    <button className={`button ${feedback}`} onClick={() => onClick(letter)}>
        <span className='letter'>
            {letter}
        </span>
    </button>
)

Button.propTypes = {
    letter: PropTypes.oneOf(LETTERS).isRequired,
    feedback: PropTypes.oneOf([
        'unpressed',
        'pressed',
        'justMatched',
        'justMismatched'
    ]).isRequired,
    onClick: PropTypes.func.isRequired
}

export default Button


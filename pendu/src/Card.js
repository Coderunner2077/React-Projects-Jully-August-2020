import React from 'react'
import PropTypes from 'prop-types'
import { LETTERS } from './Button.js'

import './Card.css'

const HIDDEN_SYMBOL = '❓';

const Card = ({ letter, feedback }) => (
    <div className={`card ${feedback}`}>
        <span className="symbol">
            {feedback === 'hidden' ? HIDDEN_SYMBOL : letter}
        </span>
    </div>
)

Card.propTypes = {
    letter: PropTypes.oneOf(LETTERS).isRequired,
    feedback: PropTypes.oneOf([
        'hidden',
        'visible',
        'justGuessed'
    ]).isRequired
}

export default Card



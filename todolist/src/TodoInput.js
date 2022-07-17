import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { saveTodoEntry, editEntry, getTodo } from './Todo'

import './TodoInput.css'

class TodoInput extends Component {
    _input: ?HTMLInputElement;

    constructor(props) {
        super(props)

        this.state = {
            task: '',
            edited: 0
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log('state edited : ' + state.edited)
        if(props.edited >= 0 && state.edited >= 0) 
            return {
                task: getTodo(props.edited)
            }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        this._input.focus()
    }

    // Arrow fx for binding
    persistTask = event => {
        event.preventDefault()
        const value = this.state.task;
        if(value.match(/\w/)) {
            if(this.props.edited < 0)
                saveTodoEntry(this.state.task, this.props.onStored)
            else
                editEntry(this.props.edited, this.state.task, this.props.onStored)
            this.setState({ task: '', edited: 0})
        }
    }

    // Arrow fx for binding
    handleChange = event => {
        console.log('handleChange : ' + event.target.value);
        this.setState({ task: event.target.value, edited: -1})
    }

    render() {
        return (
            <form className="todoForm" onSubmit={this.persistTask}>
                <label htmlFor="id">Que dois-je faire ?</label>
                <input 
                    autoComplete="task"
                    id="task"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.task}
                    autoFocus={true}
                    ref={c => (this._input = c)}
                />
                <button type="submit">{this.props.edited >= 0 ? 'Modifier' : 'Valider'}</button>
            </form>
        )
    }


}

TodoInput.propTypes = {
    edited: PropTypes.number,
    onStored: PropTypes.func.isRequired
}

export default TodoInput
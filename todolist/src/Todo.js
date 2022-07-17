import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Todo.css'

//const Todo = ({ task, index, length, onRemove, onMoveDown, onMoveUp, onEdit, edited }) => (
class Todo extends Component {
    render() {
        const { task, index, length, onRemove, onMoveDown, onMoveUp, onEdit, edited } = this.props;
        return (
            <li>
                <button className="button" onClick={() => onRemove(index)}>
                    <img src="cross.png" alt="remove" className="cross" />
                </button>
                {index > 0 ? (
                    <button className="button" onClick={() => onMoveUp(index)}>
                       <img src="up.png" alt="up" className="up-down" />
                    </button>
                ) : ''}
                {index < (length - 1) ? (
                    <button className="button" onClick={() => onMoveDown(index)}>
                        <img src="down.png" alt="down" className="up-down" />
                    </button>
                ) : ''}
                { task }
                {edited === false ? (
                    <button className="button" onClick={() => onEdit(index)}>
                        <img src="edit.png" alt="edit" className="edit" />
                    </button>
                ) : ''}
            </li>
        )
    }
   
}

Todo.propTypes = {
    task: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    edited: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
    onMoveDown: PropTypes.func.isRequired,
    onMoveUp: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}

Todo.defaultTypes = {
    edited: false
}

export default Todo

const TODOS_KEY = '::Todolist::Todo'

export function saveTodoEntry(entry, onStored) {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
    todos.push(entry);
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    onStored(todos);
}

export function loadTodoEntries() {
    //localStorage.setItem(TODOS_KEY, JSON.stringify([]));
    return JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
}

export function removeEntry(todoIndex) {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
    
    if(typeof(todos[todoIndex]) !== undefined) {
        todos.splice(todoIndex, 1)
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    }
    return todos;
}

export function editEntry(todoIndex, task, onStored) {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
    if(typeof(todos[todoIndex]) !== undefined) {
        todos[todoIndex] = task;
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
        onStored(todos);
        return todos;
    }
    return false;
}

export function moveUp(todoIndex) {
    if(todoIndex < 1)
        return false;
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) ||'[]');
    if(typeof(todos) !== undefined) {
        [todos[todoIndex - 1], todos[todoIndex]] = [todos[todoIndex], todos[todoIndex - 1]];
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
        return todos;
    }
    return false;
   
}

export function moveDown(todoIndex) {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
    if(todoIndex > (todos.length - 1))
        return false;
        
    if(typeof(todos[todoIndex]) !== undefined) {
        [todos[todoIndex], todos[todoIndex + 1]] = [todos[todoIndex + 1], todos[todoIndex]];
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
        return todos;
    }
    return false;
}

export function getTodo(todoIndex) {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
    return typeof(todos[todoIndex]) === undefined ? '' : todos[todoIndex];
        
}
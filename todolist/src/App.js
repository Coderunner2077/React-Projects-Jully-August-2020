import React, { Component } from 'react';
import Todo, { loadTodoEntries, removeEntry, moveUp, moveDown, editEntry } from './Todo'
import TodoInput from './TodoInput'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: this.loadTodos(),
      edited: -1, 
      length: this.loadTodos().length
    }
  }

  loadTodos() {
    return loadTodoEntries()
  }

  // Arrow fx for binding
  handleRemoveClick = index => {
    const todos = removeEntry(index)
    this.setState({ todos: todos, length: todos.length })
  }

  // Arrow fx for binding
  displayTodos = todos => {
    this.setState({todos: todos, edited: -1, length: todos.length})
  }

  // Arrow fx for binding
  handleMoveUpClick = index => {
    const todos = moveUp(index);
    if(todos !== false)
      this.setState({ todos })
  }

  handleMoveDownClick = index => {
    const todos = moveDown(index)
    if(todos !== false) 
      this.setState({ todos })
  }

  handleEditClick = (index, task) => {
    this.setState({ edited: index, task: task });
  }

  render() {
    const { todos, edited, length } = this.state;
    return (
      <div className="todolist">
        <h2>Ma todolist</h2>
        <ul className="taskList">
          { todos.map((task, index) => (
            <Todo 
              task={task} 
              key={index} 
              index={index} 
              length={length}
              edited={edited === index}
              onRemove={this.handleRemoveClick}
              onMoveUp={this.handleMoveUpClick}
              onMoveDown={this.handleMoveDownClick}
              onEdit={this.handleEditClick}
            />
          ))}
        </ul>   
        <TodoInput edited={this.state.edited} onStored={this.displayTodos} />
      </div>
    );
  } 
}

export default App;

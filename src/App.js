import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    newTodoName: '',
    todos: [],
  }

  changeTodoName = evt => {
    this.setState({newTodoName: evt.target.value});
  }

  addTodo = name => {
    const todoIsNew = this.state.todos.indexOf(name) === -1;
    if (todoIsNew) {
      const newTodos = this.state.todos.concat([name]);
      this.setState({
        newTodoName: '',
        todos: newTodos,
      });
    }
  }

  removeTodo = name => {
    const newTodos = this.state.todos.filter(todo => todo !== name);
    this.setState({todos: newTodos});
  }

  render() {
    return (
      <div>
        <TodoInput newTodoName={this.state.newTodoName}
                   changeTodoNameFunc={this.changeTodoName}
                   addTodoFunc={this.addTodo} />
        <TodoList todos={this.state.todos}
                  removeTodoFunc={this.removeTodo} />
      </div>
    );
  }
}

export default App;


class TodoInput extends Component {
  handleClickAdd = () => {
    this.props.addTodoFunc(this.props.newTodoName);
  }

  render() {
    return (
      <div>
        <input value={this.props.newTodoName}
               onChange={this.props.changeTodoNameFunc} />
        <button onClick={this.handleClickAdd}> Add </button>
      </div>
    )
  }
}


class TodoList extends Component {
  render() {
    const todoList = this.props.todos.map((todo, idx) => {
      return <TodoItem name={todo}
                       removeTodoFunc={this.props.removeTodoFunc}
                       key={idx} />
    });
    return (
      <div>
        {todoList}
      </div>
    )
  }
}


class TodoItem extends Component {
  handleClickRemove = () => {
    this.props.removeTodoFunc(this.props.name);
  }

  render() {
    return (
      <div>
        {this.props.name}
        <button onClick={this.handleClickRemove}> X </button>
      </div>
    )
  }
}

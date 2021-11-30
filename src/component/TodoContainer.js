/* eslint-disable */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(response => response.json())
      .then(data => this.setState({ todos: data }));
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }

  componentDidMount() {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      })
    }
  }

  handleChange = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo, completed: !todo.completed,
          };
        }
        return todo;
      }),
    }));
  };

  delTodo = (id) => {
    this.setState({
      todos: [
        ...this.state.todos.filter((todo) => todo.id !== id),
      ],
    });
  };

  addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle
        }
        return todo
      }),
    })
  }

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodosList
            todos={this.state.todos}
            handleChangeProps={this.handleChange}
            deleteTodoProps={this.delTodo}
            setUpdate={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}

InputTodo.propTypes = {
  addTodoProps: PropTypes.func.isRequired,
};

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
};

export default TodoContainer;
/* eslint-disable */
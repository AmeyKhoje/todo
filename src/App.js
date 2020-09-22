import React, { Fragment } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <Fragment>
      <h1 className="todo-head">Todo App</h1>
      <AddTodo />
    </Fragment>
  );
}

export default App;
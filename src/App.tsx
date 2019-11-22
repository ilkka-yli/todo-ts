import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Todo from './presentational/Todo';
import { TodoModel } from './Model/Todo';
import { fetchTodos, deleteTodo, updateTodo, addTodo } from './Actions/todo_actions';
import EditTodo from './presentational/EditTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [editing, setEditing] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef('')

  const initFetch = () => {
    setError(null);
    setLoading(true);
  }

  const finishFetch = (msg: string) => {
    setError(msg);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchTodos().then((response: TodoModel[]) => {
      setTodos(response);
      setLoading(false);
    }).catch(err => {
      finishFetch(err.message);
    });
  }, []);
  
  const updateTodoText = (i: number, text: string) => {
    initFetch();
    const todo = { ...todos[i], text: text };
    updateTodo(todo.id, todo).then(() => {
      const newTodos = [...todos];
      newTodos[i] = todo;
      setTodos(newTodos);
      setEditing(-1);
      setLoading(false);
    }).catch(err => {
      finishFetch(err.message);
    });
  }

  const completeTodo = (i: number) => {
    initFetch();
    const todo = { ...todos[i], completed: !todos[i].completed };
    updateTodo(todo.id, todo).then(() => {
      const newTodos = [...todos];
      newTodos[i] = todo;
      setTodos(newTodos);
      setLoading(false);
    }).catch(err => {
      finishFetch(err.message);
    });
  }

  const removeTodo = (i: number) => {
    initFetch();
    deleteTodo(todos[i].id).then(() => {
      const newTodos = [...todos];
      newTodos.splice(i, 1);
      setTodos(newTodos);
      setLoading(false);
    }).catch(err => {
      finishFetch(err.message);
    });
  }

  const addNewTodo = (text: string) => {
    initFetch();
    ref.current = text;
    addTodo(text).then((response) => {
      const newTodos = [...todos];
      // response.id is always 1000 because of free account in mockable.io
      newTodos.push({ id: Math.round(Math.random() * response.id), text, completed: false });
      setTodos(newTodos);
      ref.current = '';
      setLoading(false);
    }).catch(err => {
      finishFetch(err.message);
    });
  }

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, i) =>
          <Todo
            key={i}
            todo={todo}
            index={i}
            setEditing={setEditing}
            complete={completeTodo}
            remove={removeTodo}
            save={updateTodoText}
            editMode={editing === i} 
            loading={loading} />)}
          <EditTodo text={ref.current} save={text => addNewTodo(text)} loading={loading} />
      </div>
      {loading && <div className="status-text"><FontAwesomeIcon icon={faSpinner} pulse className="status-text" size="2x" /></div>}
      {error && <p className="status-text">{error}</p>}
    </div>
  );
}

export default App;

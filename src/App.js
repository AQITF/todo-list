import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("Todo-List"))
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("Todo-List", JSON.stringify(todos))
  }, [todos])

  function addTodo(text) {
    setTodos([...todos, text])
  }

  function removeTodo(index) {
    setTodos(todos.filter((_, id) => id !== index))
  }

  function editTodo(index, text) {
    const newTodos = [...todos]
    newTodos[index] = text
    setTodos(newTodos)
  }

  function handleSubmit(event) {
    // Prevent handle in a default manner
    event.preventDefault()
    // Add the input text into todos
    addTodo(event.target.elements.todo.value)
    // Clear the input value
    event.target.elements.todo.value = ''
  }

  return (
    <div className = "App">
      <h1>Todo List</h1>
      <form onSubmit = {handleSubmit}>
        <input type = 'text' name = 'todo'></input>
        <button type = 'submit'>Add Todo</button>
      </form>
      <ul>
        {
          todos.map((todo, index) => (
            <>
              <li key={index}>
                <input type = 'text' value = {todo} 
                onChange = {(event) => {editTodo(index, event.target.value)}}></input>
              <button onClick = {() => {removeTodo(index)}}>Delete</button>
              </li>
            </>
          )
          )
        }
      </ul>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { Todo } from "./types/Todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodosInput] = useState<string>("");

  const handleTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoInput.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: todoInput,
      completed: false,
    };

    setTodos((todo) => [...todo, newTodo]);
    setTodosInput("");
  };

  const handleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <form onSubmit={handleTodo}>
        <input
          type="text"
          placeholder="Enter your Todo here."
          value={todoInput}
          onChange={(e) => setTodosInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <section className="todos">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span>{todo.text}</span>
            <div>
              <button onClick={() => handleCompleted(todo.id)}>
                {todo.completed ? "Mark as Pending" : "Mark as Completed"}
              </button>

              <button className="delete" onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </section>
    </div>
  );
}

export default App;

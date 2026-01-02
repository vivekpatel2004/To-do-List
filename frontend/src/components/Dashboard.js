import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Todo.css";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await api.post("/todos", { title });
    setTitle("");
    loadTodos();
  };

  const toggleTodo = async (t) => {
    await api.put(`/todos/${t.id}`, {
      title: t.title,
      completed: !t.completed,
    });
    loadTodos();
  };

  const deleteTodo = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/todos/${id}`);
    loadTodos();
  };

  const startEdit = (t) => {
    setEditId(t.id);
    setEditTitle(t.title);
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;
    await api.put(`/todos/${id}`, {
      title: editTitle,
      completed: false,
    });
    setEditId(null);
    setEditTitle("");
    loadTodos();
  };

  const filteredTodos = todos
    .filter((t) =>
      filter === "all"
        ? true
        : filter === "done"
        ? t.completed
        : !t.completed
    )
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="app-wrapper">
      <div className="dashboard">

        {/* HEADER */}
        <div className="dash-header">
          <h2>Dashboard</h2>
          <p>Manage your daily tasks</p>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="stat-card">
            <h3>{todos.length}</h3>
            <span>Total</span>
          </div>
          <div className="stat-card">
            <h3>{todos.filter(t => t.completed).length}</h3>
            <span>Completed</span>
          </div>
          <div className="stat-card">
            <h3>{todos.filter(t => !t.completed).length}</h3>
            <span>Pending</span>
          </div>
        </div>

        {/* SEARCH */}
        <input
          className="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ADD TASK */}
        <div className="add-task">
          <input
            className="task-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        </div>

        {/* FILTERS */}
        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "done" ? "active" : ""}
            onClick={() => setFilter("done")}
          >
            Completed
          </button>
          <button
            className={filter === "todo" ? "active" : ""}
            onClick={() => setFilter("todo")}
          >
            Pending
          </button>
        </div>

        {/* TASK LIST */}
        <div className="task-list">
          {filteredTodos.length === 0 && (
            <p className="empty">No tasks found</p>
          )}

          {filteredTodos.map((t) => (
            <div
              key={t.id}
              className={`task-item ${t.completed ? "done" : ""}`}
            >
              {/* LEFT */}
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTodo(t)}
                />

                {editId === t.id ? (
                  <input
                    className="edit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={() => saveEdit(t.id)}
                    autoFocus
                  />
                ) : (
                  <span
                    className="task-title"
                    onDoubleClick={() => startEdit(t)}
                  >
                    {t.title}
                  </span>
                )}
              </div>

              {/* RIGHT */}
              <div className="task-actions">
                <button
                  className="edit-btn"
                  onClick={() => startEdit(t)}
                >
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(t.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";
import API from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch All Tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Task
  const addTask = async () => {
    if (!title) {
      alert("Please enter task");
      return;
    }

    try {
      await API.post("/", {
        title,
      });

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Update Status
  const updateStatus = async (id) => {
    try {
      await API.patch(`/${id}/status`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>To-Do List App</h1>

      {/* Add Task Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="empty">
          No Tasks Available
        </p>
      ) : (
        tasks.map((task) => (
          <div
            className={`task ${
              task.status === "completed"
                ? "completed"
                : ""
            }`}
            key={task._id}
          >
            <h3>{task.title}</h3>

            <p>
              Status:
              <strong>
                {" "}
                {task.status}
              </strong>
            </p>

            <div className="btn-group">
              <button
                onClick={() =>
                  updateStatus(task._id)
                }
              >
                Toggle Status
              </button>

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
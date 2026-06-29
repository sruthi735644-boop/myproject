import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddTask.css"
function AddTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");

      if (!token) {
        alert("Login required");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        "http://127.0.0.1:8000/api/tasks/",
        {
          title: task.title,
          description: task.description,
          status: task.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);
      alert("Task Added Successfully");

      setTask({
        title: "",
        description: "",
        status: "pending",
      });

      navigate("/dashboard");

    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to add task");
    }
  };

  return (
  <div className="addtask-container">
    <h2>Add Task</h2>

    <form onSubmit={handleAddTask}>
      <input
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />

      <select name="status" value={task.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  </div>
);
}

export default AddTask;
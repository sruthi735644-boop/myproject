import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTask.css"
function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  // GET single task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await axios.get(
          `http://127.0.0.1:8000/api/tasks/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const foundTask = res.data.find((t) => t.id === parseInt(id));
        setTask(foundTask);

      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, [id]);

  // handle input
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // UPDATE task
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("access");

      await axios.put(
        `http://127.0.0.1:8000/api/tasks/${id}/`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Updated Successfully");
      navigate("/dashboard");

    } catch (error) {
      console.log(error.response?.data);
      alert("Update failed");
    }
  };
return (
  <div className="edit-container">
    <h2>Edit Task</h2>

    <input
      name="title"
      value={task.title}
      onChange={handleChange}
      placeholder="Title"
    />

    <textarea
      name="description"
      value={task.description}
      onChange={handleChange}
      placeholder="Description"
    />

    <select name="status" value={task.status} onChange={handleChange}>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>

    <button onClick={handleUpdate}>Update Task</button>
  </div>
);
}

export default EditTask;
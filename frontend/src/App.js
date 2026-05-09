import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  // Form State
  const [form, setForm] = useState({
    name: "",
    activity: "",
    hours: ""
  });

  // Activities State
  const [activities, setActivities] = useState([]);

  // Summary State
  const [summary, setSummary] = useState({
    total_entries: 0,
    total_hours: 0,
    most_active_user: ""
  });

  // Fetch Activities
  const fetchActivities = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/activities/"
      );

      setActivities(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Summary
  const fetchSummary = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/summary/"
      );

      setSummary(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Load Data
  useEffect(() => {

    fetchActivities();
    fetchSummary();

  }, []);

  // Handle Input Change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/activities/",
        form
      );

      // Clear Form
      setForm({
        name: "",
        activity: "",
        hours: ""
      });

      // Reload Data
      fetchActivities();
      fetchSummary();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Student Activity Tracker</h1>

      {/* Form */}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="activity"
          placeholder="Activity"
          value={form.activity}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="hours"
          placeholder="Hours"
          value={form.hours}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Activity
        </button>

      </form>

      <hr />

      {/* Activities Table */}

      <h2>Activities</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Activity</th>
            <th>Hours</th>
          </tr>
        </thead>

        <tbody>

          {activities.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.name}</td>

              <td>{item.activity}</td>

              <td>{item.hours}</td>

            </tr>
          ))}

        </tbody>

      </table>

      <hr />

      {/* Summary */}

      <h2>Summary</h2>

      <p>
        Total Entries: {summary.total_entries}
      </p>

      <p>
        Total Hours: {summary.total_hours}
      </p>

      <p>
        Most Active User: {summary.most_active_user}
      </p>

    </div>
  );
}

export default App;

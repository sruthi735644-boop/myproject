
import Navbar from "../components/Navbar"
import { useNavigate,Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const deleteTask = async (id) => {
  try {
    const token = localStorage.getItem("access");

    await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // update UI after delete
    setTasks(tasks.filter((task) => task.id !== id));

  } catch (error) {
    console.log(error.response?.data);
    alert("Delete failed");
  }
};
  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  fetchTasks();
}, []);
  return (
    
    <div>

      <Navbar/>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <div className="page-heading">
            <div className="page-heading-copy">
              <span className="page-icon"><i className="bi bi-speedometer2" aria-hidden="true"></i></span>
              <div>
                <p className="eyebrow mb-1">Overview</p>
                <h1 className="h3 mb-1">Dashboard</h1>
               Manage your tasks, track progress, and stay organized in one place.
              </div>
            </div>
  <div className="heading-actions">


      <button
        className="btn btn-primary btn-lg"
        type="button"
        onClick={() => navigate("/addtask")}
      >
        <i className="bi bi-file-earmark-plus"></i> Create Tasks
      </button>
    </div>          </div>

          <section className="row g-3 mt-1" aria-label="Dashboard metrics">
            <div className="col-12 col-sm-6 col-xl-3">
<article className="metric-card metric-primary">
  <div className="metric-top">
    <span className="metric-label">Total Tasks</span>
    <span className="metric-icon"><i className="bi bi-list-task"></i></span>
  </div>
  <div className="metric-value">{tasks.length}</div>
  <div className="metric-meta">
    <span>All created tasks</span>
  </div>
</article>
            </div>
               <div className="col-12 col-sm-6 col-xl-3">
             <article className="metric-card metric-warning">
  <div className="metric-top">
    <span className="metric-label">Pending</span>
    <span className="metric-icon"><i className="bi bi-hourglass-split"></i></span>
  </div>
  <div className="metric-value">
    {tasks.filter(t => t.status === "pending").length}
  </div>
  <div className="metric-meta">
    <span>Need to complete</span>
  </div>
</article>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-success">
  <div className="metric-top">
    <span className="metric-label">Completed</span>
    <span className="metric-icon"><i className="bi bi-check-circle"></i></span>
  </div>
  <div className="metric-value">
    {tasks.filter(t => t.status === "completed").length}
  </div>
  <div className="metric-meta">
    <span>Finished tasks</span>
  </div>
</article>
            </div>

           
          </section>

          {/* <section className="row g-3 mt-1">
            <div className="col-12 col-xl-8">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h2 className="h5 mb-1 section-title"><i className="bi bi-graph-up-arrow" aria-hidden="true"></i><span>Sales Performance</span></h2>
                    <p className="text-muted mb-0">Monthly revenue compared with operational targets.</p>
                  </div>
                  <a className="btn btn-light btn-sm" href="charts.html">View Details</a>
                </div>

                <div className="chart-bars" aria-label="Sales performance chart">
                  <div className="chart-column bar-42"><span></span><small>Jan</small></div>
                  <div className="chart-column bar-58"><span></span><small>Feb</small></div>
                  <div className="chart-column bar-51"><span></span><small>Mar</small></div>
                  <div className="chart-column bar-72"><span></span><small>Apr</small></div>
                  <div className="chart-column bar-66"><span></span><small>May</small></div>
                  <div className="chart-column bar-83"><span></span><small>Jun</small></div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-4">
              <div className="panel h-100">
                <div className="panel-header">
                  <div>
                    <h2 className="h5 mb-1 section-title"><i className="bi bi-activity" aria-hidden="true"></i><span>Team Activity</span></h2>
                    <p className="text-muted mb-0">Recent operational updates.</p>
                  </div>
                </div>

                <div className="activity-list">
                  <div className="activity-item"><span className="activity-dot bg-primary"></span><div><p className="mb-1 fw-semibold">New campaign launched</p><p className="text-muted small mb-0">Marketing team published the May offer.</p></div></div>
                  <div className="activity-item"><span className="activity-dot bg-success"></span><div><p className="mb-1 fw-semibold">Payment batch cleared</p><p className="text-muted small mb-0">246 invoices were processed successfully.</p></div></div>
                  <div className="activity-item"><span className="activity-dot bg-warning"></span><div><p className="mb-1 fw-semibold">Support queue rising</p><p className="text-muted small mb-0">Average first response time is 18 minutes.</p></div></div>
                </div>
              </div>
            </div>
          </section> */}

          <section className="panel mt-3">
            <div className="panel-header">
              
            </div>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead><tr><th scope="col">Title</th><th scope="col">Description</th><th scope="col"></th><th scope="col">Status</th><th scope="col">Joined</th><th scope="col" className="text-end"></th><th scope="col"></th></tr></thead>
              <tbody>


  {tasks.map((task) => (
    <tr key={task.id}>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td></td>
      <td>
        <span className="badge text-bg-success">
          {task.status}
        </span>
      </td>
      <td>{task.created_at}</td>
   
<td>
  <Link to={`/edit/${task.id}`}>Edit</Link>
</td>

      <td>
  <button onClick={() => deleteTask(task.id)}>
    Delete
  </button>
</td>
    </tr>
  ))}
                  {/* <tr>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-2.jpg" alt="Rafi Khan"/>
                        <div>
                          <p className="fw-semibold mb-0">Rafi Khan</p>
                          <p className="text-muted small mb-0">rafi@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td>Manager</td>
                    <td>Sales</td>
                    <td><span className="badge text-bg-success">Active</span></td>
                    <td>Feb 03, 2026</td>
                    <td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-3.jpg" alt="Nadia Islam"/>
                        <div>
                          <p className="fw-semibold mb-0">Nadia Islam</p>
                          <p className="text-muted small mb-0">nadia@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td>Editor</td>
                    <td>Content</td>
                    <td><span className="badge text-bg-warning">Pending</span></td>
                    <td>Mar 18, 2026</td>
                    <td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-4.jpg" alt="Mina Torres"/>
                        <div>
                          <p className="fw-semibold mb-0">Mina Torres</p>
                          <p className="text-muted small mb-0">mina@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td>Viewer</td>
                    <td>Finance</td>
                    <td><span className="badge text-bg-secondary">Suspended</span></td>
                    <td>Apr 07, 2026</td>
                    <td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-5.jpg" alt="Jon Oliver"/>
                        <div>
                          <p className="fw-semibold mb-0">Jon Oliver</p>
                          <p className="text-muted small mb-0">jon@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td>Analyst</td>
                    <td>Data</td>
                    <td><span className="badge text-bg-success">Active</span></td>
                    <td>Apr 22, 2026</td>
                    <td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>



    </div>
  )
}

export default Dashboard
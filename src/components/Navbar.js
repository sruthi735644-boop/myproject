import { useNavigate,Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  alert("Logged out successfully");

  navigate("/");
};
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Task Manager
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
   <li> <button onClick={handleLogout} className="btn btn-danger btn-sm">
      Logout
    </button>
    </li>
  
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
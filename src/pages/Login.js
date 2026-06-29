import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css"
function Login() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        user
      );

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      alert("Login Successful!");

      // Redirect to dashboard
      window.location.href = "/dashboard";

    } catch (error) {
      alert("Invalid Username or Password");
      console.log(error);
      
    }
  };

return (
  <div className="login-container">
    <h2>Login</h2>

    <form onSubmit={loginUser}>
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) =>
          setUser({ ...user, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
      />

      <button type="submit">Login</button>

      <p>
        Don't have an account?{" "}
        <Link to="/register">Sign Up</Link>
      </p>
    </form>
  </div>
);
}

export default Login;
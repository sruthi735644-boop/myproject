import { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const register = async () => {

    await axios.post(
      "http://127.0.0.1:8000/api/register/",
      user
    );

    alert("Registered Successfully");
  };

 return (
  <div className="register-container">
    <h2>Register</h2>

    <input
      type="text"
      placeholder="Username"
      onChange={(e) =>
        setUser({ ...user, username: e.target.value })
      }
    />

    <input
      type="email"
      placeholder="Email"
      onChange={(e) =>
        setUser({ ...user, email: e.target.value })
      }
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) =>
        setUser({ ...user, password: e.target.value })
      }
    />

    <button onClick={register}>Register</button>

    <p>
      Already have an account?{" "}
      <Link to="/">Login</Link>
    </p>
  </div>
);
}

export default Register;
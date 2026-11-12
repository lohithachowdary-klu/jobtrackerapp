import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setMessage("Please enter username and password");
      return;
    }

    // Navigate to available jobs
    setMessage("");

    navigate("/jobs");
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Job Tracker</h1>

        <p className="subtitle">
          Track your job applications in one place
        </p>

        <form onSubmit={handleLogin}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          {message && (
            <div className="login-message error">
              {message}
            </div>
          )}

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

        <div className="signup-link">
          Don't have an account?

          <Link to="/signup">
            Sign Up
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Login;

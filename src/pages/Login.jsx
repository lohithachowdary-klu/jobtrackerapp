import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    if (!username || !password) {
      setMessage("Please enter username and password.");
      setMessageType("error");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) =>
        user.username.toLowerCase() ===
        username.toLowerCase()
    );

    if (!existingUser) {
      setMessage("Account not found. Please sign up first.");
      setMessageType("error");
      return;
    }

    if (existingUser.password !== password) {
      setMessage("Incorrect password. Please try again.");
      setMessageType("error");
      return;
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(existingUser)
    );

    navigate("/jobs");
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Job Tracker</h1>

        <p className="subtitle">
          Login to manage your job applications
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
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          {message && (
            <div className={`login-message ${messageType}`}>
              {message}
            </div>
          )}

          <button
            className="login-button"
            type="submit"
          >
            Login
          </button>

        </form>

        <div className="signup-link">

          <span>
            Don't have an account?
          </span>

          <button
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;
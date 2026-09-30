import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSignup = (e) => {

    e.preventDefault();

    setMessage("");

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill all the fields.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must contain at least 6 characters."
      );
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const usernameExists = users.some(
      (user) =>
        user.username.toLowerCase() ===
        username.toLowerCase()
    );

    if (usernameExists) {
      setMessage(
        "Username already exists. Please choose another username."
      );
      setMessageType("error");
      return;
    }

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (emailExists) {
      setMessage(
        "Email already exists. Please use another email."
      );
      setMessageType("error");
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    setMessage(
      "Account created successfully! You can now login."
    );

    setMessageType("success");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1>Create Account</h1>

        <p className="subtitle">
          Create your Job Tracker account
        </p>

        <form onSubmit={handleSignup}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Create username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          {message && (
            <div
              className={`login-message ${messageType}`}
            >
              {message}
            </div>
          )}

          <button
            className="login-button"
            type="submit"
          >
            Create Account
          </button>

        </form>

        <div className="signup-link">

          <span>
            Already have an account?
          </span>

          <button
            onClick={() => navigate("/")}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;
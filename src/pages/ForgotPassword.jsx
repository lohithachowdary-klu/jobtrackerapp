import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleResetPassword = (e) => {

    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(
      (user) =>
        user.username.toLowerCase() ===
        username.toLowerCase() &&
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (userIndex === -1) {
      setMessage(
        "Username and email do not match any account."
      );
      setMessageType("error");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage("Please enter your new password.");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 6) {
      setMessage(
        "Password must contain at least 6 characters."
      );
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    users[userIndex].password = newPassword;

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    setMessage(
      "Password reset successfully! Please login."
    );

    setMessageType("success");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1>Reset Password</h1>

        <p className="subtitle">
          Enter your account information
        </p>

        <form onSubmit={handleResetPassword}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <label>Confirm New Password</label>

          <input
            type="password"
            placeholder="Confirm new password"
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
            Reset Password
          </button>

        </form>

        <div className="signup-link">

          <button
            onClick={() => navigate("/")}
          >
            ← Back to Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;
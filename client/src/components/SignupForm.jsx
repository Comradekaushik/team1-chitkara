// import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const formData = {
      email: email,
      username: username,
      password: password,
    };

    try {
      const response = await fetch("https://klansin.onrender.com/users/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      setPassword("");
      setEmail("");
      setUsername("");
      if (result.registered === "true") {
        localStorage.setItem("userid", result.userid);

        console.log(localStorage.getItem("userid"));

        navigate("/home");
      } else if(result.registered === "false" && result.alreadyregistered=== 'true') {
        alert("Username already in use please choose a different one");
      }
      else{
        alert("Something went wrong!");

      }

      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div id="signup-form-main-container">
      <form onSubmit={handlesubmit}>
        <div>
          <div className="input-container">
            <label htmlFor="signup-email-input" className="signup-input-label">
              Enter your email
            </label>

            <input
              type="text"
              id="signup-email-input"
              className="input-field"
              onChange={handleChangeEmail}
              value={email}
              required
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label
              htmlFor="signup-username-input"
              className="signup-input-label"
            >
              Choose your username
            </label>

            <input
              type="text"
              id="signup-username-input"
              className="input-field"
              onChange={handleChangeUsername}
              value={username}
              autoComplete="off"
              required
            />
          </div>
          <div className="input-container">
            <label
              htmlFor="signup-password-input"
              className="signup-input-label"
            >
              Enter your password
            </label>

            <input
              type="password"
              id="signup-password-input"
              className="input-field"
              onChange={handleChangePassword}
              value={password}
              required
            />
          </div>
          <div>
            <input type="submit" id="signup-submit-button" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;

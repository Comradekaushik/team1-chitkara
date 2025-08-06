import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [usernameoremail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailGiven, setIsEmailGiven] = useState("no");
  // let isEmailGiven = "no"
  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setUsernameOrEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value.indexOf("@") > -1) {
      setIsEmailGiven("yes");
    } else {
      setIsEmailGiven("no");
    }
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    console.log(
      "entered usernameoremail : " +
        usernameoremail +
        " " +
        "entered password : " +
        password
    );
    if (!usernameoremail || !password) {
      alert("Please fill in all fields");
      return;
    }

    // if (usernameoremail.indexOf("@") > -1) {
    //   setIsEmailGiven("yes");
    //   console.log("this runs?");
    //   // isEmailGiven = "yes";
    //   if (!/\S+@\S+\.\S+/.test(usernameoremail)) {
    //     alert("Please enter a valid email address");
    //     return;
    //   }
    // } else {
    //   setIsEmailGiven("no");
    // }
    if (isEmailGiven === "yes" && !/\S+@\S+\.\S+/.test(usernameoremail)) {
      alert("Please enter a valid email address");
      return;
    }

    // setEmail(email);
    // setPassword(password);
    let formData = {};
    if (isEmailGiven === "yes") {
      formData = {
        email: usernameoremail.trim(),
        password: password.trim(),
        isEmail: "yes",
      };
    } else if (isEmailGiven === "no") {
      formData = {
        username: usernameoremail.trim(),
        password: password.trim(),
        isEmail: "no",
      };
    }

    try {
      const response = await fetch("https://klansin.onrender.com/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      // setPassword("");
      // setUsernameOrEmail("");
      if (result.isValid === "true") {
        localStorage.setItem("userid", result.userid);

        localStorage.setItem("username", result.username);

        localStorage.setItem("token", "correct");

        const storedValue = localStorage.getItem("userid");

        console.log("Stored Value:", storedValue);

        navigate("/home");
      } else if (result.isValid === "false" && result.userfound === "true") {
        alert("Wrong Password ");
      } else {
        alert("wrong username ");
      }

      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div id="login-form-principal-container">
      <div id="login-form-logo-container">
        {/* <div>
          <img src="" alt="logo-login" />
        </div> */}
        <div id="login-heading">Sign in </div>
        <div id="enter-credentials-message-container">
          Please enter your credentials.
        </div>
      </div>
      <form onSubmit={handlesubmit}>
        <div>
          <div className="input-container">
            <label
              htmlFor="login-username-or-email-input"
              className="input-label"
            >
              Enter your email or username
            </label>

            <input
              type="text"
              id="login-username-or-email-input"
              className="input-field"
              onChange={handleChangeEmail}
              autoComplete="off"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="login-password-input" className="input-label">
              Enter your password
            </label>

            <input
              type="password"
              id="login-password-input"
              className="input-field"
              onChange={handleChangePassword}
              required
            />
          </div>
          <div>
            <input type="submit" id="login-submit-button" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

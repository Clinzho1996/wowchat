/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import axios from "axios";

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const APP_NAME = process.env.REACT_APP_APP_NAME;
console.log(PROJECT_ID);

const Modal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      "Project-ID": PROJECT_ID,
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
      setError("");
    } catch (err) {
      setError("Oops, incorrect credentials.");
    }
  };

  return (
    <div className="wrapper">
      <div className="left">
        <img src={require("../assets/Opinion-bro.png")} alt="bro" />
      </div>
      <div className="form right">
        <div className="header">
          <img src={require("../assets/wow.png")} alt="logo" width="100px" />
          {/* <h1 className="title">{APP_NAME}</h1> */}
          <p className="subtitle">
            Please log in using your credentials to collaborate with your
            colleagues and experience a smooth workflow.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Enter Username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Enter Password"
            required
          />
          <a href="#" className="forgot">
            Forgot Password ?
          </a>
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1 className="error">{error}</h1>
      </div>
    </div>
  );
};

export default Modal;

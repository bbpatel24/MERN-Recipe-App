import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://recipe-app-node-server.herokuapp.com/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth">
    <div className="auth-container">
    <form onSubmit={handleSubmit}>
      <p className="login-header">Sign Up</p>
        <div className="form-group">
        <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
        />
        </div>
        <div className="form-group">
        <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        />
        </div>
        <button className="register-button" type="submit">
        Sign Up
        </button>
        </form>
        </div>
        </div>
        );
      };
      
export default Register;

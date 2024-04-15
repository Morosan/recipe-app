/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)

    try {
      const result = await axios.post(
        // "https://recipe-app-backend-ggcu.onrender.com/auth/login"
        "http://localhost:3001/auth/login"
        , {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      setLoading(false)
      navigate("/");
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };

  return (
    <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="d-flex mb-5">
            <i className="bi bi-person-circle me-3"></i>
            <h2 className="sub-heading">Login</h2>
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button 
            className="button primary" 
            type="submit"
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
    </div>
  );
};

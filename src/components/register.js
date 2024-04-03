import React, { useState } from "react";
import axios from "axios";
import { Button } from "./button";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true)
  
      try {
        await axios.post(
          // "https://recipe-app-backend-ggcu.onrender.com/auth/register"
          "http://localhost:3001/auth/register"
          , {
          username,
          password,
        });
        alert("Registration Completed! Now login.");
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error);
      }
    };
  
    return (
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2 className="sub-heading mb-5">Register</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button 
            className="button primary" 
            type="submit"
            isLoading={isLoading}
          >
            Register
          </Button>
        </form>
      </div>
    );
};
import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState();

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/login", user)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble-page");
      })
      .catch(err => {
        setError(err.response.data.error);
        console.log(err.response.data.error);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Log In</button>
        {error && <legend className="error">{error}</legend>}
      </form>
    </>
  );
};

export default Login;

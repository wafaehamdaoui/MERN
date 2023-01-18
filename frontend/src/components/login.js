import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log("data",data)
        if (data) {
          if(data.username==="admin"){
            // redirect to the home page or wherever you want
            navigate("/admin");
          }else{
            // redirect to the home page or wherever you want
            navigate("/student");
          }
        } else {
            alert("user or password not fount");
        }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input type="submit" value="Login" />
    </form>
  );
}

export default Login;
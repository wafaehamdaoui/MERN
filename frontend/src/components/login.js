import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('https://uemf-ressources-api-4150.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ username, password }),
        credentials:"same-origin"
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
    <div>
      <h2 style={{marginLeft:"39%",marginTop:"5%"}}> Page de Connexion</h2>
      <img src="login.jpg" style={{width:"10%",marginLeft:"50%",marginTop:"2%"}}></img>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection : "column", alignItems : "center" }}>
      <label htmlFor="username">Nom d'Utilisateur</label>
      <input
        class="form-control"
        type="text"
        id="username"
        name="username"
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "23%",marginBottom:"2%"}}
      />

      <label htmlFor="password">Mot de Passe</label>
      <input
        class="form-control"
        type="password"
        id="password"
        name="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "23%", marginBottom:"2%"}}
      />
      <input  type="submit" value=" Se Connecter" style={{ cursor: "pointer"}} />
    </form>
    </div>
  );
}

export default Login;

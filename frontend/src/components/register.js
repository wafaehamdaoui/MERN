import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
	const [form, setForm] = useState({
		matricul:"",
	    username:"",
	    email: "",
	    password: "",
	});
	const navigate = useNavigate();
	
	// These methods will update the state properties.
	function updateForm(value) {
	  return setForm((prev) => {
		return { ...prev, ...value };
	  });
	}
	
	// This function will handle the submission.
	async function onSubmit(e) {
	  e.preventDefault();
	
	  // When a post request is sent to the create url, we'll add a new record to the database.
	  const newUser = { ...form };
	
	  await fetch("http://localhost:5000/register", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(newUser),
	  })
	  .catch(error => {
		window.alert(error);
		return;
	  });
	
	  setForm({ 
	  matricul:"",
	  username:"",
	  email: "",
	  password: "", });
	  navigate("/admin");
}
	return (
		<div>
			<h1 style={{marginLeft:"34%",marginTop:"5%"}}>Créer Nouveau Utilisateur </h1>
			<form onSubmit={onSubmit} style={{display: "flex", flexDirection : "column", alignItems : "center",marginTop:"5%" }}>
			<label htmlFor="username" >Nom d'Utilisateur</label>
				<input
				    class="form-control"
					value={form.username}
					onChange={(e) => updateForm({ username: e.target.value })}
					type="text"
					placeholder="username"
					style={{ width: "40%",marginLeft:"5%"}}
				/>
				<br />
				<label htmlFor="matricul">Matricule</label>
				<input
				    class="form-control"
					value={form.matricul}
					onChange={(e) => updateForm({ matricul: e.target.value })}
					type="text"
					placeholder="matricul"
					style={{ width: "40%",marginLeft:"5%"}}
				/>
				<br />
				<label htmlFor="email">Email</label>
				<input
				    class="form-control"
					value={form.email}
					onChange={(e) => updateForm({ email: e.target.value })}
					type="email"
					placeholder="Email"
					style={{ width: "40%",marginLeft:"5%"}}
				/>
				<br />
				<label htmlFor="password">Mot de Passe</label>
				<input
				    class="form-control"
					value={form.password}
					onChange={(e) => updateForm({ password: e.target.value })}
					type="password"
					placeholder="Password"
					style={{ width: "40%",marginLeft:"5%"}}
				/>
				<br />
				<input type="submit" value="Ajouter" style={{padding:"5px 15px"}}/>
			</form>
		</div>
	)
}
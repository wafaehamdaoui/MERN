import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
	const [form, setForm] = useState({
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
	  username:"",
	  email: "",
	  password: "", });
	  navigate("/login");
}
	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={onSubmit}>
				<input
					value={form.username}
					onChange={(e) => updateForm({ username: e.target.value })}
					type="text"
					placeholder="username"
				/>
				<br />
				<input
					value={form.email}
					onChange={(e) => updateForm({ email: e.target.value })}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={form.password}
					onChange={(e) => updateForm({ password: e.target.value })}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Register" />
			</form>
		</div>
	)
}

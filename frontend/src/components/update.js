import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

 
export default function Update() {
 const [form, setForm] = useState({
  matricul: "",
  username: "",
  email: "",
  password: "",
  users: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://uemf-ressources-api-4150.onrender.com/user/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`User with id ${id} not found`);
       navigate("/admin/user");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     matricul: form.matricul,
     username: form.username,
     email: form.email,
     password: form.password,
   };
 
   // This will send a post request to update the data in the database.
   const res=await fetch(`https://uemf-ressources-api-4150.onrender.com/updateuser/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
   const data = await res.json();
   if(data.error){
    alert(data.error)
   }else{
    navigate("/admin/user");
   }
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div>
			<h1 style={{marginLeft:"36%",marginTop:"5%"}}>Modifier Utilisateur </h1>
			<form onSubmit={onSubmit} style={{display: "flex", flexDirection : "column", alignItems : "center",marginTop:"3%" }}>
			<label htmlFor="username" >Nom d'Utilisateur</label>
				<input
				    class="form-control"
					value={form.username}
					onChange={(e) => updateForm({ username: e.target.value })}
					type="text"
					placeholder="username"
					style={{ width: "40%",marginLeft:"2%"}}
				/>
				<br />
				<label htmlFor="matricul">Matricule</label>
				<input
				    class="form-control"
					value={form.matricul}
					onChange={(e) => updateForm({ matricul: e.target.value })}
					type="text"
					placeholder="matricul"
					style={{ width: "40%",marginLeft:"2%"}}
				/>
				<br />
				<label htmlFor="email">Email</label>
				<input
				    class="form-control"
					value={form.email}
					onChange={(e) => updateForm({ email: e.target.value })}
					type="email"
					placeholder="Email"
					style={{ width: "40%",marginLeft:"2%"}}
				/>
				<br />
				<label htmlFor="password">Mot de Passe</label>
				<input
				    class="form-control"
					value={form.password}
					onChange={(e) => updateForm({ password: e.target.value })}
					type="password"
					placeholder="Password"
					style={{ width: "40%",marginLeft:"2%"}}
				/>
				<br />
				<input type="submit" value="Modifier" style={{padding:"5px 15px"}}/>
			</form>
		</div>
 );
}

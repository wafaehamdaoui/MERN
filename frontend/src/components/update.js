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
     const response = await fetch(`http://localhost:5000/user/${params.id.toString()}`);
 
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
   await fetch(`http://localhost:5000/updateuser/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/admin/user");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div>
  <h3 style={{marginLeft:"20%"}}>  Modifier un Utilisateur</h3>
  <form onSubmit={onSubmit}>
    <div className="col-md-6" style={{marginLeft:"20%"}}>
      <label htmlFor="matricul" >Matricul</label>
      <input
        type="text"
        className="form-control"
        id="matricul"
        value={form.matricul}
        onChange={(e) => updateForm({ matricul: e.target.value })}
      />
    </div>
    <div className="col-md-6" style={{marginLeft:"20%"}}>
      <label htmlFor="nom" >Nom d'Utilisateur</label>
      <input
        type="text"
        className="form-control"
        id="nom"
        value={form.username}
        onChange={(e) => updateForm({ username: e.target.value })}
      />
    </div>
    <div className="col-md-6" style={{marginLeft:"20%"}}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="form-control"
        id="email"
        value={form.email}
        onChange={(e) => updateForm({ email: e.target.value })}
      />
    </div>
    <div className="col-md-6" style={{marginLeft:"20%"}}>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="form-control"
        id="password"
        value={form.password}
        onChange={(e) => updateForm({ password: e.target.value })}
      />
    </div>
    <div className="col-md-4" style={{marginLeft:"40%",marginTop:"2%"}}>
      <input
        type="submit"
        value="Effectuer Modification"
        className="btn btn-primary"
      />
    </div>
  </form>
</div>
 );
}
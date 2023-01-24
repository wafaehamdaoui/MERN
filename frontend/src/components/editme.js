import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
 
export default function Edit() {
 const [form, setForm] = useState({
  matricul: "",
  nom: "",
  prenom: "",
  ecole: "",
  ressource: "",
  duree: "",
  date: "",
  status: "",
  records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://uemf-ressources-api-4150.onrender.com/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/student/record");
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
     nom: form.nom,
     prenom: form.prenom,
     ecole: form.ecole,
     ressource: form.ressource,
     duree: form.duree,
     date: form.date,
     status: form.status,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`https://uemf-ressources-api-4150.onrender.com/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/student/record");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div>
  <h3 style={{marginLeft:"20%"}}>  Modifier une Demande</h3>
  
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
      <label htmlFor="nom" >Nom</label>
      <input
        type="text"
        className="form-control"
        id="nom"
        value={form.nom}
        onChange={(e) => updateForm({ nom: e.target.value })}
      />
    </div>
    <div className="col-md-6" style={{marginLeft:"20%"}}>
      <label htmlFor="prenom">Prenom</label>
      <input
        type="text"
        className="form-control"
        id="prenom"
        value={form.prenom}
        onChange={(e) => updateForm({ prenom: e.target.value })}
      />
    </div>
    <label htmlFor="ecole" style={{marginLeft:"20%"}}>Ecole</label>
    <div className="col-md-6" style={{marginLeft:"20%"}}>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="ecoleOptions"
          id="ecoleEIDIA"
          value="EIDIA"
          checked={form.ecole === "EIDIA"}
          onChange={(e) => updateForm({ ecole: e.target.value })}
        />
        <label htmlFor="ecoleEIDIA" className="form-check-label">EIDIA</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="ecoleOptions"
          id="ecoleEMADU"
          value="EMADU"
          checked={form.ecole === "EMADU"}
          onChange={(e) => updateForm({ ecole: e.target.value })}
        />
        <label htmlFor="ecoleEMADU" className="form-check-label">EMADU</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="ecoleOptions"
          id="ecoleEPS"
          value="EPS"
          checked={form.ecole === "EPS"}
          onChange={(e) => updateForm({ ecole: e.target.value })}
        />
        <label htmlFor="ecoleEPS" className="form-check-label">EPS</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="ecoleOptions"
          id="ecoleFEP"
          value="FEP"
          checked={form.ecole === "FEP"}
          onChange={(e) => updateForm({ ecole: e.target.value })}
        />
        <label htmlFor="ecoleFEP" className="form-check-label">FEP</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="ecoleOptions"
          id="ecoleEBS"
          value="EBS"
          checked={form.ecole === "EBS"}
          onChange={(e) => updateForm({ ecole: e.target.value })}
        />
        <label htmlFor="ecoleEBS" className="form-check-label">EBS</label>
      </div>
    </div>
    <label htmlFor="resource" style={{marginLeft:"20%"}}>Ressource</label>
    <div className="col-md-6" style={{marginLeft:"20%"}}>
      <Form.Select aria-label="Default select example" onSelect={(e) => updateForm({ ressource: e.target.value })} onChange={(e) => updateForm({ ressource: e.target.value })}>
         <option>Selectionner une Ressource </option>
         <option value="Foot-ball" selected={form.ressource === "Foot-ball"}>Terrain Foot-ball</option>
         <option value="Basket-ball" selected={form.ressource === "Basket-ball"}>Terrain Basket-ball</option>
         <option value="Hand-ball" selected={form.ressource === "Hand-ball"}>Terrain Hand-ball</option>
         <option value="Volley-ball" selected={form.ressource === "Volley-ball"}>Terrain Volley-ball</option>
         <option value="Tennis" selected={form.ressource === "Tennis"}>Tennis de table</option>
         <option value="Gym" selected={form.ressource === "Gym"}>Salle multisports</option>
         <option value="Bibliothèque" selected={form.ressource === "Bibliothèque"}>Espace Bibliothèque</option>
         <option value="Laboratoire" selected={form.ressource === "Laboratoire"}> Salle Informatique</option>
         
       </Form.Select>
    </div>
    <label htmlFor="resource" style={{marginLeft:"20%"}}>Durée</label>
    <div className="col-md-6" style={{marginLeft:"20%"}}>
                     <Form.Group controlId="duedate" >
                         <Form.Control type="time" name="time" placeholder="Due time" onSelect={(e) => updateForm({ duree: e.target.value })} />
                     </Form.Group>
     </div>
    <label htmlFor="resource" style={{marginLeft:"20%"}}>Date</label>
    <div className="col-md-6" style={{marginLeft:"20%"}}>
                     <Form.Group controlId="duedate" >
                         <Form.Control type="date" name="date" placeholder="Due date" onSelect={(e) => updateForm({ date: e.target.value })}/>
                     </Form.Group>
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

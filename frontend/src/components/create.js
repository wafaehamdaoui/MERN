import React, { useState } from "react";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
 
export default function Create() {
 const [form, setForm] = useState({
   matricul: "",
   nom: "",
   prenom: "",
   ecole: "",
   ressource: "",
   duree: "",
   date: "",
   status: "En Attente",
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
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ matricul: "",
   nom: "",
   prenom: "",
   ecole: "",
   ressource: "",
   duree: "",
   date: "",
   status: "En Attente", });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="matricul">Matricul</label>
         <input
           type="text"
           className="form-control"
           id="matricul"
           value={form.matricul}
           onChange={(e) => updateForm({ matricul: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="nom">Nom</label>
         <input
           type="text"
           className="form-control"
           id="nom"
           value={form.nom}
           onChange={(e) => updateForm({ nom: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="prenom">Prenom</label>
         <input
           type="text"
           className="form-control"
           id="prenom"
           value={form.prenom}
           onChange={(e) => updateForm({ prenom: e.target.value })}
         />
       </div>
       <label htmlFor="ecole">Ecole</label>
       <div className="form-group">
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
             id="ecoleEBS"
             value="EBS"
             checked={form.ecole === "EBS"}
             onChange={(e) => updateForm({ ecole: e.target.value })}
           />
           <label htmlFor="ecoleEBS" className="form-check-label">EBS</label>
         </div>
       </div>
       <label htmlFor="resource">Ressource</label>
       <div className="form-group">
         <Form.Select aria-label="Default select example" onSelect={(e) => updateForm({ ressource: e.target.value })} onChange={(e) => updateForm({ ressource: e.target.value })}>
            <option>Selectionner un Terrain </option>
            <option value="Football" selected={form.ressource === "football"}>Terrain Football</option>
            <option value="Basketball" selected={form.ressource === "basketball"}>Terrain Basketball</option>
            <option value="Handball" selected={form.ressource === "handball"}>Terrain Handball</option>
          </Form.Select>
       </div>
       <label htmlFor="resource">Durée</label>
       <div className="col-md-12">
                        <Form.Group controlId="duedate" >
                            <Form.Control type="time" name="date" placeholder="Due time" />
                        </Form.Group>
        </div>
       <label htmlFor="resource">Date</label>
       <div className="col-md-12">
                        <Form.Group controlId="duedate" >
                            <Form.Control type="date" name="date" placeholder="Due date" />
                        </Form.Group>
                    </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
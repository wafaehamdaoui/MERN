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
   const newDemande = { ...form };
   try{
   const res = await fetch("https://uemf-ressources-api-4150.onrender.com/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newDemande),
   })
   const data = await res.json();
   if(data.error){
    alert(data.error)
   }else{
    navigate("/student/record");
   }
  }catch(error){
     window.alert(error);
     navigate("/student");
     return;
   };
 
   setForm({ matricul: "",
   nom: "",
   prenom: "",
   ecole: "",
   ressource: "",
   duree: "",
   date: "",
   status: "En Attente", });
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3 style={{marginLeft:"40%",marginTop:"5%"}}>  Demander une Ressource</h3>
     <form onSubmit={onSubmit}>
       <div className="col-md-6" style={{marginLeft:"26%"}}>
         <label htmlFor="matricul" >Matricul</label>
         <input
           type="text"
           className="form-control"
           id="matricul"
           value={form.matricul}
           onChange={(e) => updateForm({ matricul: e.target.value })}
         />
       </div>
       <div className="col-md-6" style={{marginLeft:"26%"}}>
         <label htmlFor="nom" >Nom</label>
         <input
           type="text"
           className="form-control"
           id="nom"
           value={form.nom}
           onChange={(e) => updateForm({ nom: e.target.value })}
         />
       </div>
       <div className="col-md-6" style={{marginLeft:"26%"}}>
         <label htmlFor="prenom">Prenom</label>
         <input
           type="text"
           className="form-control"
           id="prenom"
           value={form.prenom}
           onChange={(e) => updateForm({ prenom: e.target.value })}
         />
       </div>
       <label htmlFor="ecole" style={{marginLeft:"26%"}}>Ecole</label>
       <div className="col-md-6" style={{marginLeft:"26%"}}>
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
       <label htmlFor="resource" style={{marginLeft:"26%"}}>Ressource</label>
       <div className="col-md-6" style={{marginLeft:"26%"}}>
         <Form.Select aria-label="Default select example" onSelect={(e) => updateForm({ ressource: e.target.value })} onChange={(e) => updateForm({ ressource: e.target.value })}>
            <option>Selectionner une Ressource </option>
         <option value="Foot-ball" selected={form.ressource === "Foot-ball"}>Terrain Foot-ball</option>
         <option value="Basket-ball" selected={form.ressource === "Basket-ball"}>Terrain Basket-ball</option>
         <option value="Hand-ball" selected={form.ressource === "Hand-ball"}>Terrain Hand-ball</option>
         <option value="Volley-ball" selected={form.ressource === "Volley-ball"}>Terrain Volley-ball</option>
         <option value="Tennis" selected={form.ressource === "Tennis"}>Tennis de table</option>
         <option value="Gym" selected={form.ressource === "Gym"}>Salle multisports</option>
         <option value="Bibliothèque" selected={form.ressource === "Bibliothèque"}>Espace Bibliothèque</option>
         <option value="Laboratoire" selected={form.ressource === "Laboratoire"}> Salle Informatique AI</option>
         <option value="Laboratoire" selected={form.ressource === "Laboratoire"}> Salle Informatique Robotique</option>
         <option value="Laboratoire" selected={form.ressource === "Laboratoire"}> Salle Informatique RV</option>
         <option value="Laboratoire" selected={form.ressource === "Laboratoire"}> Salle Informatique B1</option>
            
          </Form.Select>
       </div>
       <label htmlFor="resource" style={{marginLeft:"26%"}}>Durée</label>
       <div className="col-md-6" style={{marginLeft:"26%"}}>
         <Form.Select aria-label="Default select example" onSelect={(e) => updateForm({ duree: e.target.value })} onChange={(e) => updateForm({ duree: e.target.value })}>
            <option>Selectionner une durée </option>
         <option value="09:00 -- 10:00" selected={form.duree === "09:00 -- 10:00"}>09:00 -- 10:00</option>
         <option value="10:00 -- 11:00" selected={form.duree === "10:00 -- 11:00"}>10:00 -- 11:00</option>
         <option value="11:00 -- 12:00" selected={form.duree === "11:00 -- 12:00"}>11:00 -- 12:00</option>
         <option value="12:00 -- 13:00" selected={form.duree === "12:00 -- 13:00"}>12:00 -- 13:00</option>
         <option value="13:00 -- 14:00" selected={form.duree === "13:00 -- 14:00"}>13:00 -- 14:00</option>
         <option value="14:00 -- 15:00" selected={form.duree === "14:00 -- 15:00"}>14:00 -- 15:00</option>
         <option value="15:00 -- 16:00" selected={form.duree === "15:00 -- 16:00"}>15:00 -- 16:00</option>
         <option value="16:00 -- 17:00" selected={form.duree === "16:00 -- 17:00"}>16:00 -- 17:00</option>
         <option value="17:00 -- 18:00" selected={form.duree === "17:00 -- 18:00"}> 17:00 -- 18:00</option>
         <option value="18:00 -- 19:00" selected={form.duree === "18:00 -- 19:00"}> 18:00 -- 19:00</option>
         <option value="19:00 -- 20:00" selected={form.duree === "19:00 -- 20:00"}>19:00 -- 20:00</option>
         <option value="20:00 -- 21:00" selected={form.duree === "20:00 -- 21:00"}> 20:00 -- 21:00</option>
         <option value="21:00 -- 22:00" selected={form.duree === "21:00 -- 22:00"}>21:00 -- 22:00</option> 
          </Form.Select>
       </div>
       <label htmlFor="resource" style={{marginLeft:"26%"}}>Date</label>
       <div className="col-md-6" style={{marginLeft:"26%"}}>
                        <Form.Group controlId="duedate" >
                            <Form.Control type="date" name="date" placeholder="Due date" onSelect={(e) => updateForm({ date: e.target.value })}/>
                        </Form.Group>
                    </div>
       <div className="col-md-4" style={{marginLeft:"45%",marginTop:"2%"}}>
         <input
           type="submit"
           value="Create Demande"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}

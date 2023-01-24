import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Button } from "react-bootstrap";
const Record = (props) => (
 <tr>
   <td>{props.record._id}</td>
   <td>{props.record.matricul}</td>
   <td>{props.record.nom}</td>
   <td>{props.record.prenom}</td>
   <td>{props.record.ecole}</td>
   <td>{props.record.ressource}</td>
   <td>{props.record.duree}</td>
   <td>{props.record.date}</td>
   <td>{props.record.status}</td>
   <td>
   <button className="btn btn-link"
       onClick={() => {
         props.validateRecord(props.record._id);
       }}
     >
       Valider
     </button>| 
    <button className="btn btn-link"
       onClick={() => {
         props.rejectRecord(props.record._id);
       }}
     >
       Rejeter
     </button>|
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Supprimer
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const navigate = useNavigate();
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`https://uemf-ressources-api-4150.onrender.com/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       navigate("/");
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`https://uemf-ressources-api-4150.onrender.com/${id}`, {
     method: "DELETE"
   });
   alert("Demande suprimée")
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 // This method will validare a record
 async function validateRecord(id) {
  await fetch(`https://uemf-ressources-api-4150.onrender.com/validate/${id}`, {
    method: "POST"
  });
  window.location.reload()
}
// This method will reject a record
async function rejectRecord(id) {
  await fetch(`https://uemf-ressources-api-4150.onrender.com/reject/${id}`, {
    method: "POST"
  });
  window.location.reload()
}
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         validateRecord={() => validateRecord(record._id)}
         rejectRecord={() => rejectRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3 style={{marginTop:"1.5%" , marginLeft:"39%"}}>Liste des Demandes
     <Button href="/admin" style={{marginLeft:"48%", backgroundColor:"green"}}>Retourne à l'Acceuil</Button>
     </h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
         <th>Id_Demande</th>
           <th>Matricul</th>
           <th>Nom</th>
           <th>Prénom</th>
           <th>Ecole</th>
           <th>Ressource</th>
           <th>Durée</th>
           <th>Date</th>
           <th>Statut</th>
           <th>Actions</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}

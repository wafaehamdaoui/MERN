import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
const User = (props) => (
 <tr>
   <td>{props.record._id}</td>
   <td>{props.record.matricul}</td>
   <td>{props.record.username}</td>
   <td>{props.record.email}</td>
   <td>{props.record.password}</td>
   <td>
     <Link className="btn btn-link" to={`/admin/update/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteUser(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function UserList() {
 const [records, setRecords] = useState([]);
 const navigate = useNavigate();
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getUsers() {
     const response = await fetch(`http://localhost:5000/user/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       navigate("/")
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getUsers();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteUser(id) {
   await fetch(`http://localhost:5000/delete/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function userList() {
   return records.map((record) => {
     return (
       <User
         record={record}
         deleteUser={() => deleteUser(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Users List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
         <th>Id_User</th>
           <th>Matricul</th>
           <th>Nom</th>
           <th>Email</th>
           <th>Password</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{userList()}</tbody>
     </table>
   </div>
 );
}
import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from "react-bootstrap";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <Image style={{"width" : 80 + '%'}} src="logo.png"></Image>
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav mr-auto">
           <li className="nav-item ">
           <NavLink className="nav-link" to="/student">
               Acceuil 
             </NavLink>
           </li>
           <li className="nav-item ">
           <NavDropdown title="Demande" id="basic-nav-dropdown">
              <NavDropdown.Item href="student/create">Salle Sport</NavDropdown.Item>
              <NavDropdown.Item href="student/create">Terrain </NavDropdown.Item>
              <NavDropdown.Item href="student/create">Bibliothèque</NavDropdown.Item>
              <NavDropdown.Item href="student/create">Computer</NavDropdown.Item>
            </NavDropdown>
           </li>
           <li className="nav-item ">
             <NavLink className="nav-link" to="/student/record">
                Liste Demandes
             </NavLink>
           </li>
           <li className="nav-item ">
             <NavLink className="nav-link" to="/student/about">
                 A propos 
             </NavLink>
           </li>
           <li className="nav-item ">
             <NavLink className="nav-link" to="/">
               Se déconnecter
             </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}
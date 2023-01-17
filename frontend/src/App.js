import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app //<Route exact path="/" element={<Home />} />
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Home from "./components/home";
import About from "./components/about";
import Register from "./components/register";
import Login from "./components/login";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
	   <Route exact path="/" element={<Register />} />
	   <Route exact path="/login" element={<Login />} />
       <Route exact path="/home" element={<Home />} />
       <Route path="/record" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/about" element={<About />} />
     </Routes>
   </div>
 );
};
 
export default App;

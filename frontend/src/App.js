import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app //<Route exact path="/" element={<Home />} />
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Home from "./components/home";
import Edit from "./components/edit";
import Create from "./components/create";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
     //<Route exact path="/" element={<Home />} />
       <Route path="/record" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;

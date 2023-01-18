// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
import Navbar from "./navbar";
import Home from "./home";
function Student(){
    return(
        <div>
     <Navbar />
     <Routes>
     <Route exact path="/" element={<Home />} />
     </Routes>
   </div>
    );
}

export default Student;
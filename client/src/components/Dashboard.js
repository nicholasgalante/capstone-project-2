import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Dashboard(){
   const { user, setUser } = useContext(UserContext);
   const navigate = useNavigate();
   
   function handleSignOut(){
      fetch("http://localhost:3000/signout", {
         method: "DELETE",
      }).then((r) => {
         if (r.ok) {
         setUser(null);
         navigate("/");
         }
      });
   }
   
   return (
      <div>
         <h1>Dashboard</h1>
         <p>Hello, {user.first_name}!</p>
         <button onClick={handleSignOut}>Sign Out</button>
      </div>
   );
}

export default Dashboard;
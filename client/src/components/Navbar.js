import React, {useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
   const { user, setUser } = useContext(UserContext);

   function handleSignOut() {
      fetch("/logout", {
         method: "DELETE",
         credentials: "include",
      }).then((r) => {
         if (r.ok) {
            console.log("logged out");
            setUser(null);
         }
      });
   }

   return(
      <>
     <button onClick={handleSignOut}>Sign Out</button> 
      </>
   )
}

export { Navbar };
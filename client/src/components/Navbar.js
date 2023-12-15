import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

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
    navigate("/")
  }

  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
      <button onClick={handleSignOut}>Sign Out</button>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/meetings">
        <button>Meetings</button>
      </Link>

      {user ? user.first_name : null}
    </>
  );
}

export { Navbar };

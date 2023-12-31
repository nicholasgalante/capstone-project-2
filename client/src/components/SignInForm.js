import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(user);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, password: password }),
      credentials: "include", // <-- includes cookies in the request
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          console.log(user);
          setUser(user);
          navigate("/dashboard")
        });
      } else {
        r.json().then((err) => console.log(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Sign In</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button type="submit">{isLoading ? "Loading..." : "Sign in"}</button>
      {errors.map((err) => err)}
    </form>
  );
}

export { SignInForm };

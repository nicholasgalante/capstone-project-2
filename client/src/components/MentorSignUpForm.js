import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function MentorSignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    fetch("http://localhost:3000/signup/mentors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mentor: {
          first_name: firstName,
          last_name: lastName,
          email_address: email,
          password: password,
          password_confirmation: passwordConfirmation,
          company_name: companyName,
          job_title: jobTitle,
        },
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          navigate("/dashboard");
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Sign Up</label>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        placeholder="First Name"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        placeholder="Last Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <input
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        type="password"
        placeholder="Password Confirmation"
      />
      <input
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        type="text"
        placeholder="Company Name"
      />
      <input
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        type="text"
        placeholder="Job Title"
      />
      <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
      {errors.map((err) => err)}
    </form>
  );
}

export default MentorSignUpForm;
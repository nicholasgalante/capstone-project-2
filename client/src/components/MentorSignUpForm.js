import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function MentorSignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    companyName: "",
    jobTitle: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    fetch("http://localhost:3000/signup/mentors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mentor: formData,
        credentials: 'include', // <-- includes cookies in the request
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Sign Up</label>
      <input
        value={formData.firstName}
        onChange={handleChange}
        type="text"
        name="firstName"
        placeholder="First Name"
      />
      <input
        value={formData.lastName}
        onChange={handleChange}
        type="text"
        name="lastName"
        placeholder="Last Name"
      />
      <input
        value={formData.email}
        onChange={handleChange}
        type="text"
        name="email"
        placeholder="Email"
      />
      <input
        value={formData.password}
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="Password"
      />
      <input
        value={formData.passwordConfirmation}
        onChange={handleChange}
        type="password"
        name="passwordConfirmation"
        placeholder="Password Confirmation"
      />
      <input
        value={formData.companyName}
        onChange={handleChange}
        type="text"
        name="companyName"
        placeholder="Company Name"
      />
      <input
        value={formData.jobTitle}
        onChange={handleChange}
        type="text"
        name="jobTitle"
        placeholder="Job Title"
      />
      <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
      {errors.map((err) => err)}
    </form>
  );
}

export { MentorSignUpForm };

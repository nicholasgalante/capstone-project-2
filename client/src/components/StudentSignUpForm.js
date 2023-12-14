import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


//Bug: After signing up, the user session does not persist

function StudentSignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    universityName: "",
    degreeType: "",
    areaOfStudy: "",
    expectedGraduationDate: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    fetch("http://localhost:3000/signup/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student: formData,
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

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

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
        value={formData.universityName}
        onChange={handleChange}
        type="text"
        name="universityName"
        placeholder="University Name"
      />
      <input
        value={formData.degreeType}
        onChange={handleChange}
        type="text"
        name="degreeType"
        placeholder="Degree Type"
      />
      <input
        value={formData.areaOfStudy}
        onChange={handleChange}
        type="text"
        name="areaOfStudy"
        placeholder="Area of Study"
      />
      <input
        value={formData.expectedGraduationDate}
        onChange={handleChange}
        type="text"
        name="expectedGraduationDate"
        placeholder="Expected Graduation Date"
      />
      <input
        value={formData.email}
        onChange={handleChange}
        type="email"
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
        placeholder="Confirm Password"
      />
      <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
      {errors.map((err) => err)}
    </form>
  );
}


export { StudentSignUpForm };

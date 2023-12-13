import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function StudentSignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [degreeType, setDegreeType] = useState("");
  const [areaOfStudy, setAreaOfStudy] = useState("");
  const [expectedGraduationDate, setExpectedGraduationDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
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
        student: {
          first_name: firstName,
          last_name: lastName,
          university_name: universityName,
          degree_type: degreeType,
          area_of_study: areaOfStudy,
          expected_graduation_date: expectedGraduationDate,
          email_address: email,
          password: password,
          password_confirmation: passwordConfirmation,
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
        value={universityName}
        onChange={(e) => setUniversityName(e.target.value)}
        type="text"
        placeholder="University Name"
      />
      <input
        value={degreeType}
        onChange={(e) => setDegreeType(e.target.value)}
        type="text"
        placeholder="Degree Type"
      />
      <input
        value={areaOfStudy}
        onChange={(e) => setAreaOfStudy(e.target.value)}
        type="text"
        placeholder="Area of Study"
      />
      <input
        value={expectedGraduationDate}
        onChange={(e) => setExpectedGraduationDate(e.target.value)}
        type="text"
        placeholder="Expected Graduation Date"
      />
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
      <input
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
      {errors.map((err) => ( err))}
    </form>
  );
}

export { StudentSignUpForm };

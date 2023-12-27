import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

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
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        First Name
      </label>
      <div className="mt-2">
        <input
          value={formData.firstName}
          onChange={handleChange}
          type="text"
          name="firstName"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Last Name
      </label>
      <input
        value={formData.lastName}
        onChange={handleChange}
        type="text"
        name="lastName"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        University Name
      </label>
      <input
        value={formData.universityName}
        onChange={handleChange}
        type="text"
        name="universityName"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Degree Type
      </label>
      <input
        value={formData.degreeType}
        onChange={handleChange}
        type="text"
        name="degreeType"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Area of Study
      </label>
      <input
        value={formData.areaOfStudy}
        onChange={handleChange}
        type="text"
        name="areaOfStudy"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Expected Graduation Date
      </label>
      <input
        value={formData.expectedGraduationDate}
        onChange={handleChange}
        type="text"
        name="expectedGraduationDate"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Email Address
      </label>
      <input
        value={formData.email}
        onChange={handleChange}
        type="email"
        name="email"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Password
      </label>
      <input
        value={formData.password}
        onChange={handleChange}
        type="password"
        name="password"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Password Confirmation
      </label>
      <input
        value={formData.passwordConfirmation}
        onChange={handleChange}
        type="password"
        name="passwordConfirmation"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button
        type="submit"
        className="flex mt-5 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {isLoading ? "Loading..." : "Create Account"}
      </button>
      {errors.map((err) => err)}
    </form>
  );
}

export { StudentSignUpForm };

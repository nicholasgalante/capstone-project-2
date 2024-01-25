import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

//Bug: After signing up, the user session does not persist

function MentorSignUpForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    password_confirmation: "",
    company_name: "",
    job_title: "",
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
        credentials: "include", // <-- includes cookies in the request
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          navigate("/signin");
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        First Name
      </label>
      <input
        value={formData.first_name}
        onChange={handleChange}
        type="text"
        name="first_name"
        className="block mb-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label className="block text-sm font-medium leading-6 text-gray-900">
        Last Name
      </label>
      <input
        value={formData.last_name}
        onChange={handleChange}
        type="text"
        name="last_name"
        className="block mb-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label className="block text-sm font-medium leading-6 text-gray-900">
        Company Name
      </label>
      <input
        value={formData.company_name}
        onChange={handleChange}
        type="text"
        name="company_name"
        className="block mb-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label className="block text-sm font-medium leading-6 text-gray-900">
        Job Title
      </label>
      <input
        value={formData.job_title}
        onChange={handleChange}
        type="text"
        name="job_title"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label className="block text-sm font-medium leading-6 text-gray-900">
        Email Address
      </label>
      <input
        value={formData.email_address}
        onChange={handleChange}
        type="text"
        name="email_address"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label className="block text-sm font-medium leading-6 text-gray-900">
        Password
      </label>
      <input
        value={formData.password}
        onChange={handleChange}
        type="password"
        name="password"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label className="block text-sm font-medium leading-6 text-gray-900">
        Password Confirmation
      </label>
      <input
        value={formData.password_confirmation}
        onChange={handleChange}
        type="password"
        name="password_confirmation"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <button
        type="submit"
        className="flex mt-5 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {" "}
        {isLoading ? "Loading..." : "Create Account"}
      </button>
      {errors.map((err) => err)}
    </form>
  );
}

export { MentorSignUpForm };

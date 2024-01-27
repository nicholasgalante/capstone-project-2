import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";

function StudentSignUpForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    university_name: "",
    degree_type: "",
    area_o_study: "",
    expected_graduation_date: "",
    email_address: "",
    password: "",
    password_confirmation: "",
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
          console.log("NEW USER: ", user);
          setUser(user);
          navigate("/signin");
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
    <div>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          First Name
        </label>
        <div className="mt-2">
          <input
            value={formData.first_name}
            onChange={handleChange}
            type="text"
            name="first_name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Last Name
        </label>
        <input
          value={formData.last_name}
          onChange={handleChange}
          type="text"
          name="last_name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <label className="block text-sm font-medium leading-6 text-gray-900">
          University Name
        </label>
        <input
          value={formData.university_name}
          onChange={handleChange}
          type="text"
          name="university_name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <label className="block text-sm font-medium leading-6 text-gray-900">
          Degree Type
        </label>
        <select
          value={formData.degree_type}
          onChange={handleChange}
          type="text"
          name="degree_type"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">Select a degree type</option>
          <option value="Associate">Associate Degree</option>
          <option value="Bachelor">Bachelor Degree</option>
          <option value="Master">Master Degree</option>
        </select>

        <label className="block text-sm font-medium leading-6 text-gray-900">
          Area of Study
        </label>
        <input
          value={formData.areaOfStudy}
          onChange={handleChange}
          type="text"
          name="areaOfStudy"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <label className="block text-sm font-medium leading-6 text-gray-900">
          Expected Graduation Date
        </label>
        <input
          value={formData.expected_graduation_date}
          onChange={handleChange}
          type="date"
          name="expected_graduation_date"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <label className="block text-sm font-medium leading-6 text-gray-900">
          Email Address
        </label>
        <input
          value={formData.email_address}
          onChange={handleChange}
          type="email"
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
          {isLoading ? "Loading..." : "Create Account"}
        </button>
      </form>
      <ErrorMessage errors={errors} />
    </div>
  );
}

export { StudentSignUpForm };

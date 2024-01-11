import React, { useState, useContext, useEffect } from "react";
import { StudentSignUpForm } from "../components/StudentSignUpForm";
import { MentorSignUpForm } from "../components/MentorSignUpForm";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SignUpPage() {
  const [userType, setUserType] = useState("student");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/meetings");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <Link to="/"><img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /></Link>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <nav className="flex justify-center space-x-4 mt-6" aria-label="Tabs">
        <button
          value="student"
          onClick={() => setUserType("student")}
          className={classNames(
            userType === "student"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-500 hover:text-gray-700",
            "rounded-md px-3 py-2 text-sm font-medium"
          )}
        >
          Student
        </button>
        <button
          value="mentor"
          onClick={() => setUserType("mentor")}
          className={classNames(
            userType === "mentor"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-500 hover:text-gray-700",
            "rounded-md px-3 py-2 text-sm font-medium"
          )}
        >
          Mentor
        </button>
      </nav>

      {userType === "student" ? <StudentSignUpForm /> : <MentorSignUpForm />}

      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/signin">
          {" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </a>
        </Link>
      </p>
    </div>
  );
}

export { SignUpPage };

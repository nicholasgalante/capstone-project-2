import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function CallToAction() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Bridge the gap to your dream tech career
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Start your personalized one-to-one mentorship journey today and
            unlock your career potential.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="text-sm font-semibold leading-6 text-gray-900">
              {user ? (
                <Link to="/meetings" className="text-indigo-600">Go to Dashboard →</Link>
              ) : (
                <div>
                  <Link
                    to="/signup"
                    className="rounded-md mr-5 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </Link>
                  <Link to="/signin">Sign In →</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

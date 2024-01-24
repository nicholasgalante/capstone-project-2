import React, { useState, useEffect, useContext } from "react";
import { Link, redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { NewMeetingForm } from "../components/NewMeetingForm";
import { format } from "date-fns";
import { PencilSquareIcon } from '@heroicons/react/20/solid'
import { SignInForm } from "../components/SignInForm";

function MeetingsPage() {
  const [errors, setErrors] = useState([]);
  const { user, userType, loading, error } = useContext(UserContext);

  // console.log("MEETING PAGE ERROR FROM USER: ", error, "MEETING PAGE ERRORS: ", errors)

  useEffect(() => {
    // Handle errors from the context
    if (error) {
      setErrors([error.message]);
    }
  }, [error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length > 0) {
    // Extract error messages or relevant information before rendering
    return <div>{errors}</div>;
  }

  // Check if user is available before accessing properties
  if (!user) {
    return <SignInForm/>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Welcome, {user.first_name}!
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            View your upcoming or past meetings here.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <NewMeetingForm />
          
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Meeting Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Location
                    </th>
                    {/* <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {user.meetings.map((meeting) => (
                    <tr key={meeting.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-indigo-600 sm:pl-6">
                        <Link to={`/meetings/${meeting.id}`}>
                          {format(
                            meeting.meeting_datetime,
                            "EEEE MMMM do, yyyy"
                          )}{" "}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(meeting.meeting_datetime, "h:mm a")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {meeting.location}
                      </td>
                      {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <PencilSquareIcon className="mt-1 h-5 w-5 flex-none text-gray-400"/>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MeetingsPage };



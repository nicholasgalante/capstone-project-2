import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { NewMeetingForm } from "../components/NewMeetingForm";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { MatchPending } from "./MatchPending";

function MeetingsPage() {
  const [errors, setErrors] = useState([]);
  const { user, userType, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(errors)

  if (!user) {
    return <div>Please sign in to view meetings.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if(user.matched == false) {
    return (<MatchPending/>)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <NewMeetingForm setErrors={setErrors}/>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10">
              <ErrorMessage errors={errors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MeetingsPage };

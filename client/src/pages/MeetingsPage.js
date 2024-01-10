import React, { useState, useEffect, useContext } from "react";
import { Link, redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { NewMeetingForm } from "../components/NewMeetingForm";
import { format } from "date-fns";

function MeetingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <div>Please sign in to view meetings.</div>;
  }

  return (
    <div>
      <NewMeetingForm />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center"></div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Meeting Date
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Organizer
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {user.meetings.map((meeting) => (
                    <tr key={meeting.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <Link to={`/meetings/${meeting.id}`}>
                          {format(
                            meeting.meeting_datetime,
                            "EEEE MMMM do, yyyy"
                          )}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        <Link to={`/meetings/${meeting.id}`}>
                          {format(meeting.meeting_datetime, "h:mm a")}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {meeting.location}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {meeting.organizer_id}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                          <span className="sr-only">
                            , {meeting.meeting_datetime}
                          </span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <ul>
        {user.meetings.map((meeting) => (
          <li key={meeting.id}>
            <Link to={`/meetings/${meeting.id}`}>
              {meeting.meeting_datetime}
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export { MeetingsPage };

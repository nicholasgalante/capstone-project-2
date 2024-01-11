import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

function MeetingDetailPage() {
  const [meetingData, setMeetingData] = useState({
    meeting_datetime: "",
    location: "",
    topics_discussed: "",
    next_steps: "",
  });
  const [updating, setUpdating] = useState(false);
  const { meetingID } = useParams();
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <div>Please sign in to view meetings.</div>;
  }

  function handleEdit() {
    setUpdating(!updating);
  }

  const selectedMeeting = user.meetings.find(
    (meeting) => meeting.id === parseInt(meetingID)
  );

  const {
    meeting_datetime,
    location,
    topics_discussed,
    next_steps,
    resources,
  } = selectedMeeting;


  console.log(resources)

  //CONTINUE HERE - handle submit and edit form for meeting details***
  function handleSubmit() {
    fetch(`/meetings/${meetingID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetingData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMeetingData(data);
        setUpdating(false);
      });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {updating ? (
            <div>
              <div className="flex items-center justify-between">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                    Meeting Log
                  </h1>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <button
                    onClick={handleSubmit}
                    className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date Scheduled
                </label>
                <div className="mt-2">
                  <textarea
                    rows={1}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={format(
                      new Date(meeting_datetime),
                      "EEEE, MMMM do, yyyy"
                    )}
                  />
                </div>

                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Time Scheduled
                </label>
                <div className="mt-2">
                  <textarea
                    rows={1}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={format(new Date(meeting_datetime), "h:mm a")}
                  />
                </div>

                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
                <div className="mt-2">
                  <textarea
                    rows={1}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={location}
                  />
                </div>

                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Topics Discussed
                </label>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={topics_discussed}
                  />
                </div>

                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Next Steps:
                </label>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={next_steps}
                  />
                </div>

                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Resources:
                </label>

                <div className="mt-2">
                  {resources.length > 0 &&
                    resources.map((resource, index) => (

                      <Link to={resource.url} target="_blank"><button
                        key={index}
                        className="ml-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                      >
                        {resource.title}
                      </button></Link>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                    Meeting Log
                  </h1>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <button
                    onClick={handleEdit}
                    className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date Scheduled
              </label>
              <div className="mt-2">
                <textarea
                  rows={1}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  defaultValue={format(
                    new Date(meeting_datetime),
                    "EEEE, MMMM do, yyyy"
                  )}
                  readOnly
                />
              </div>

              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Time Scheduled
              </label>
              <div className="mt-2">
                <textarea
                  rows={1}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  defaultValue={format(new Date(meeting_datetime), "h:mm a")}
                  readOnly
                />
              </div>

              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <textarea
                  rows={1}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  defaultValue={location}
                  readOnly
                />
              </div>

              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Topics Discussed
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  defaultValue={topics_discussed}
                  readOnly
                />
              </div>

              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Next Steps:
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  defaultValue={next_steps}
                  readOnly
                />
              </div>


              <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Resources:
                </label>

              <div className="mt-2">
                  {resources.length > 0 &&
                    resources.map((resource, index) => (

                      <Link to={resource.url} target="_blank"><button
                        key={index}
                        className="ml-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                      >
                        {resource.title}
                      </button></Link>
                    ))}
                </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export { MeetingDetailPage };

{
  /* 
<label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
Add your comment
</label>
<div className="mt-2">
<textarea
  rows={4}
  name="comment"
  id="comment"
  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  defaultValue={''}
/>
</div> 
*/
}

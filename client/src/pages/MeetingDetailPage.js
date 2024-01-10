import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
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

  const { meeting_datetime, location, topics_discussed, next_steps } =
    selectedMeeting;

  //CONTINUE HERE - handle submit and edit form for meeting details***
  function handleSubmit() {
    fetch(`/api/meetings/${meetingID}`, {
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
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Meeting Log
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {updating ? (
            <div>
              <button onClick={handleSubmit}>Save</button>
              <button onClick={handleEdit}>Cancel</button>
              <h1>Meeting Details</h1>
              <h2>Meeting Date and Time:</h2>
              <p>{meeting_datetime}</p>
              <h2>Meeting Location:</h2>
              <input type="text" value={location} />
              <h2>Topics Discussed:</h2>
              <input type="text" value={topics_discussed} />
              <h2>Next Steps:</h2>
              <input type="text" value={next_steps} />
            </div>
          ) : (
            <div>
              <button onClick={handleEdit}>Edit</button>

              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date Scheduled
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={format(new Date(meeting_datetime), "EEEE, MMMM do, yyyy")}
                  readOnly 
                />
              </div>

              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Time Scheduled``
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  rows={4}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={format(new Date(meeting_datetime), "h:mm a")}
                  readOnly 
                />
              </div>

              <h2>Topics Discussed:</h2>
              <p>{topics_discussed}</p>
              <h2>Next Steps:</h2>
              <p>{next_steps}</p>


            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export { MeetingDetailPage };



{/* 
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
*/} 
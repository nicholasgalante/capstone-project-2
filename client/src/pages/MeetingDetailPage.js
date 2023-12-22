import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

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
    <div>
      {updating ? (
        <div>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleEdit}>Cancel</button>
          <h1>Meeting Details</h1>
          <h2>Meeting Date and Time:</h2>
          <input type="text" value={meeting_datetime} />
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
          <h1>Meeting Details</h1>
          <h2>Meeting Date and Time:</h2>
          <p>{meeting_datetime}</p>
          <h2>Meeting Location:</h2>
          <p>{location}</p>
          <h2>Topics Discussed:</h2>
          <p>{topics_discussed}</p>
          <h2>Next Steps:</h2>
          <p>{next_steps}</p>
          <button>View Attached Resources</button>
        </div>
      )}
    </div>
  );
}

export { MeetingDetailPage };

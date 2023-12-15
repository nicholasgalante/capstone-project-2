import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

function MeetingDetailPage() {
  const { meetingID } = useParams();
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <div>Please sign in to view meetings.</div>;
  }

  const selectedMeeting = user.meetings.find(
    (meeting) => meeting.id === parseInt(meetingID)
  );

  const { meeting_datetime, location, topics_discussed, next_steps } =
    selectedMeeting;

  return (
    <div>
      <h1>Meeting Details</h1>
      <h2>Meeting Date and Time:</h2>
      <p>{meeting_datetime}</p>
      <h2>Meeting Location:</h2>
      <p>{location}</p>
      <h2>Topics Discussed:</h2>
      <p>{topics_discussed}</p>
      <h2>Next Steps:</h2>
      <p>{next_steps}</p>
    </div>
  );
}

export { MeetingDetailPage };

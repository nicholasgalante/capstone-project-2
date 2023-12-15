import React, { useState, useEffect, useContext } from "react";
import { Link, redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function MeetingsPage() {
  const [formData, setFormData] = useState({
    meeting_datetime: "",
    location: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <div>Please sign in to view meetings.</div>;
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function getUserIDs() {
    if (user.company_name) {
      return {
        ...formData,
        organizer_id: user.id,
        mentor_id: user.id,
        student_id: user.student.id,
      };
    } else {
      return {
        ...formData,
        organizer_id: user.id,
        student_id: user.id,
        mentor_id: user.mentor.id,
      };
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    let meetingData = getUserIDs();
    console.log("STRINGIFIED DATA: ", JSON.stringify(meetingData));

    fetch("/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetingData),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.errors) {
          setIsLoading(false);
          setErrors(data.errors);
        } else {
          addMeetingToUser(data);
          setIsLoading(false);
          setFormData({
            meeting_datetime: "",
            location: "",
          });
        }
      });
  }

  function addMeetingToUser(meeting) {
    setUser({
      ...user,
      meetings: [...user.meetings, meeting],
    });
  }

  return (
    <div>
      <h1>Meetings</h1>
      <form onSubmit={handleSubmit}>
        <label>Create a new meeting</label>
        <input
          value={formData.meeting_datetime}
          onChange={handleChange}
          type="datetime-local"
          name="meeting_datetime"
        />
        <label>Location</label>
        <input
          value={formData.location}
          onChange={handleChange}
          type="text"
          name="location"
        />
        <button type="submit">Create Meeting</button>
        {errors.map((err) => err)}
      </form>
      <ul>
        {user.meetings.map((meeting) => (
          <li key={meeting.id}>
            <Link to={`/meetings/${meeting.id}`}>
              {meeting.meeting_datetime}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { MeetingsPage };

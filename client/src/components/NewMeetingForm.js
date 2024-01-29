import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function NewMeetingForm({ setErrors }) {
  const { user, setUser, userType } = useContext(UserContext);
  const [formData, setFormData] = useState({
    meeting_datetime: "",
    location: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function getUserIDs() {
    console.log(user)
    if (userType.user_type === "mentor") {
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

  function addMeetingToUser(meeting) {
    setUser({
      ...user,
      meetings: [...user.meetings, meeting],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    let meetingData = getUserIDs();
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
          setErrors(data.errors);
        } else {
          addMeetingToUser(data);
          setFormData({
            meeting_datetime: "",
            location: "",
          });
        }
      });
  }

  return (
    <div className="mt-10  sm:px-6 lg:px-8">
      <h1 className="text-base font-semibold leading-6 text-gray-900 mb-4">
        Schedule a New Meeting
      </h1>
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <div className="flex flex-col">
          <label>Date and Time</label>
          <input
            value={formData.meeting_datetime}
            onChange={handleChange}
            type="datetime-local"
            name="meeting_datetime"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col">
          <label>Location</label>
          <input
            value={formData.location}
            onChange={handleChange}
            type="text"
            name="location"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col h-full">
          <label className=" text-white ">Location</label>
          <button
            type="submit"
            className="mt-auto block rounded-md bg-indigo-600 px-3 py-1.5 max-h-10 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Schedule
          </button>
        </div>
      </form>
    </div>
  );
}

export { NewMeetingForm };

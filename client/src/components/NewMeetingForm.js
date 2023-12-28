import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

function NewMeetingForm() {
  const [formData, setFormData] = useState({
    meeting_datetime: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { user, setUser } = useContext(UserContext);

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

  function addMeetingToUser(meeting) {
    setUser({
      ...user,
      meetings: [...user.meetings, meeting],
    });
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
        <button
          type="submit"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Meeting
        </button>
        {errors.map((err) => err)}
      </form>
    </div>
  );
}

export { NewMeetingForm };

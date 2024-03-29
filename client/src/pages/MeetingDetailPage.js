import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams, Link } from "react-router-dom";
import { format, set } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ResourcesList } from "../components/ResourcesList";
import { ErrorMessage } from "../components/ErrorMessage";

function MeetingDetailPage() {
  const [meetingData, setMeetingData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [updating, setUpdating] = useState(false);
  const { meetingID } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/meetings/${meetingID}`)
      .then((response) => response.json())
      .then((data) => {
        setMeetingData(data);
        setUpdatedData(data);
      });
  }, [meetingID]);

  const {
    meeting_datetime,
    location,
    topics_discussed,
    next_steps,
    resources,
  } = meetingData;

  if (!user || !resources) {
    return <div>Loading...</div>;
  }

  function handleEdit() {
    setUpdating(!updating);
  }

  const handleAddResource = (newResource) => {
    if (
      meetingData.resources.find((resource) => resource.id === newResource.id)
    ) {
      setErrors(["Resource already attached to meeting."]);
    } else {
      console.log("ADD RESOURCE: ", newResource);
      fetch("/meeting_resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meeting_resource: {
            meeting_id: meetingID,
            resource_id: newResource.id,
          },
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.errors) {
            setErrors(data.errors);
          } else {
            setMeetingData({
              ...meetingData,
              resources: [...meetingData.resources, newResource],
            });
          }
        });
    }
  };

  function handleSaveChanges() {
    setErrors([]);
    fetch(`/meetings/${meetingID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ meeting: { ...updatedData } }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setMeetingData(data);
          setUpdating(false);
        }
      });
  }

  const handleFieldChange = (fieldName, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  function handleDeleteMeeting() {
    fetch(`/meetings/${meetingID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        setUser({
          ...user,
          meetings: user.meetings.filter(
            (meeting) => meeting.id !== parseInt(meetingID)
          ),
        });
        navigate("/meetings");
      }
    });
  }

  function handleDeleteMeetingResource(resourceId) {
    fetch(`/meeting_resources/${meetingID}/${resourceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meeting_id: meetingID,
        resource_id: resourceId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          // Handle errors if needed
          console.error("Error deleting meeting resource:", data.errors);
        } else {
          // Update the UI after successful deletion
          setMeetingData({
            ...meetingData,
            resources: meetingData.resources.filter(
              (resource) => resource.id !== resourceId
            ),
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting meeting resource:", error);
      });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {updating ? (
            <div>
              <div className="flex items-center justify-between mb-8 ">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Meeting Log
                </h1>

                <div className="flex justify-end flex-grow">
                  <button
                    onClick={handleSaveChanges}
                    className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleDeleteMeeting}
                    className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Delete Meeting
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="mt-2 block text-sm font-medium leading-6 text-gray-900"
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
                    readOnly
                  />
                </div>
                <label
                  htmlFor="comment"
                  className="mt-2 block text-sm font-medium leading-6 text-gray-900"
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
                    readOnly
                  />
                </div>
                <label
                  htmlFor="comment"
                  className="mt-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
                <div className="mt-2">
                  <textarea
                    rows={1}
                    name="comment"
                    id="comment"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={updatedData.location}
                    onChange={(e) =>
                      handleFieldChange("location", e.target.value)
                    }
                  />
                </div>
                <label
                  htmlFor="comment"
                  className="mt-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Topics Discussed
                </label>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={updatedData.topics_discussed}
                    onChange={(e) =>
                      handleFieldChange("topics_discussed", e.target.value)
                    }
                  />
                </div>
                <label
                  htmlFor="comment"
                  className="mt-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Next Steps
                </label>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={updatedData.next_steps}
                    onChange={(e) =>
                      handleFieldChange("next_steps", e.target.value)
                    }
                  />
                </div>
                <label
                  htmlFor="comment"
                  className="mt-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Attached Resources
                </label>
                <div className="mt-2">
                  {resources.length > 0
                    ? resources.map((resource) => (
                        <button
                          key={resource.id}
                          className="ml-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-500 hover:line-through hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                          onClick={() => {
                            handleDeleteMeetingResource(resource.id);
                          }}
                        >
                          {resource.title}
                        </button>
                      ))
                    : <div className="text-gray-500"> Attach resources using the list below. </div>}
                </div>

                <ResourcesList
                  meetingId={meetingID}
                  handleAddResource={handleAddResource}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Meeting Log
                </h1>
                <div className="flex justify-end flex-grow">
                  <button
                    onClick={handleEdit}
                    className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update Meeting Log
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
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  defaultValue={format(
                    new Date(meeting_datetime),
                    "EEEE, MMMM do, yyyy"
                  )}
                  readOnly
                />
              </div>

              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900 mt-2"
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
                className="block text-sm font-medium leading-6 text-gray-900 mt-2"
              >
                Location
              </label>
              <div className="mt-2">
                <textarea
                  rows={1}
                  name="comment"
                  id="comment"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  defaultValue={location}
                  readOnly
                />
              </div>

              <label
                htmlFor="comment"
                className="mt-2 block text-sm font-medium leading-6 text-gray-900"
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
                className="mt-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Next Steps
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  name="comment"
                  id="comment"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  defaultValue={next_steps}
                  readOnly
                />
              </div>

              <label
                htmlFor="comment"
                className="mt-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Attached Resources
              </label>

              <div className="mt-2">
                {resources.length > 0
                  ? resources.map((resource) => (
                      <Link to={resource.url} target="_blank" key={resource.id}>
                        <button className="ml-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400">
                          {resource.title}
                        </button>
                      </Link>
                    ))
                  : <div className="text-gray-400"> Currently, no resources are attached. Update meeting log to attach resources. </div>}
              </div>
            </div>
          )}
          <div className="mt-10">
            <ErrorMessage errors={errors} />
          </div>
        </div>
      </main>
    </div>
  );
}

export { MeetingDetailPage };

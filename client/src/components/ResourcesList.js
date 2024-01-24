import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ResourcesList({meetingId, onResourceAdded}) {
  const [resources, setResources] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });

  useEffect(() => {
    fetch("/my_resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
      });
  }, []);

  function handleAdd(resourceId){
    fetch("/meeting_resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({meeting_resource: {meeting_id: meetingId, resource_id: resourceId}}),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          onResourceAdded(resources.find((resource) => resource.id == resourceId))
        }
      });
  }

  return (
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 mt-8 flow-root -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      My Resources
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {resources.length > 0 &&
                    resources.map((resource) => (
                      <tr key={resource.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900">
                          <Link to={resource.url} target="_blank">
                            {resource.title}
                          </Link>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a className="text-indigo-600 hover:text-indigo-900" onClick={() => handleAdd(resource.id)}>
                            Attach to Meeting
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
  );
}

export { ResourcesList };

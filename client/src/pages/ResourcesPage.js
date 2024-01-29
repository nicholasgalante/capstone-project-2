import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ErrorMessage } from "../components/ErrorMessage";

function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [errors, setErrors] = useState([]);
  const { user } = useContext(UserContext);
  const { userType } = useContext(UserContext);
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

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    const ownerType = userType.user_type == "mentor" ? "Mentor" : "Student";
    fetch("/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner_type: ownerType,
        owner_id: user.id,
        ...formData,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setResources([...resources, data]);
        }
      });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleDelete(resourceId) {
    fetch(`/resources/${resourceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        setResources(
          resources.filter((resource) => resource.id !== resourceId)
        );
      }
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            My Resources
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Resources are links to helpful websites or articles. <br />
            Once created, attach them to a meeting.
          </p>
        </div>

        <div className="mt-10  sm:px-6 lg:px-8">
          <h1 className="text-base font-semibold leading-6 text-gray-900 mb-4">
            Create a New Resource
          </h1>
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="flex flex-col">
              <label>Title</label>
              <input
                value={formData.title}
                onChange={handleChange}
                type="datetime-text"
                name="title"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex flex-col">
              <label>URL</label>
              <input
                value={formData.url}
                onChange={handleChange}
                type="text"
                name="url"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex flex-col h-full">
              <label className=" text-white ">Location</label>
              <button
                type="submit"
                className="mt-auto block rounded-md bg-indigo-600 px-3 py-1.5 max-h-10 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
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
                          <a
                            className="text-gray-400 hover:text-red-500"
                            onClick={() => handleDelete(resource.id)}
                          >
                            Delete Resource
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10">
              <ErrorMessage errors={errors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ResourcesPage };

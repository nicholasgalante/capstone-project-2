import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function ResourcesList({handleAddResource}) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("/my_resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
      });
  }, []);

  return (
          <div className="mx-auto max-w-7xl min-w-full py-2 align-middle sm:px-6 lg:px-8 mt-8 flow-root -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                          <a className="text-indigo-600 hover:text-indigo-900" onClick={() => handleAddResource(resource)}>
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

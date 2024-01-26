import React, { useState, useEffect, useContext } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate, NavLink } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const { user, setUser, userType, loading, error } = useContext(UserContext);
  // const [matchedUser, setMatchedUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userType.user_type === "mentor") {
  //     setMatchedUser(user.student);
  //   } else {
  //     setMatchedUser(user.mentor);
  //   }
  // }, [user]);

  if (!user) {
    return navigate("/signin");
  }

  // if(!matchedUser){
  //   return <div>Loading...</div>
  // }

  function handleSignOut() {
    fetch("/logout", {
      method: "DELETE",
      credentials: "include",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/");
      }
    });
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <svg
                      class="h-8 w-8 text-indigo-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <line x1="3" y1="21" x2="21" y2="21" />{" "}
                      <path d="M4 21v-15a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v15" />{" "}
                      <path d="M9 21v-8a3 3 0 0 1 6 0v8" />
                    </svg>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}

                  <NavLink
                    to="/meetings"
                    className={({ isActive }) =>
                      isActive
                        ? " inline-flex items-center border-b-2  border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                        : "inline-flex items-center border-b-2  border-transparent px-1 pt-1 text-sm font-medium text-gray-900"
                    }
                  >
                    Meetings
                  </NavLink>

                  <NavLink
                    to="/calendar"
                    className={({ isActive }) =>
                      isActive
                        ? " inline-flex items-center border-b-2  border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                        : "inline-flex items-center border-b-2  border-transparent px-1 pt-1 text-sm font-medium text-gray-900"
                    }
                  >
                    {" "}
                    Calendar
                  </NavLink>

                  <NavLink
                    to="/resources"
                    className={({ isActive }) =>
                      isActive
                        ? " inline-flex items-center border-b-2  border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                        : "inline-flex items-center border-b-2  border-transparent px-1 pt-1 text-sm font-medium text-gray-900"
                    }
                  >
                    {" "}
                    My Resources
                  </NavLink>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div className="flex">
                    <Menu.Button className="relative flex mr-5 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.profile_image_url}
                        alt=""
                      />
                    </Menu.Button>
                    {/* <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={matchedUser.profile_image_url}
                        alt=""
                      />
                    </Menu.Button> */}
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            My Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleSignOut}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export { Navbar };

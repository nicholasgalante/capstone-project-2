import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../context/UserContext";

const navigation = [{ name: "Log in", href: "#" }];

function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="relative bg-white">
      {/* hearo section */}
      <section className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <svg
              className="h-10 w-10 text-indigo-600"
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
            <p className="text-base font-semibold leading-7 text-indigo-600">
              TechBridge
            </p>

            <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              Bridge your pathway to tech success
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Guiding the future of IT excellence with personalized one-to-one
              mentorships between university students and career professionals.{" "}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>

              <Link
                to="/signin"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {user ? (
                  <Link to="/meetings">Go to Dashboard</Link>
                ) : (
                  <Link to="/signin">Sign In</Link>
                )}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <img
            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}

export { Hero };

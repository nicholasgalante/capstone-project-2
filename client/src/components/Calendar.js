import { useState, useContext } from "react";
import { Fragment } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import {
  eachDayOfInterval,
  format,
  startOfMonth,
  endOfMonth,
  startOfToday,
  isToday,
  isSameMonth,
  isEqual,
  getDate,
  endOfWeek,
  parse,
  add,
  set,
  getDay,
} from "date-fns";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Calendar() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <div>Please sign in to view meetings.</div>;
  }

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy"));
  }

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy"));
  }

  function isDatetimeInMeetings(targetDatetime) {
    let formattedTargetDatetime = format(targetDatetime, "MM-dd-yyyy");

    //if formattedTargetDatetime exists within user.meetings, return that meeting id
    return user.meetings.find(meeting => {
      // Assuming each meeting object has a property for its date
      const meetingDate = format(meeting.meeting_datetime, "MM-dd-yyyy"); 
      return meetingDate === formattedTargetDatetime;
    });
  }

  function getMeetingID(targetDatetime) {
    let formattedTargetDatetime = format(targetDatetime, "MM-dd-yyyy");
    return user.meetings.find(meeting => {
      // Assuming each meeting object has a property for its date
      const meetingDate = format(meeting.meeting_datetime, "MM-dd-yyyy"); 
      return meetingDate === formattedTargetDatetime;
    })
  }

  return (
    <div className={"flex justify-center"}>
      <div className=" mt-5 max-w-7xl ml-10 mr-10 lg:flex lg:h-full lg:flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime="2022-01">{format(currentMonth, "MMMM yyyy")}</time>
          </h1>

          {/* Filter Dates Expanded View */}
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <button
                onClick={previousMonth}
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => {
                  setCurrentMonth(format(today, "MMMM-yyyy"));
                  setSelectedDay(today);
                }}
                type="button"
                className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                onClick={nextMonth}
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Filter Dates Mobile View */}
            <Menu as="div" className="relative ml-6 md:hidden">
              <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Go to today
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>

        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          {/* Days of the week */}
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
            <div className="bg-white py-2">
              M<span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="bg-white py-2">
              W<span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="bg-white py-2">
              F<span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">at</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">un</span>
            </div>
          </div>

          {/* Days grid expanded view*/}
          <div className="flex bg-dd text-xs  bg-gray-100 leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px ">
              {days.map((day, dayIdx) => (
                <button
                  onClick={() => setSelectedDay(day)}
                  key={day.toString()}
                  type="button"
                  className={classNames(
                    colStartClasses[getDay(day)],
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-indigo-600",
                    !isEqual(day, selectedDay) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      !isToday(day) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      !isToday(day) &&
                      "text-gray-500",
                    "flex h-20 flex-col px-3 py-2 bg-white hover:bg-gray-100 focus:z-10 "
                  )}
                >
                  <time
                    dateTime={format(day, "yyyy-MM-dd")}
                    className={
                      isEqual(day, selectedDay)
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                        : undefined
                    }
                  >
                    {format(day, "d")}
                  </time>
                  {/* Render Events */}
                  {isDatetimeInMeetings(day) ? (
                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                      <Link to={`/meetings`}>{"Meeting"}</Link>
                    </p>
                  ) : null}
              
                </button>
              ))}
            </div>

            {/* Days Grid Mobile View */}
            <div className="isolate grid w-full grid-cols-7 grid-rows-5 gap-px lg:hidden">
              {days.map((day) => (
                <button
                  onClick={() => setSelectedDay(day)}
                  key={day.toString()}
                  type="button"
                  className={classNames(
                    colStartClasses[getDay(day)],
                    isSameMonth(day, today) ? "bg-white" : "bg-gray-50",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-indigo-600",
                    !isEqual(day, selectedDay) &&
                      isSameMonth(day, today) &&
                      !isToday(day) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isSameMonth(day, today) &&
                      !isToday(day) &&
                      "text-gray-500",
                    "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
                  )}
                >
                  <time
                    dateTime={format(day, "yyyy-MM-dd")}
                    className={classNames(
                      isEqual(day, selectedDay) &&
                        "flex h-6 w-6 items-center justify-center rounded-full",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-indigo-600",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      "ml-auto"
                    )}
                  >
                    {format(day, "d")}
                  </time>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Calendar };

let colStartClasses = [
  "",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];

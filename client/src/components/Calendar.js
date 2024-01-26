import { useState, useContext } from "react";
import { Fragment } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
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
  const { user } = useContext(UserContext);

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
    return user.meetings.find((meeting) => {
      const meetingDate = format(meeting.meeting_datetime, "MM-dd-yyyy");
      return meetingDate === formattedTargetDatetime;
    });
  }

  function getMeetingID(targetDatetime) {
    let formattedTargetDatetime = format(targetDatetime, "MM-dd-yyyy");
    return user.meetings.find((meeting) => {
      const meetingDate = format(meeting.meeting_datetime, "MM-dd-yyyy");
      return meetingDate === formattedTargetDatetime;
    });
  }

  return (
    <div className={"flex justify-center"}>
      <div className="mt-5 max-w-7xl ml-10 mr-10">
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 ">
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
          </div>
        </header>

        <div className="shadow ring-1 ring-black ring-opacity-5">
          {/* Days of the week */}
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700">
            <div className="bg-white py-2">Mon</div>
            <div className="bg-white py-2">Tue</div>
            <div className="bg-white py-2">Wed</div>
            <div className="bg-white py-2">Thu</div>
            <div className="bg-white py-2">Fri</div>
            <div className="bg-white py-2">Sat</div>
            <div className="bg-white py-2">Sun</div>
          </div>

          {/* Days grid*/}
          <div className="flex bg-dd text-xs  bg-gray-100 leading-6 text-gray-700">
            <div className="grid grid-cols-7 gap-px bg-gray-100 leading-6 text-gray-700">
              {days.map((day) => (
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

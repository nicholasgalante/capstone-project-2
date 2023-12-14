import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function MeetingsPage(){
   const [meetings, setMeetings] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   
   useEffect(() => {
      fetch("http://localhost:3000/meetings")
         .then((r) => r.json())
         .then((meetings) => {
            setMeetings(meetings);
            setIsLoading(false);
         });
   }, []);
   
   if (isLoading) return <p>Loading...</p>;
   
   return (
      <div>
         <h1>Meetings</h1>
         <ul>
            {meetings.map((meeting) => (
               <li key={meeting.id}>
                  <Link to={`/meetings/${meeting.id}`}>{meeting.name}</Link>
               </li>
            ))}
         </ul>
      </div>
   );
}

export  {MeetingsPage};
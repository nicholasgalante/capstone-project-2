import React, { useState } from "react";
import { StudentSignUpForm } from "../components/StudentSignUpForm";
import { MentorSignUpForm } from "../components/MentorSignUpForm";

function SignUpPage() {
   const [userType, setUserType] = useState("student");

   const handleUserTypeChange = (event) => {
      setUserType(event.target.value);
   };

   return (
      <div>
         <h1>Sign Up Page</h1>

         <div>
            <label>
               <input
                  type="radio"
                  value="student"
                  checked={userType === "student"}
                  onChange={handleUserTypeChange}
               />
               Student
            </label>
            <label>
               <input
                  type="radio"
                  value="mentor"
                  checked={userType === "mentor"}
                  onChange={handleUserTypeChange}
               />
               Mentor
            </label>
         </div>

         {userType === "student" ? <StudentSignUpForm /> : <MentorSignUpForm />}
      </div>
   );
}

export { SignUpPage };
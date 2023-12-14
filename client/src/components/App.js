import { UserProvider } from "../context/UserContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SignInForm } from "./SignInForm";
import { StudentSignUpForm } from "./StudentSignUpForm.js";
import { MentorSignUpForm } from "./MentorSignUpForm.js";
import { SignUpPage } from "../pages/SignUpPage.js";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signin" element={<SignInForm />} /> 
          <Route path="/signup/students" element={<StudentSignUpForm />} />  
          <Route path="/signup/mentors" element={<MentorSignUpForm />} />   
          <Route path="/signup" element={<SignUpPage />} />    
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

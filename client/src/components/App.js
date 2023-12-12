import { UserProvider } from "../context/UserContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SignInForm } from "./SignInForm";
import { StudentSignUpForm } from "./StudentSignUpForm";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signin" element={<SignInForm />} /> 
          <Route path="/signup/student" element={<StudentSignUpForm />} />         
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

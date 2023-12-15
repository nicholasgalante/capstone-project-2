import { UserProvider } from "./context/UserContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SignInForm } from "./components/SignInForm";
import { SignUpPage } from "./pages/SignUpPage.js";
import { MeetingsPage } from "./pages/MeetingsPage.js";
import { MeetingDetailPage } from "./pages/MeetingDetailPage.js";
import { Hero } from "./components/Hero.js";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <Navbar />  
        <Routes>
          <Route path="/" element={<Hero/>} />
          <Route path="/signin" element={<SignInForm />} /> 
          <Route path="/signup" element={<SignUpPage />} /> 
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/meetings/:meetingID" element={<MeetingDetailPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

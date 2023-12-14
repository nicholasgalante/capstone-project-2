import { UserProvider } from "./context/UserContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SignInForm } from "./components/SignInForm";
import { SignUpPage } from "./pages/SignUpPage.js";
import { MeetingsPage } from "./pages/MeetingsPage.js";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <Navbar />  
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signin" element={<SignInForm />} /> 
          <Route path="/signup" element={<SignUpPage />} /> 
          <Route path="/meetings" element={<MeetingsPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

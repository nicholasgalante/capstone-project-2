import { UserProvider } from "../context/UserContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SignInForm } from "./SignInForm";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signin" element={<SignInForm />} />          
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

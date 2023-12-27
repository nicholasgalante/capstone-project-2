import { UserProvider } from "./context/UserContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SignUpPage } from "./pages/SignUpPage.js";
import { MeetingsPage } from "./pages/MeetingsPage.js";
import { MeetingDetailPage } from "./pages/MeetingDetailPage.js";
import { HomePage } from "./pages/HomePage.js";
import { SignInPage } from "./pages/SignInPage.js";
import { Dashboard } from "./pages/Dashboard.js";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/meetings"
            element={
              <>
                <Navbar />
                <MeetingsPage />
              </>
            }
          />
          <Route
            path="/meetings/:meetingID"
            element={
              <>
                <Navbar />
                <MeetingDetailPage />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

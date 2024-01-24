import { UserProvider } from "./context/UserContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { SignUpPage } from "./pages/SignUpPage.js";
import { MeetingsPage } from "./pages/MeetingsPage.js";
import { MeetingDetailPage } from "./pages/MeetingDetailPage.js";
import { HomePage } from "./pages/HomePage.js";
import { SignInPage } from "./pages/SignInPage.js";
import { Calendar } from "./components/Calendar.js";
import { ResourcesPage } from "./pages/ResourcesPage.js";

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
          <Route
            path="/calendar"
            element={
              <>
                <Navbar />
                <Calendar />
              </>
            }
          />
          <Route
            path="/resources"
            element={
              <>
                <Navbar />
                <ResourcesPage />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

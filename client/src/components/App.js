import { UserProvider } from "../context/UserContext.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

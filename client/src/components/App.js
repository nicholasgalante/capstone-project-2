import { UserProvider } from "../context/UserContext.js";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

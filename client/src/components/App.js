import { UserProvider } from "../context/UserContext.js";
// import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar";

function App() {
  return (
    <UserProvider>
      "HI"
      {/* <Routes> */}
        {/* <Route path="/" element={<Navbar />} /> */}
      {/* </Routes> */}
    </UserProvider>
  );
}

export default App;

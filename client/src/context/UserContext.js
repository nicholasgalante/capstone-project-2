import { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  console.log(user)

  useEffect(() => {
    fetch("/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  console.log(user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
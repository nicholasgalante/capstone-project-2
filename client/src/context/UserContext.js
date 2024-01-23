import { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  console.log("USER DATA: ", user, userType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, userTypeData] = await Promise.all([
          fetch("/user").then((res) => res.json()),
          fetch("/user_type").then((res) => res.json()),
        ]);

        setUser(userData);
        setUserType(userTypeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser, userType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

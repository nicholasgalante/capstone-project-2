import { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext({
  user: null,
  userType: null,
  loading: false,
  error: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch("/user");
        const userTypeResponse = await fetch("/user_type");

        if (!userResponse.ok) {
          // Handle error for /user endpoint
          setError({
            error: `Error fetching user data: ${userResponse.status}`,
          });
          return;
        }

        if (!userTypeResponse.ok) {
          // Handle error for /user_type endpoint
          setError(
            new Error(
              `Error fetching user type data: ${userTypeResponse.status}`
            )
          );
          return;
        }

        const userData = await userResponse.json();
        const userTypeData = await userTypeResponse.json();

        setUser(userData);
        setUserType(userTypeData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, userType, setUserType, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

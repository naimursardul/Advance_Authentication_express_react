import { createContext, useContext, useEffect, useState } from "react";
import { client } from "./utils.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const userExisted = localStorage.getItem("userExisted");

  //   CHECKING AUTH
  const checkAuth = async () => {
    try {
      const res = await client.get("/auth/check-auth");
      if (res?.data.user) {
        setUser(res.data?.user);
        !userExisted && localStorage.setItem("userExisted", true);
      }
    } catch (error) {
      setUser(null);
      userExisted && localStorage.removeItem("userExisted");
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, authLoader: false, userExisted }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth, AuthProvider };

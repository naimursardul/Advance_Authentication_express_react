import { createContext, useContext, useEffect, useState } from "react";
import { client } from "./utils.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const userExisted = localStorage.getItem("userExisted");

  //   CHECKING AUTH
  const checkAuth = async () => {
    console.log("first");
    try {
      const res = await client.get("/auth/check-auth");
      if (res?.data.user) {
        setUser(res.data?.user);
        !userExisted && localStorage.setItem("userExisted", true);
      }
      return;
    } catch (error) {
      setUser(null);
      userExisted && localStorage.removeItem("userExisted");
      return;
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

const useAuth = () => {
  const authDetails = useContext(AuthContext);
  if (!authDetails?.user && authDetails?.userExisted) {
    authDetails.authLoader = true;
  }
  return { ...authDetails };
};

export { AuthContext, useAuth, AuthProvider };

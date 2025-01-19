import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const ProtectedRoute = ({ element: Component, roles }) => {
  const { userExisted, user } = useAuth();

  if (!userExisted) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  console.log(1);
  if (!roles.includes(user?.role) && !roles.includes("all")) {
    console.log(2);
    // Redirect to home if the actionName is false
    return <Navigate to="/" />;
  }

  // Render the component if authenticated and actionName is valid
  return Component;
};

export default ProtectedRoute;

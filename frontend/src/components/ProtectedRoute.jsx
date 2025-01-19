import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const ProtectedRoute = ({ element: Component, actionName }) => {
  const { user, userExisted } = useAuth();

  if (!userExisted) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  if (actionName === false) {
    // Redirect to home if the actionName is false
    return <Navigate to="/" />;
  }

  // Render the component if authenticated and actionName is valid
  return Component;
};

export default ProtectedRoute;

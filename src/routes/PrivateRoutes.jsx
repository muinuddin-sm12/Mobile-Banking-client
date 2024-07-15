import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) return <p>Loading...</p>;
  if (user) return children;
  return <Navigate to="/" state={location.pathname} replace={true}/>;
};

export default PrivateRoutes;
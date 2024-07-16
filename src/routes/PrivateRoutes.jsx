import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({children}) => {
  const location = useLocation();
  // if (user) return children;
  return <Navigate to="/dashboard" state={location.pathname} replace={true}/>;
};

export default PrivateRoutes;
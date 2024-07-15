const PrivateRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) return <p>Loading...</p>;
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace={true}/>;
};

export default PrivateRoutes;
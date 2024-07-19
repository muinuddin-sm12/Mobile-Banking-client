import { useLocation } from "react-router-dom";
import UserDashboard from "../../components/UserDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminDashboard from "../../components/AdminDashboard";
import AgentDashboard from "../../components/AgentDashboard";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
//   const { email } = location.state;
  const email = location.state?.email || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:9000/users");
        setUsers(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);

  // console.log(users)
  const currentUser = users.find(
    (user) => user?.email === email || user?.number === email
  );
//   console.log(currentUser)
  return (
    <div>
      {currentUser?.role === "Agent" && <AgentDashboard user={currentUser} />}
      {currentUser?.role === "User" && <UserDashboard user={currentUser} />}
      {currentUser?.role === "Admin" && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;

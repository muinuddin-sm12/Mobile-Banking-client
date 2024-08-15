import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Transactions from "./modal/Transactions";

const AdminDashboard = () => {
  const [allUser, setAllUser] = useState([]);
  const [users, setUsers] = useState([]);
  //   const [agent, setAgent] = useState([])
  const [agentRequests, setAgentRequests] = useState([]);
  const [userr] = useState([]);
  const [adminData, setAdminData] = useState("");
  const navigate = useNavigate();

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://mobile-banking-server-smoky.vercel.app/users");
        const userData = data.filter(
          (f) => f.role === "User" || f.role === "Agent"
        );
        setUsers(userData);
        const admin = data.find((data) => data.role === "Admin");
        setAdminData(admin);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://mobile-banking-server-smoky.vercel.app/users");
        setAllUser(response.data);
      } catch (error) {
        // console.log(error)
      }
    };
    fetch();
  }, []);
  useEffect(() => {
    const agent = allUser.filter(
      (u) => u.request === "Pending" || u.request === "Accepted"
    );
    setAgentRequests(agent);
  }, [allUser]);

  const handleLogout = () => {
    navigate("/");
    toast.success("Successfully Logout");
  };
  const handleStatus = async (id) => {
    try {
      const updatedUser = {
        status: "Verified",
        balance: 40,
      };
      const response = await axios.put(
        `https://mobile-banking-server-smoky.vercel.app/users/${id}`,
        updatedUser
      );
      const updatedUsers = users?.map((u) =>
        u._id === id
          ? {
              ...u,
              status: response.data.status,
              balance: response.data.balance,
            }
          : u
      );
      setUsers(updatedUsers);
      toast.success("User verified successfully");
    } catch (error) {
      console.error("Error updating user status", error);
    }
  };
  const handleRole = async (id) => {
    try {
      const updatedUser = {
        role: "Agent",
        request: "Accepted",
        balance: 40000,
      };
      const response = await axios.put(
        `https://mobile-banking-server-smoky.vercel.app/users/${id}`,
        updatedUser
      );
      const updatedUsers = allUser?.map((user) =>
        user._id === id
          ? {
              ...user,
              status: response.data.role,
              request: response.data.request,
              balance: response.data.balance,
            }
          : user
      );
      // console.log('update user', updatedUser)
      setAllUser(updatedUsers);
      toast.success("User Become Agent");
    } catch (error) {
      console.error("Error updating user status", error);
    }
  };
  const openTransactions = () => {
    setTransactionModalOpen(true);
  };
  const closeTransactions = () => {
    setTransactionModalOpen(false);
  };
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="lg:w-[900px] h-auto md:h-[480px]  flex flex-col md:flex-row overflow-hidden p-6">
        <div className="lg:w-[300px] bg-[rgba(88,228,228,0.1)] md:rounded-l-xl p-6">
          <h1 className="text-2xl font-semibold text-white text-center mb-8">
            Personal Information
          </h1>
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full border-2 border-[#007BFF] mb-4 overflow-hidden">
              <img className="object-cover" src={adminData?.image} alt="" />
            </div>
            {userr?.status === "Pending" ? (
              <span className="bg-yellow-100 px-2 py-1 rounded-full text-[12px] font-medium text-orange-400">
                Status: Pending
              </span>
            ) : (
              <div className="text-orange-400 flex items-center gap-1 bg-yellow-200 px-2 py-1 rounded-full text-[12px] font-medium ">
                <span>Admin</span>
                <FaCrown />
              </div>
            )}
            <div className="text-gray-300 font-medium mt-3">
              <table>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td className="pl-4">{adminData?.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td className="pl-4">{adminData?.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>:</td>
                  <td className="pl-4">{adminData?.number}</td>
                </tr>
              </table>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-white bg-[#007BFF] mt-6"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-[600px] h-screen md:h-auto bg-[rgba(59,72,139,0.11)] overflow-auto">
          <div className="p-6 pt-10 overflow-y-auto">
            <div className="flex justify-between mb-2 relative">
              <h1 className="text-gray-200 font-medium">Manage Users</h1>
              <button
                onClick={openTransactions}
                className="bg-[#007BFF] absolute right-0 top-[-22px] px-3 py-1 rounded-lg text-sm text-white font-medium"
              >
                Transactions
              </button>
            </div>
            <Transactions
              isOpen={isTransactionModalOpen}
              onRequestClose={closeTransactions}
            />
            {/* manage users */}
            <div className="overflow-x-auto mb-6 ">
              <table className="min-w-full divide-y text-sm divide-gray-900">
                <thead className="bg-[rgba(88,228,228,0.1)] text-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 text-gray-300  divide-y divide-gray-700 ">
                  {users
                    ?.sort((a) => (a.status === "Pending" ? -1 : 1))
                    .map((data, index) => (
                      <tr key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span>{index+1}. </span> {data?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {data?.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {data?.status === "Pending" ? (
                            <div className="flex items-center gap-2">
                              <p className="font-medium">Pending</p>
                              <button
                                onClick={() => handleStatus(data?._id)}
                                className="bg-green-500 hover:bg-black text-white font-medium text-sm py-1 px-2 rounded"
                              >
                                Approve
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-200 text-sm">
                                Verified
                              </p>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <h1 className="text-gray-200 mb-2 font-medium">Agent Requests</h1>
            {/* Agent Request  */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y text-sm divide-gray-900">
                <thead className="bg-[rgba(88,228,228,0.1)] text-gray-300 text-gray-300 ">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Request
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700 text-gray-200">
                  {agentRequests
                    ?.sort((a) => (a.status === "Pending" ? -1 : 1))
                    .map((data, index) => (
                      <tr key={data._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span>{index+1}. </span> {data?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {data?.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {data?.request === "Pending" ? (
                            <div className="flex items-center gap-2">
                              {/* <p className="font-medium">Pending</p> */}
                              <button
                                onClick={() => handleRole(data?._id)}
                                className="bg-green-500 hover:bg-black text-white font-medium text-sm py-1 px-2 rounded"
                              >
                                Accept
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-200 text-sm">
                                Accepted
                              </p>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdSearch } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [allUser, setAllUser] = useState([])
  const [users, setUsers] = useState([]);
//   const [agent, setAgent] = useState([])
  const [agentRequests, setAgentRequests] = useState([])
  const [userr] = useState([]);
  const [adminData, setAdminData] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:9000/users");
        setUsers(data);
        const admin = data.find((data) => data.role === 'Admin');
        setAdminData(admin)
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetch = async () => {
        try{
            const response = await axios.get('http://localhost:9000/users')
            setAllUser(response.data)
        }catch(error){
            console.log(error)
        }
    }
    fetch()
  },[])
  useEffect(() => {
    const agent = allUser.filter((u) => u.request === 'Pending' || u.request === 'Accepted')
    setAgentRequests(agent)
  },[allUser])

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
        `http://localhost:9000/users/${id}`,
        updatedUser
      );
      const updatedUsers = users?.map((u) =>
        u._id === id ? { ...u, status: response.data.status, balance: response.data.balance } : u
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
        `http://localhost:9000/users/${id}`,
        updatedUser
      );
      const updatedUsers = allUser?.map((user) =>
        user._id === id ? { ...user, status: response.data.role, request: response.data.request, balance: response.data.balance } : user
      );
      console.log('update user', updatedUser)
      setAllUser(updatedUsers);
      toast.success("User Become Agent");
    } catch (error) {
      console.error("Error updating user status", error);
    }
  };
//   console.log('all agent requested', allUser)
  console.log('all agent requested', agentRequests)
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="lg:w-[900px] h-[421px] rounded-lg flex shadow-md border overflow-hidden">
        <div className="lg:w-[300px] p-6">
          <h1 className="text-2xl font-semibold text-center mb-8">
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
            <div className="text-gray-700 font-medium mt-3">
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
        <div className="lg:w-[600px] overflow-auto">
          <div className=" bg-[#90c4fd] p-6 flex justify-center">
            <div className="flex items-center border w-[400px] rounded-full overflow-hidden">
              <input
                type="text"
                name=""
                id=""
                className="w-full p-2 pl-4 outline-none"
                placeholder="Search by Name"
              />
              <div className="px-4 text-lg">
                <IoMdSearch />
              </div>
            </div>
          </div>
          <div className="p-6 overflow-y-auto">
            <h1 className=" font-medium">Agent Requests</h1>

            {/* Agent Request  */}
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full divide-y text-sm divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agentRequests.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.name}
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
                            <p className="font-medium text-gray-700 text-sm">
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

            <h1 className=" font-medium">Manage Users</h1>

            {/* manage users */}
            <div className="mt-6">
              <table className="min-w-full divide-y text-sm divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Make Agent
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.email}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        {data?.role === "User" ? (
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">Normal User</p>
                            <button
                              // onClick={() => handleUser(data?._id)}
                              className="bg-[#007BFF] hover:bg-black text-white font-medium text-sm py-1 px-2 rounded"
                            >
                              Make Agent
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Agent</p>
                            <button
                              // onClick={() => handleUser(data?._id)}
                              className=" hover:bg-black text-black border hover:text-white font-light text-sm py-1 px-2 rounded"
                            >
                              Make User
                            </button>
                          </div>
                        )}
                      </td> */}
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
                            <p className="font-medium text-gray-700 text-sm">
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

            <h1 className=" font-medium">History</h1>
            {/* Transaction history */}
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full divide-y text-sm divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users?.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.status === "Pending" ? (
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Pending</p>
                            <button
                            //   onClick={() => handleStatus(data?._id)}
                              className="bg-green-500 hover:bg-black text-white font-medium text-sm py-1 px-2 rounded"
                            >
                              Approve
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-700 text-sm">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

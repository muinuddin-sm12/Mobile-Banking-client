/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoCheckCircleFill } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AgentDashboard = ({ user }) => {
  const [users] = useState([]);
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Successfully Logout");
    navigate("/");
  };
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/users");
        // const data = response.find((u) => u._id === user._id && u.request === 'Accepted')
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedData();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      const currentUserData = data.find((u) =>u._id === user._id);
      setCurrentUser(currentUserData);
    }
  }, [data, user._id]);
  console.log(user._id, currentUser._id)
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-[900px] min-h-[421px] rounded-lg shadow-md border flex flex-col lg:flex-row overflow-hidden">
        <div className="p-6 w-full lg:w-[320px] bg-blue-100">
          <div className="w-full p-6 lg:w-[300px] bg-purple-300rounded-l-xl overflow-hidden">
            <h1 className="text-2xl font-semibold text-center mb-8">
              Personal Information
            </h1>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full border-2 border-[#007BFF] mb-4 overflow-hidden">
                <img className="object-cover" src={currentUser?.image} alt="" />
              </div>
              {currentUser?.status === "Pending" ? (
                <span className="bg-yellow-100 px-2 py-1 rounded-full text-[12px] font-medium text-orange-400">
                  Status: Pending
                </span>
              ) : (
                <div className="text-green-700 flex items-center gap-1 bg-green-200 px-2 py-1 rounded-full text-[12px] font-medium ">
                  <span>{currentUser?.role}</span>
                  <MdVerified />
                </div>
              )}
              <div className="text-gray-700 font-medium mt-3">
                <table>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td className="pl-4">{currentUser?.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td className="pl-4">{currentUser?.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>:</td>
                    <td className="pl-4">{currentUser?.number}</td>
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
        </div>
        <div className="p-6 flex-1 overflow-x-auto">
          <h1 className="text-xl font-medium text-center">Agent Dashboard</h1>

          {/* manage transaction */}
          <div className="overflow-x-auto mt-10">
            <div className="text-sm font-medium  px-3 py-1 border rounded-full flex justify-center items-center w-[160px] mb-3 bg-[#acd4fe] text-[#2a65a4]">
              <h3 className="">Manage Transaction</h3>
            </div>
            <table className="min-w-full divide-y text-sm divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                      {data?.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data?.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data?.status === "Pending" ? (
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Pending</p>
                          <button
                            //   onClick={() => handlePremium(data?._id)}
                            className="bg-green-500 hover:bg-black text-white font-medium text-sm py-1 px-2 rounded"
                          >
                            Procceed
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-500">Accepted</p>
                          <GoCheckCircleFill />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* transaction history  */}
          {/* <div className="overflow-x-auto mt-6">
            <div className="text-sm font-medium  px-3 py-1 border rounded-full flex justify-center items-center w-[160px] mb-3 bg-[#acd4fe] text-[#2a65a4]">
              <h3 className="">Transaction History</h3>
            </div>
            <table className="min-w-full divide-y text-sm divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                      {data?.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data?.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data?.status === "Pending" ? (
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Pending</p>
                          <button
                            //   onClick={() => handlePremium(data?._id)}
                            className="bg-green-500 hover:bg-black text-white font-medium text-sm py-1 px-2 rounded"
                          >
                            Procceed
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-500">Accepted</p>
                          <GoCheckCircleFill />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;

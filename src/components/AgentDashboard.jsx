import { useState } from "react";
import toast from "react-hot-toast";
import { GoCheckCircleFill } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AgentDashboard = () => {
  const [data] = useState([]);
  const navigate = useNavigate()
  const handleLogout = () => {
    toast.success('Successfully Logout');
    navigate('/')
  }
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-[900px] h-[421px] rounded-lg shadow-md border flex overflow-hidden">
        <div className="p-6 w-[300px] bg-purple-300">
        <div className="w-full p-6 lg:w-[300px] bg-purple-300rounded-l-xl overflow-hidden">
          <h1 className="text-2xl font-semibold text-center mb-8">
            Personal Information
          </h1>
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full border-2 border-[#007BFF] mb-4 overflow-hidden">
              <img className="object-cover" src={data?.image} alt="" />
            </div>
            {data?.status === "Pending" ? (
              <span className="bg-yellow-100 px-2 py-1 rounded-full text-[12px] font-medium text-orange-400">Status: Pending</span>
            ) : (
              <div className="text-green-700 flex items-center gap-1 bg-green-200 px-2 py-1 rounded-full text-[12px] font-medium ">
                <span>Agent</span>
                <MdVerified/>
                </div>
            )}
            <div className="text-gray-700 font-medium mt-3">
              <table>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td className="pl-4">{data?.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td className="pl-4">{data?.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>:</td>
                  <td className="pl-4">{data?.number}</td>
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
        <div className="p-6 flex-1">
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
                {data?.map((data) => (
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
          <div className="overflow-x-auto mt-6">
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
                {data?.map((data) => (
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
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;

/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoCheckCircleFill } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AgentDashboard = ({ user }) => {
  const [data, setData] = useState([]);
  const [cashInRequest, setCashInRequest] = useState([]);
  const [cashOutRequest, setCashOutRequest] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [cashInUser, setCashInUser] = useState([]);
  const [cashOutUser, setCashOutUser] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Successfully Logout");
    navigate("/");
  };
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/users");
        setData(response.data);
      } catch (error) {
        // console.log(error);
      }
    };
    const fetchCashInRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/transactionRequests"
        );
        const cashInRequests = response.data.filter(
          (c) => c.reqType === "Cash-In"
        );
        const cashOutRequests = response.data.filter(
          (o) => o.reqType === "Cash-Out"
        );
        setCashOutRequest(cashOutRequests);
        setCashInRequest(cashInRequests);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchedData();
    fetchCashInRequests();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      const currentUserData = data.find((u) => u._id === user._id);
      setCurrentUser(currentUserData);
    }
  }, [data, user._id]);

  const handleCashIn = async (id) => {
    try {
      // Fetch the transaction request details
      const transactionResponse = await axios.get(
        `http://localhost:9000/transactionRequests/${id}`
      );
      const transactionRequest = transactionResponse.data;
      setCashInUser(transactionRequest);
      // Update transaction request status to 'Accepted'
      const updateData = { status: "Accepted", acceptAgent: user?.number };
      await axios.put(
        `http://localhost:9000/transactionRequests/${id}`,
        updateData
      );
      // Calculate new agent balance
      const newAgentBalance =
        parseFloat(currentUser.balance) -
        parseFloat(transactionRequest.balance);
      // console.log(newAgentBalance);
      // Update agent balance
      const updateBalance = { balance: newAgentBalance };
      await axios.put(
        `http://localhost:9000/users/${currentUser._id}`,
        updateBalance
      );
      // Fetch updated list of Cash-In requests
      const response = await axios.get(
        "http://localhost:9000/transactionRequests"
      );
      const cashInRequests = response.data.filter(
        (c) => c.reqType === "Cash-In"
      );
      // Update state
      setCashInRequest(cashInRequests);
      setCurrentUser({ ...currentUser, balance: newAgentBalance });
      toast.success("Transaction Successful");
    } catch (error) {
      // console.log(error);
    }
  };
  const handleCashOut = async (id) => {
    try {
      // Fetch the transaction request details
      const transactionResponse = await axios.get(
        `http://localhost:9000/transactionRequests/${id}`
      );
      const transactionRequest = transactionResponse.data;
      setCashOutUser(transactionRequest);
      // Update transaction request status to 'Accepted'
      const updateData = { status: "Accepted", acceptAgent: user?.number};
      await axios.put(
        `http://localhost:9000/transactionRequests/${id}`,
        updateData
      );
      // Calculate new agent balance
      const newAgentBalance =
        parseFloat(currentUser.balance) +
        parseFloat(transactionRequest.balance);
      // Update agent balance
      const updateBalance = { balance: newAgentBalance };
      await axios.put(
        `http://localhost:9000/users/${currentUser._id}`,
        updateBalance
      );
      // Fetch updated list of Cash-In requests
      const response = await axios.get(
        "http://localhost:9000/transactionRequests"
      );
      const cashInRequests = response.data.filter(
        (c) => c.reqType === "Cash-Out"
      );
      // Update state
      setCashOutRequest(cashInRequests);
      setCurrentUser({ ...currentUser, balance: newAgentBalance });
      toast.success("Transaction Successful");
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="max-w-[900px] min-h-[421px] flex flex-col md:flex-row justify-center overflow-hidden  p-6">
        <div className="p-6 w-full md:w-[420px] md:rounded-l-xl bg-[rgba(88,228,228,0.1)]">
          <div className="w-full p-6 lg:w-[300px] rounded-l-xl">
            <h1 className="text-2xl font-medium text-gray-200 text-center mb-8">
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
              <div className="text-gray-300 font-medium mt-3">
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
        <div className="p-6 w-full overflow-hidden bg-[rgba(59,72,139,0.11)] md:rounded-r-xl">
          <h1 className="text-2xl text-gray-200 font-medium text-center">Agent Dashboard</h1>
          {/* manage transaction */}
          <div className="overflow-y-auto overflow-x-auto mt-10">
            <div className="text-sm font-medium flex flex-col-reverse gap-3 md:gap-0 md:flex-row  justify-between items-start md:items-center md:mb-3 text-[#4189d6]">
              <h3 className="px-3 py-1 border rounded-full bg-[#afd5fd]">
                Manage Transaction
              </h3>
              <h3 className="text-gray-300 ">
                Total balance:{" "}
                <span>
                  {user.balance
                    ? parseFloat(currentUser?.balance).toFixed(2)
                    : "00.00"}{" "}
                  BDT
                </span>
              </h3>
            </div>
            {/* Cash-Out  */}
            <p className="mt-6 mb-1 text-sm text-gray-200 font-semibold inline-block">
              Cash-Out Requests
            </p>
            <table className="min-w-full divide-y text-sm divide-gray-300">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Request Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-300  divide-y divide-gray-200">
                {cashOutRequest
                  ?.sort((a) => (a.status === "Pending" ? -1 : 1))
                  .map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.balance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.reqType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.status === "Pending" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCashOut(data?._id)}
                              className="bg-green-500 hover:bg-black text-white font-medium text-sm py-1 px-2 rounded"
                            >
                              Pending
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-500">
                              Accepted
                            </p>
                            <GoCheckCircleFill className="text-green-500" />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* Cash-In  */}
            <p className="mt-6 mb-1 text-sm text-gray-200 font-semibold">Cash-In Requests</p>
            <table className="min-w-full divide-y text-sm divide-gray-300">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Request Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-300 divide-y divide-gray-200">
                {cashInRequest
                  ?.sort((a) => (a.status === "Pending" ? -1 : 1))
                  .map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.balance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.reqType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data?.status === "Pending" ? (
                          <div className="flex items-center gap-2">
                            {/* <p className="font-medium">Pending</p> */}
                            <button
                              onClick={() => handleCashIn(data?._id)}
                              className="bg-green-500 hover:bg-black text-white font-medium text-sm py-1 px-2 rounded"
                            >
                              Pending
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-500">
                              Accepted
                            </p>
                            <GoCheckCircleFill className="text-green-500" />
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

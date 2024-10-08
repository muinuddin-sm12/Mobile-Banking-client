/* eslint-disable react/prop-types */
import { MdVerified } from "react-icons/md";
import sendMoney from "../../public/icons/send money.svg";
import cashOut from "../../public/icons/cash-out.svg";
import cashIn from "../../public/icons/cash-in.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import SendMoney from "./modal/SendMoney";
import CashOut from "./modal/CashOut";
import CashIn from "./modal/CashIn";
import axios from "axios";
import UserHistory from "./modal/UserHistory";

const UserDashboard = ({ user }) => {
  const [requestData, setRequestData] = useState([]);
  const [users, setUsers] = useState([]);
  const [cashInRequest, setCashInRequest] = useState([]);
  const [sendMoneyRequest, setSendMoneyRequest] = useState([]);
  const [receiveSendMoney, setReceiveSendMoney] = useState([]);
  const [cashOutRequest, setCashOutRequest] = useState([]);
  const [initialUserBalance, setInitialUserBalance] = useState(
    parseFloat(user?.balance)
  ); // let userBalance = parseFloat(user?.balance);
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.success("Successfully Logout");
    navigate("/");
  };

  // send money modal
  const [isSendMoneyModalOpen, setSendMoneyModalOpen] = useState(false);
  const [isCashOutModalOpen, setCashOutModalOpen] = useState(false);
  const [isCashInModalOpen, setCashInModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get("https://mobile-banking-server-smoky.vercel.app/users");
        setUsers(data);
      } catch (error) {
        // console.log(error);
      }
    };
    const fetchCashInRequest = async () => {
      try {
        const response = await axios.get(
          "https://mobile-banking-server-smoky.vercel.app/transactionRequests"
        );
        const acceptedRequest = response.data?.filter(
          (data) =>
            data.status === "Accepted" &&
            data?.number == user?.number &&
            data.reqType === "Cash-In"
        );
        setCashInRequest(acceptedRequest);
      } catch (error) {
        // console.log(error);
      }
    };
    const fetchSendMoneyRequests = async () => {
      try {
        const response = await axios.get(
          "https://mobile-banking-server-smoky.vercel.app/transactionRequests"
        );
        const requests = response.data.filter(
          (f) => f.reqType === "Send-Money" && f.from === user.number
        );
        setSendMoneyRequest(requests);
      } catch (error) {
        // console.log(error);
      }
    };
    const fetchReceiveSendMoney = async () => {
      try {
        const response = await axios.get(
          "https://mobile-banking-server-smoky.vercel.app/transactionRequests"
        );
        const requests = response.data.filter(
          (f) => f.reqType === "Send-Money" && f.to === user.number
        );
        setReceiveSendMoney(requests);
      } catch (error) {
        // console.log(error);
      }
    };
    const fetchCashOut = async () => {
      try {
        const response = await axios.get(
          "https://mobile-banking-server-smoky.vercel.app/transactionRequests"
        );
        const requests = response.data.filter(
          (data) => data.reqType === "Cash-Out" && data?.number == user?.number
        );
        setCashOutRequest(requests);
      } catch (error) {
        // console.log(error);
      }
    };
    fetch();
    fetchCashOut();
    fetchCashInRequest();
    fetchSendMoneyRequests();
    fetchReceiveSendMoney();
  }, [user]);
  // console.log(cashInRequest, "cash in request");

  const totalCashInBalance = useMemo(
    () =>
      cashInRequest.reduce((acc, item) => acc + parseFloat(item.balance), 0),
    [cashInRequest]
  );

  const totalReceiveSendMoney = useMemo(
    () =>
      receiveSendMoney.reduce((acc, item) => acc + parseFloat(item.balance), 0),
    [receiveSendMoney]
  );

  const totalSendMoneyBalance = useMemo(
    () =>
      sendMoneyRequest.reduce((acc, item) => acc + parseFloat(item.balance), 0),
    [sendMoneyRequest]
  );

  const totalCashOutBalance = useMemo(
    () =>
      cashOutRequest.reduce((acc, item) => acc + parseFloat(item.balance), 0),
    [cashOutRequest]
  );

  const userBalance = useMemo(
    () =>
      initialUserBalance +
      totalCashInBalance -
      totalSendMoneyBalance +
      totalReceiveSendMoney -
      totalCashOutBalance,
    [
      initialUserBalance,
      totalCashInBalance,
      totalSendMoneyBalance,
      totalReceiveSendMoney,
      totalCashOutBalance,
    ]
  );
  const openSendMoneyModal = () => {
    if (user.status !== "Verified") {
      toast.error("Approval pending, please wait.");
      return;
    }
    setSendMoneyModalOpen(true);
  };
  const closeSendMoneyModal = () => {
    setSendMoneyModalOpen(false);
  };
  const openCashOutModal = () => {
    if (user.status !== "Verified") {
      toast.error("Approval pending, please wait.");
      return;
    }
    setCashOutModalOpen(true);
  };
  const closeCashOutModal = () => {
    setCashOutModalOpen(false);
  };
  const openCashInModal = () => {
    if (user.status !== "Verified") {
      toast.error("Approval pending, please wait.");
      return;
    }
    setCashInModalOpen(true);
  };
  const closeCashInModal = () => {
    setCashInModalOpen(false);
  };
  const openUserHistory = () => {
    setUserModalOpen(true);
  };
  const closeUserHistory = () => {
    setUserModalOpen(false);
  };
  const handleAgent = async (id) => {
    try {
      const updatedUser = {
        request: "Pending",
      };
      const response = await axios.put(
        `https://mobile-banking-server-smoky.vercel.app/users/${id}`,
        updatedUser
      );
      const reqUser = users?.map((user) =>
        user._id === id ? { ...user, status: response.data.request } : user
      );
      setRequestData(reqUser);

      toast.success("Request sent");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-col md:gap-0 md:flex-row w-[700px]">
        <div className="w-full lg:w-1/2 bg-[rgba(88,228,228,0.1)] p-6 md:rounded-l-xl overflow-hidden">
          <h1 className="text-2xl text-gray-200 font-semibold text-center mb-8">
            Personal Information
          </h1>
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full border-2 border-[#007BFF] mb-4 overflow-hidden">
              <img className="object-cover" src={user?.image} alt="" />
            </div>
            {user?.status === "Pending" ? (
              <span className="bg-yellow-100 px-2 py-1 rounded-full text-[12px] font-medium text-orange-400">
                Status: Pending
              </span>
            ) : (
              <div className="text-green-700 flex items-center gap-1 bg-green-200 px-2 py-1 rounded-full text-[12px] font-medium ">
                <span>Verified</span>
                <MdVerified />
              </div>
            )}
            <button
              onClick={() => handleAgent(user?._id)}
              className="text-[12px] bg-[#007BFF] px-3 py-[2px] rounded-md mt-2 text-white font-medium"
            >
              Become an Agent
            </button>
            <div className="text-gray-300 font-medium mt-3">
              <table>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td className="pl-4">{user?.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td className="pl-4">{user?.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>:</td>
                  <td className="pl-4">{user?.number}</td>
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
        <div className="w-full min-h-[450px] bg-[rgba(59,72,139,0.11)] md:h-auto lg:w-1/2 md:rounded-r-xl p-6">
          <div className="flex justify-between items-center mb-10 md:mb-12">
            <h3 className="text-gray-300 font-medium text-sm">
              Total Balance : {user.balance ? userBalance.toFixed(2) : "00.00"}{" "}
              BDT
            </h3>
            {/* history button */}
            <button
              onClick={openUserHistory}
              className="bg-[#007BFF] px-3 py-1 rounded-lg text-sm text-white font-medium"
            >
              History
            </button>
          </div>
          <UserHistory
            user={user}
            isOpen={isUserModalOpen}
            onRequestClose={closeUserHistory}
          />
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-1 space-y-2 ">
              <div>
                <div
                  onClick={openSendMoneyModal}
                  className="h-20 w-[120px] cursor-pointer text-sm font-medium border flex flex-col items-center justify-center rounded-xl p-4 hover:shadow-sm hover:shadow-[#007BFF]"
                >
                  <div>
                    <img className="h-8 " src={sendMoney} alt="" />
                  </div>
                  <span className="text-gray-300">Send Money</span>
                </div>
                <SendMoney
                  balance={userBalance}
                  user={user}
                  isOpen={isSendMoneyModalOpen}
                  onRequestClose={closeSendMoneyModal}
                />
              </div>
              <div>
                <div
                  onClick={openCashOutModal}
                  className="h-20 w-[120px] cursor-pointer text-sm font-medium border flex flex-col items-center justify-center rounded-xl p-4 hover:shadow-sm hover:shadow-[#007BFF]"
                >
                  <div>
                    <img className="h-8 " src={cashOut} alt="" />
                  </div>
                  <span className="text-gray-300">Cash-Out</span>
                </div>
                <CashOut
                  balance={userBalance}
                  user={user}
                  isOpen={isCashOutModalOpen}
                  onRequestClose={closeCashOutModal}
                />
              </div>
              <div>
                <div
                  onClick={openCashInModal}
                  className="h-20 w-[120px] cursor-pointer text-sm font-medium border flex flex-col items-center justify-center rounded-xl p-4 hover:shadow-sm hover:shadow-[#007BFF]"
                >
                  <div>
                    <img className="h-8 " src={cashIn} alt="" />
                  </div>
                  <span className="text-gray-300">Cash-In</span>
                </div>
                <CashIn
                  user={user}
                  isOpen={isCashInModalOpen}
                  onRequestClose={closeCashInModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

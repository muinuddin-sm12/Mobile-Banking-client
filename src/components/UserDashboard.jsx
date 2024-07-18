/* eslint-disable react/prop-types */
import { MdVerified } from "react-icons/md";
import sendMoney from "../../public/icons/send money.svg";
import cashOut from "../../public/icons/cash-out.svg";
import cashIn from "../../public/icons/cash-in.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SendMoney from "./modal/SendMoney";
import CashOut from "./modal/CashOut";
import CashIn from "./modal/CashIn";
import axios from "axios";

const UserDashboard = ({ user }) => {
  const [requestData, setRequestData] = useState([])
  const [users, setUsers] = useState([])
  console.log(users, 'from user dashboard')
  // const {name, email, number, image, status, role} = user;
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.success("Successfully Logout");
    navigate("/");
  };
  // send money modal
  const [isSendMoneyModalOpen, setSendMoneyModalOpen] = useState(false);
  const [isCashOutModalOpen, setCashOutModalOpen] = useState(false);
  const [isCashInModalOpen, setCashInModalOpen] = useState(false);

  useEffect(() => {
    const fetch = async() => {
      try{
        const {data} = await axios.get('http://localhost:9000/users')
        setUsers(data)
      }catch(error){
        console.log(error)
      }
    }
    fetch()
  },[])
  const openSendMoneyModal = () => {
    if (user.status !== "Verified") {
      toast.error(
        "Approval pending, please wait."
      );
      return;
    }
    setSendMoneyModalOpen(true);
  };
  const closeSendMoneyModal = () => {
    setSendMoneyModalOpen(false);
  };
  const openCashOutModal = () => {
    if (user.status !== "Verified") {
      toast.error(
        "Approval pending, please wait."
      );
      return;
    }
    setCashOutModalOpen(true);
  };
  const closeCashOutModal = () => {
    setCashOutModalOpen(false);
  };
  const openCashInModal = () => {
    if (user.status !== "Verified") {
      toast.error(
        "Approval pending, please wait."
      );
      return;
    }
    setCashInModalOpen(true);
  };
  const closeCashInModal = () => {
    setCashInModalOpen(false);
  };
  const handleAgent = async(id) => {
    try {
          const updatedUser = {
            request: "Pending",
          };
          const response = await axios.put(
            `http://localhost:9000/users/${id}`,
            updatedUser
          );
          const reqUser = users?.map((user) =>
            user._id === id ? { ...user, status: response.data.request } : user
          );
      setRequestData(reqUser)
      
      toast.success('Request sent')
    }catch(error){
      console.log(error)
    }
  }
  console.log('from user Dashboard', user) 
  // const handleStatus = async (id) => {
  //   try {
  //     const updatedUser = {
  //       status: "Verified",
  //       balance: 40,
  //     };
  //     const response = await axios.put(
  //       `http://localhost:9000/users/${id}`,
  //       updatedUser
  //     );
  //     const updatedUsers = users?.map((user) =>
  //       user._id === id ? { ...user, status: response.data.status, balance: response.data.balance } : user
  //     );
  //     setUsers(updatedUsers);
  //     toast.success("User verified successfully");
  //   } catch (error) {
  //     console.error("Error updating user status", error);
  //   }
  // };
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row w-[700px] border rounded-lg shadow-md overflow-hidden p-6">
        <div className="w-full lg:w-1/2 bg-blue-100 p-6 rounded-l-xl overflow-hidden">
          <h1 className="text-2xl font-semibold text-center mb-8">
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
            <button onClick={()=>handleAgent(user?._id)} className="text-[12px] bg-[#007BFF] px-3 py-[2px] rounded-md mt-2 text-white font-medium">Become an Agent</button>
            <div className="text-gray-700 font-medium mt-3">
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
        <div className="h-full w-full lg:w-1/2 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-700 font-medium text-sm">
              Total Balance : {user.balance ? parseFloat(user?.balance).toFixed(2) : "00.00"} BDT
            </h3>
            {/* history button */}
            <button className="bg-[#bfdeff] px-3 py-1 rounded-full text-sm text-[#308cef] font-medium">
              History
            </button>
          </div>
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
                  <span>Send Money</span>
                </div>
                <SendMoney
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
                  <span>Cash-Out</span>
                </div>
                <CashOut
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
                  <span>Cash-In</span>
                </div>
                <CashIn
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

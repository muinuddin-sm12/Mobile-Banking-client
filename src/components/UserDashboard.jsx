/* eslint-disable react/prop-types */
import { MdVerified } from "react-icons/md";
import sendMoney from "../../public/icons/send money.svg";
import cashOut from "../../public/icons/cash-out.svg";
import cashIn from "../../public/icons/cash-in.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ user }) => {
  // const {name, email, number, image, status, role} = user;
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.success("Successfully Logout");
    navigate("/");
  };
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
              <span className="bg-yellow-100 px-2 py-1 rounded-full text-[12px] font-medium text-orange-400">Status: Pending</span>
            ) : (
              <div className="text-green-700 flex items-center gap-1 bg-green-200 px-2 py-1 rounded-full text-[12px] font-medium ">
                <span>Verified</span>
                <MdVerified/>
                </div>
            )}
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
              Total Balance : 00.00
            </h3>
            {/* history button */}
            <button className="bg-[#bfdeff] px-3 py-1 rounded-full text-sm text-[#308cef] font-medium">
              History
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-1 space-y-2 ">
              <div className="h-20 w-[120px] cursor-pointer text-sm font-medium border flex flex-col items-center justify-center rounded-xl p-4 hover:shadow-sm hover:shadow-[#007BFF]">
                <div>
                  <img className="h-8 " src={sendMoney} alt="" />
                </div>
                <span>Send Money</span>
              </div>
              <div className="h-20 w-[120px] cursor-pointer text-sm font-medium border flex flex-col items-center justify-center rounded-xl p-4 hover:shadow-sm hover:shadow-[#007BFF]">
                <div>
                  <img className="h-8 " src={cashOut} alt="" />
                </div>
                <span>Cash-Out</span>
              </div>
              <div className="h-20 w-[120px] cursor-pointer text-sm font-medium border flex flex-col items-center justify-center rounded-xl p-4 hover:shadow-sm hover:shadow-[#007BFF]">
                <div>
                  <img className="h-8 " src={cashIn} alt="" />
                </div>
                <span>Cash-In</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

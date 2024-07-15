import sendMoney from "../../public/icons/send money.svg";
import cashOut from "../../public/icons/cash-out.svg";
import cashIn from "../../public/icons/cash-in.svg";

const UserDashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row w-[700px] border rounded-lg overflow-hidden p-6">
        <div className="w-full lg:w-1/2 bg-blue-100 p-6 rounded-l-xl overflow-hidden">
          <h1 className="text-2xl font-semibold text-center mb-8">
            Personal Information
          </h1>
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full border-2 border-[#007BFF] mb-4">
              image
            </div>
            <div className="text-gray-700 font-medium">
              <table>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td className="pl-4">Shakil</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td className="pl-4">shakil@gmail.com</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>:</td>
                  <td className="pl-4">01841446132</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="h-full w-full lg:w-1/2 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-700 font-medium text-sm">Total Balance : 00.00</h3>
            {/* history button */}
            <button className="bg-[#bfdeff] px-3 py-1 rounded-full text-sm text-[#308cef] font-medium">History</button>
          </div>
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-1 space-y-2 ">
              <div className="h-20 w-[120px] text-sm font-medium border flex flex-col items-center justify-center rounded-xl p-4 hover:shadow-sm hover:shadow-[#007BFF]">
                <div>
                  <img className="h-8 " src={sendMoney} alt="" />
                </div>
                <span>Send Money</span>
              </div>
              <div className="h-20 w-[120px] text-sm font-medium border flex flex-col items-center justify-center rounded-xl p-4 hover:shadow-sm hover:shadow-[#007BFF]">
                <div>
                  <img className="h-8 " src={cashOut} alt="" />
                </div>
                <span>Cash-Out</span>
              </div>
              <div className="h-20 w-[120px] text-sm font-medium border flex flex-col items-center justify-center rounded-xl p-4 hover:shadow-sm hover:shadow-[#007BFF]">
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

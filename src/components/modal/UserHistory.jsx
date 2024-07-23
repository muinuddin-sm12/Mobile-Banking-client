/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
// eslint-disable-next-line react/prop-types
const UserHistory = ({ isOpen, onRequestClose, user }) => {
  const [history] = useState([]);
  const [tranHistory, setTranHistory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/transactionRequests"
        );
        const currentUserHistory = response.data.filter((f) => f.to === user?.number)

        setTranHistory(currentUserHistory);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  console.log(user);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Input Modal"
      style={{
        overlay: {
          backgroundColor: "rgb(#007BFF)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "4px",
        },
      }}
    >
      <h2 className="mb-3 text-lg font-semibold text-center">
        Transaction History
      </h2>
      <table className="min-w-full divide-y text-sm divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Balance
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tranHistory?.map((data) => (
            <tr key={data._id}>
              <td className="px-6 py-4 whitespace-nowrap">{data?.date} <span className="text-[12px] text-gray-700">{data?.time}</span></td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-[12px] font-semibold text-gray-600">
                  {data?.reqType}
                </span>{" "}
                {data.reqType === "Cash-In" || data.reqType === "Send-Money" ? (
                  <span className="text-green-500 font-semibold">+{data?.balance}</span>
                ) : (
                  <span className="text-red-500 font-semibold">-{data?.balance}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center">
        <button
          className="border px-2 py-1 rounded-lg border-red-600 text-[12px] font-medium"
          onClick={onRequestClose}
          style={{ marginTop: "10px" }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default UserHistory;

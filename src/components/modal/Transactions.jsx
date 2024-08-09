/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
// eslint-disable-next-line react/prop-types
const Transactions = ({ isOpen, onRequestClose, user }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/transactionRequests"
        );
        const receiveSendmoneyHistory = response.data.filter(
          (f) => f.reqType === "Send-Money" || f.status === "Accepted"
        );

        setTransactions(receiveSendmoneyHistory);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, []);
  console.log(transactions);
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
              From
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Balance
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions?.map((data, index) => (
            <tr key={data._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-[12px]">{index+1}. </span>
                {data?.date}{" "}
                <span className="text-[12px] text-gray-700">{data?.time}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{data?.from || data?.number} </td>
              <td className="px-6 py-4 whitespace-nowrap">{data?.to || data?.acceptAgent} </td>
              <td className="px-6 py-4 whitespace-nowrap">{data?.reqType} </td>
              <td className="px-6 py-4 whitespace-nowrap">{data?.balance}</td>
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

export default Transactions;

/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
// eslint-disable-next-line react/prop-types
const UserHistory = ({ isOpen, onRequestClose, user }) => {
  const [receiveSendmoneyHistory, setReceiveSendmoneyHistory] = useState([]);
  const [sendSendmoneyHistory, setsendSendmoneyHistory] = useState([]);
  const [cashInHistory, setCashInHistory] = useState([]);
  const [cashOutHistory, setCashOutHistory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mobile-banking-server-smoky.vercel.app/transactionRequests"
        );
        const receiveSendmoneyHistory = response.data.filter(
          (f) => f.to === user?.number
        );
        const sendSendmoneyHistory = response.data.filter(
          (s) => s.from === user?.number && s?.reqType === "Send-Money"
        );
        const cashinHistory = response.data.filter(
          (c) => c.number === user?.number && c.reqType === "Cash-In"
        );
        const cashoutHistory = response.data.filter(
          (c) => c.number === user?.number && c.reqType === "Cash-Out"
        );

        setReceiveSendmoneyHistory(receiveSendmoneyHistory);
        setsendSendmoneyHistory(sendSendmoneyHistory);
        setCashInHistory(cashinHistory);
        setCashOutHistory(cashoutHistory);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, [user]);
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
          padding: "10px 2px",
          borderRadius: "10px",
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
              From/To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Balance
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[
            ...receiveSendmoneyHistory,
            ...sendSendmoneyHistory,
            ...cashInHistory,
            ...cashOutHistory,
          ]?.map((data, index) => {
            const isReceive = receiveSendmoneyHistory?.includes(data);
            const isSend = sendSendmoneyHistory?.includes(data);
            const isCashIn = cashInHistory?.includes(data);
            const isCashOut = cashOutHistory?.includes(data);

            return (
              <tr key={data._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span>{index + 1}. </span>
                  {data?.date}{" "}
                  <span className="text-[12px] text-gray-700">
                    {data?.time}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isReceive && data?.from}
                  {isSend && data?.to}
                  {(isCashIn || isCashOut) && data?.acceptAgent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isReceive && (
                    <>
                      <span className="text-green-500 font-semibold">
                        +{data?.balance}
                      </span>{" "}
                      <span className="text-[12px] font-semibold text-gray-600">
                        (Receive Money)
                      </span>
                    </>
                  )}
                  {isSend && (
                    <>
                      <span className="text-red-500 font-semibold">
                        -{data?.balance}
                      </span>{" "}
                      <span className="text-[12px] font-semibold text-gray-600">
                        (Send Money)
                      </span>
                    </>
                  )}
                  {isCashIn && (
                    <>
                      <span className="text-green-500 font-semibold">
                        +{data?.balance}
                      </span>{" "}
                      <span className="text-[12px] font-semibold text-gray-600">
                        (Cash In)
                      </span>
                    </>
                  )}
                  {isCashOut && (
                    <>
                      <span className="text-red-500 font-semibold">
                        -{data?.balance}
                      </span>{" "}
                      <span className="text-[12px] font-semibold text-gray-600">
                        (Cash Out)
                      </span>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center py-2 items-center">
        <button
          className="border px-2 py-1 rounded-lg hover:scale-105 transition-all bg-red-500 text-white text-[12px] font-medium"
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

/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import bcrypt from "bcryptjs";

// Set the app element for accessibility
Modal.setAppElement("#root");

// eslint-disable-next-line react/prop-types
const SendMoney = ({ isOpen, onRequestClose, user, balance }) => {
  const [from] = useState(user.number)
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(amount<50){
      toast.error('You need to Send Money at least 50.00 BDT');
      return;
    }
    if(amount>balance){
      toast.error('You do not have enough balance.');
      return;
    }
    else {
      const handleRequest = async () => {
        try {
          const isMatch = await bcrypt.compare(pin, user?.password)
          if(!isMatch){
            toast.error('Invalid Pin')
            return;
          }
          const requestData = {
            name: user?.name,
            from: from,
            to: to,
            balance: amount,
            date: formattedDate,
            reqType: "Send-Money",
            time: formattedTime,
          };
          await axios.post(
            `https://mobile-banking-server-smoky.vercel.app/transactionRequests`,
            requestData
          );
          toast.success("Transaction successful. Please wait a moment.");
        } catch (error) { 
          // console.log(error);
        }
      };
      handleRequest();
    }

    // Close the modal after submission
    setTo("");
    setAmount("");
    setPin("");
    onRequestClose();
  };
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
      <h2 className="mb-3 text-xl font-semibold text-center">Enter Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phone">Recieve Phone Number:</label>
          <br />
          <input
            type="text"
            id="phone"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-[#dedee1] outline-none border rounded-lg px-2 py-1 text-sm font-medium"
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <br />
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-[#dedee1] outline-none border rounded-lg px-2 py-1 text-sm font-medium"
            required
          />
        </div>
        <div>
          <label htmlFor="pin">Pin:</label>
          <br />
          <input
            type="number"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="bg-[#dedee1] outline-none border rounded-lg px-2 py-1 text-sm font-medium"
            required
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            className="px-3 py-1 rounded-lg bg-[#007BFF] mt-3 text-white text-sm font-semibold"
            type="submit"
          >
            Send Money
          </button>
        </div>
      </form>
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

export default SendMoney;

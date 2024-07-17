import { useState } from "react";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

// eslint-disable-next-line react/prop-types
const CashIn = ({ isOpen, onRequestClose }) => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log("Phone:", phone);
    console.log("Amount:", amount);
    console.log("Pin:", pin);
    // Close the modal after submission
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
          <label htmlFor="phone">Phone Number:</label>
          <br />
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            Cash In
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

export default CashIn;

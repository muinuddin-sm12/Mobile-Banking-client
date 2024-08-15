import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from 'bcryptjs';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const password = form.password.value;
    const image = form.image.value;

    if (password.toString().length !== 5) {
      toast.error("Password must be exactly 5 digits");
      return;
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const userData = {
        name,
        email,
        number,
        password: hashedPassword,
        image,
        status: "Pending",
        role: "User",
      };
  
      await axios.post("https://mobile-banking-server-smoky.vercel.app/users", userData);
  
      toast.success("Register Successful");
      navigate("/");
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 ">
      <div className="flex flex-col lg:w-[360px] max-w-md p-6 border shadow-md rounded-lg overflow-hidden">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-white">Register</h1>
          <p className="text-sm text-gray-400">Welcome to Mobile Banking</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-300 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#007BFF] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-1 text-gray-300 text-sm">
                Image URL
              </label>
              <input
                required
                type="text"
                id="image"
                name="image"
                placeholder="Enter Your Image URL"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#007BFF] bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-300 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#007BFF] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="number" className="block mb-1 text-gray-300 text-sm">
                Phone Number
              </label>
              <input
                type="number"
                name="number"
                id="number"
                required
                placeholder="Enter Your Phone Number Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#007BFF] bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-1 text-gray-300">
                  PIN
                </label>
              </div>
              <input
                type="number"
                name="password"
                id="password"
                required
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#007BFF] bg-gray-200 text-gray-900"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#007BFF] w-full rounded-md py-3 text-white"
            >
              Continue
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <p className="px-6 text-sm text-center text-gray-200">
          Already have an account?{" "}
          <Link
            to="/"
            className="hover:underline hover:text-[#007BFF] text-gray-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

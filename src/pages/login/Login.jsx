import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({ users: [], requests: [] });
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("https://mobile-banking-server-smoky.vercel.app/users");
        setUsers(usersResponse.data);
      } catch (error) {
        toast.error("Error fetching data: " + error.message);
      }
    };
    fetchData();
  }, []);
  // console.log(users);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.email == email || user.number == email
    );
    if (!user) {
      toast.error("User not exist");
      return;
    }
    try {
      const isMatch = await bcrypt.compare(pin, user.password);
      if (!isMatch) {
        toast.error("Invalid Pin");
        return;
      }
      // 1. sign in user
      toast.success("Login Successful");
      navigate("/dashboard", { state: { email } });

      const response = await axios.post("https://mobile-banking-server-smoky.vercel.app/jwt", {email}, {withCredentials: true} );
      console.log(response.data);
    } catch (err) {
      toast.error("Error verifying password");
    }
  };
  // console.log(email)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="sm:m-10 shadow-md">
        <div className="flex flex-col lg:w-[360px] max-w-md border-[1px] p-6 rounded-lg">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl text-white font-bold">Log In</h1>
            <p className="text-sm text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 ng-untouched ng-pristine ng-valid"
          >
            <div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-300 text-sm"
                >
                  Email or Phone
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  required
                  placeholder="Enter Your Email or Phone Number"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#007BFF] bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-300 mb-1"
                  >
                    Pin
                  </label>
                </div>
                <input
                  type="number"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
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
                Login
              </button>
            </div>
          </form>
          <div className="space-y-1">
            <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
              Forgot Pin?
            </button>
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <p className="px-6 text-sm text-center text-gray-200">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/register"
              className="hover:underline hover:text-[#007BFF] text-gray-400"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

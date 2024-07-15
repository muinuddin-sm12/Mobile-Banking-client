import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
// import axios from "axios";

const Register = () => {
    const navigate = useNavigate()
  const {
    createUser,
    updateUserProfile,
    loading,
    setLoading,
  } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const password = form.password.value;
    const image = form.image.value;
    const userData = { name, email, number, status: "Pending", role: "User" };
    console.log(userData)

    try {
      setLoading(true);
      //   1. User Registration
      // eslint-disable-next-line no-unused-vars
      const result = await createUser(email, password);
      //   2. Save username and photo in firebase
      await updateUserProfile(name, image);

    //   await axios.post(
    //     "https://life-partner-server.vercel.app/users",
    //     userData
    //   );
      toast.success("Register Successful");
      navigate('/dashboard')
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
    }
  };

  return (
      <div className="flex justify-center items-center py-10 ">
        <div className="flex flex-col lg:w-[400px] max-w-md p-6 border rounded-lg overflow-hidden text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Register</h1>
            <p className="text-sm text-gray-400">Welcome to Mobile Banking</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
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
                <label htmlFor="image" className="block mb-2 text-sm">
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
                <label htmlFor="email" className="block mb-2 text-sm">
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
                <label htmlFor="number" className="block mb-2 text-sm">
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
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#007BFF] bg-gray-200 text-gray-900"
                />
              </div>
            </div>
            <div>
              <button
                // disabled={loading}
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
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="hover:underline hover:text-[#007BFF] text-gray-600"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Register;

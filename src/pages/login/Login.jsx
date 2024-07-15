import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
// import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
//   const from = location?.state || "/";

  const { signIn, setLoading } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password)
    try {
      setLoading(true);
      // 1. sign in user
      await signIn(email, password);
      navigate('/dashboard');
      toast.success("Signup Successful");
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rounded-lg overflow-hidden sm:m-10">
        <div className="flex flex-col max-w-md border p-6 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Log In</h1>
            <p className="text-sm text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
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
                  id="password"
                  required
                  placeholder="*******"
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
              Forgot password?
            </button>
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/register"
              className="hover:underline hover:text-[#007BFF] text-gray-600"
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
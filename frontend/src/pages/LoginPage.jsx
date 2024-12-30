import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/user.mutation.js";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [login, { loading, error }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login({
        variables: {
          input: loginData,
        },
      });
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Box */}
      <div className="flex rounded-lg overflow-hidden bg-white shadow-lg">
        <div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
					<button
              className=" top-4 left-4 text-gray-500 hover:text-gray-700"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Login</h1>
            <h1 className="text-sm font-medium mb-6 text-gray-500 text-center">
              Welcome back! Log in to your account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Username Input */}
              <InputField
                label="Username"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
              />

              {/* Password Input */}
              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
              />

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
                {error && <p className="text-red-500 mt-2 text-center">{error.message}</p>}
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-4 text-sm text-center text-gray-600">
              <p>
                {"Don't"} have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

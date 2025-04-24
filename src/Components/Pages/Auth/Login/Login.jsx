import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, authMessage } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password, navigate);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen text-white">
      {/* Left Section */}
      <div className="w-1/3 h-full hidden lg:flex flex-col justify-center items-center bg-[#0C3891] py-5">
        <h1 className="text-6xl font-bold mb-2">Hello,</h1>
        <p className="text-xl text-white text-center px-4">
          Your account is ready. Please enter <br /> your credentials to log in.
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 w-full flex items-center justify-center p-4">
        <div className="bg-white text-black p-8 rounded-lg w-full max-w-2xl shadow-lg">
          <form className="space-y-6" onSubmit={handleLogin}>
            <h2 className="text-3xl font-bold text-center text-[#0C3891]">Login</h2>

            <div className="space-y-2">
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#0C3891]"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#0C3891]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {authMessage && <p className="text-red-500 text-sm">{authMessage}</p>}

            <div className="text-right text-sm">
              <Link to="/Updatepassword" className="text-[#0C3891]">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-md text-white ${
                isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-[#0C3891]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin h-6 w-6 mx-auto" /> : "Login"}
            </button>

            <p className="text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-[#0C3891] font-medium">
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import leftimage from "../../../assest/landingassests/categeories/signupright.jpg"

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    console.log("Signing up with:", {
      username,
      firstname,
      lastname,
      email,
      role,
      number,
    });

    signup(username, firstname, lastname, email, role, number, navigate);
  };

  return (
    <div className="flex flex-col md:flex-row  h-screen text-white">
      {/* Left Section */}
      <div className="w-1/3 h-full hidden lg:flex flex-col justify-center items-center bg-[#0C3891] py-5">
        <h1 className="text-6xl font-bold mb-2">Welcome,</h1>
        <p className="text-xl mb-6">Create your account to get started.</p>
        {/* <img src={leftimage} alt="" /> */}
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 w-full flex items-center justify-center p-4">
        <div className="bg-white text-black p-8 rounded-lg w-full max-w-2xl shadow-lg">
          <form className="space-y-6" onSubmit={handleSignUp}>
            <h2 className="text-3xl font-bold text-center text-[#0C3891]">Sign Up</h2>
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-[48%]">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#0C3891]"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-[48%]">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#0C3891]"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-[48%]">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#0C3891]"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-[48%]">
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#0C3891]"
                  placeholder="Phone Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#0C3891]"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-[#0C3891]"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Companies">Join as a Companies</option>
                  <option value="Creativeshr">Join as a Creatives</option>
                  {/* <option value="employee">Employee</option> */}
                </select>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className={`w-full py-2 rounded-md text-white ${
                isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-[#0C3891]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin h-6 w-6 mx-auto" /> : "Sign Up"}
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0C3891] font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

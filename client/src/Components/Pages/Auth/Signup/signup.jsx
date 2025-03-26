import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useLoadingStore from "../../../utils/UseLoadingStore";
import { Loader2 } from "lucide-react";
import rightsignup from "../../../assest/pattern.png";
import { useAuth } from "../../../context/AuthContext";
const SignUp = () => {
  const navigate = useNavigate();
  // const { signup , } = useAuth();
  const { signup, isLoading, authMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  // const { isLoading, showLoading, hideLoading } = useLoadingStore();


  const handleSignUp = (e) => {
    e.preventDefault();
    
    console.log("Signing up with:", {
        username,
        firstname,
        lastname,
        email,
        role,
        number
    });

    signup(username, firstname, lastname, email, role, number, navigate);
};


  return (
    <div className="flex flex-col md:flex-row h-screen text-white">
      {/* Left Section */}
      <div className="lg:w-2/4 w-full flex flex-col justify-center p-3 md:p-6">
        <div className="bg-white text-black p-10 rounded-lg min-w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-left">Welcome,</h1>
          <p className="text-gray-600 mb-6">Create your  account to get started.</p>

          <form className="space-y-4 bg-white p-6 rounded-lg shadow-md" onSubmit={handleSignUp}>

          <div>
        <label className="block text-sm font-medium text-gray-700">User  Name</label>
        <input
          type="text"
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Enter your Last Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Enter your First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Enter your Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Enter your Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Select Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded-md bg-white cursor-pointer focus:outline-none focus:ring focus:ring-blue-500"
          required
        >
          <option value="">Select Role</option>
          <option value="owner">Owner</option>
          <option value="hr">HR</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {isLoading ? (
        <button className="cursor-not-allowed flex justify-center bg-gray-800 w-full py-2 rounded-md text-white">
          <Loader2 className="animate-spin h-6 w-6" />
        </button>
      ) : (
        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
          Sign Up
        </button>
      )}
    </form>

          <p className="text-center text-gray-500 mt-4">
            Already have an account? <Link to="/login" className="text-[#e14a16]">Login</Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-3/5 h-full hidden lg:block">
        <img src={rightsignup} alt="Illustration" className="h-full w-full object-cover rounded-3xl" />
      </div>
    </div>
  );
};

export default SignUp;

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import leftimage from "../../../assest/landingassests/categeories/signupright.jpg";
import { useRoles } from "../../../context/Rolecontext";
import { API_URL } from "../../../utils/Apiconfig";
import useLoadingStore from '../../../utils/UseLoadingStore';
import axios from "axios";
import Alert from "../../../utils/Alert";
import Select from "react-select";
const SignUp = () => {
  const navigate = useNavigate();
  const { signup,handleSendOTP } = useAuth();
  const { category } = useRoles();
  const { isLoading, showLoading, hideLoading } = useLoadingStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isVerifyButtonVisible, setIsVerifyButtonVisible] = useState(true);
  const inputRefs = useRef([]);
  const [alert, setAlert] = useState(null);

  const showAlert = (variant, title, message) => {
    setAlert({ variant, title, message });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const options = category
  .filter((roleOption) => roleOption.roleName !== "Admin")
  .map((roleOption) => ({
    value: roleOption._id,
    label: roleOption.roleName,
  }));

  const handleRoleChange = (selectedOption) => {
  setRole(selectedOption ? selectedOption.value : "");
};
 
  const selectedRole = category.find(
    (cat) =>
      cat.roleName ===
      (role === "Companies" ? "Join as a Company" : "Join as a Creative")
  );

  const handleSignUp = (e) => {
    e.preventDefault();
  
  
    if (!email) {

      showAlert('warning', 'Email required', 'Email is required.');

      return;
    }
  
 
  
    if (!password) {
      // setError("Password is required.");
      showAlert('warning', 'Password required', 'Password is required.');
      
      return;
    }


    if (!role) {

      showAlert('warning', 'Role required', 'Role is required.');

      return;
    }


    if (!isOtpVerified) {
      // setError("Please verify email first");
      showAlert('warning', 'Verify email', 'Please verify email first');
      return;
    }
  
    // Create the payload
    const payload = {
      username,
      firstname,
      lastname,
      email,
      role,
      number,
      password,
      categories:
        selectedRole?.subCategories?.length > 0 ? selectedSubcategories : [],
    };
  
    console.log("Signing up with:", payload);
  

    signup(
      username,
      firstname,
      lastname,
      email,
      role,
      number,
      password,
      selectedSubcategories,
      navigate
    );
  };
  

  
  useEffect(() => {
    // Clear subcategories when role changes
    setSelectedSubcategories([]);
  }, [role]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async () => {
    try {
      showLoading();
      console.log("Email:", email);
  
      // Step 1: Check if the user exists
      const checkResponse = await axios.post(`${API_URL}/auth/login`, { email });
  
      // ✅ If the user exists, show an error but do not hide the OTP button
      if (checkResponse.data.message === "User exists") {
        showAlert('error', 'Login Failed', 'User already exists, try to login');
        setOtpSent(false);
        setIsVerifyButtonVisible(true); // Keep the button visible even if the user exists
      }
    } catch (error) {
      // ✅ If the status is 404, it means the user is not found, so send OTP
      if (error.response?.status === 404) {
        console.log("User does not exist. Sending OTP...");
        await handleSendOTP(email, setIsVerifyButtonVisible, hideLoading, showLoading, setMessage);
      } else {
        console.error("Error during login process:", error?.response?.data || error.message);
        showAlert('error', 'Login Failed', 'Something went wrong. Please try again.');
      }
    } finally {
      hideLoading();
    }
  };
  
  
  

  const handleOtpInputChange = (e, index) => {
    const value = e.target.value;
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if a number is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = async () => {
    // Combine OTP digits
    await handleVerifyOtp(email,otp);
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);

    // Verify OTP logic (replace with your actual verification)
    if (enteredOtp === "123456") {
      setIsOtpVerified(true);
      alert("OTP Verified!");
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };



  const handleVerifyOtp = async (email,otpValue) => {
    try {
        // console.log("Sending OTP:", otpValue, "Email:", email);
        const response = await axios.post(`${API_URL}/auth/confirm-otp`, {
            email,
            otp: otpValue, // Ensure OTP is a string
        });
        if (response.status === 200) {
            setOtp("");
            setError(false);
            // alert('OTP verified successfully!');
            setIsOtpVerified(true);
        }
    } catch (err) {
        console.error("Error verifying OTP:", err.response?.data?.message);
        setError(err.response?.data?.message || 'Error verifying OTP');
    }
  }



  return (
    <div className="flex flex-col md:flex-row h-screen justify-center text-white">
      {/* Left Section */}
      <div className="w-1/3 h-full hidden lg:flex flex-col justify-center items-center bg-[#0C3891] py-5">
        <h1 className="text-6xl font-bold mb-2">Welcome,</h1>
        <p className="text-xl mb-6">Create your account to get started.</p>
        {/* <img src={leftimage} alt="" /> */}
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 w-full flex items-center justify-center p-4">
        <div className="bg-white text-black p-8 rounded-lg w-full max-w-2xl shadow-xl">
          <form className="space-y-6" onSubmit={handleSignUp}>
            <h2 className="text-3xl font-bold text-center text-[#0C3891]">
              Sign Up
            </h2>
            <div className="flex flex-wrap gap-4">
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 pr-20" // Add padding-right for button space
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {isVerifyButtonVisible && !isOtpVerified && (
                    <button
                      type="button"
                      className="absolute top-[55%] right-3 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                      onClick={handleLogin}
                    >
                      {isLoading ? (
                        <span className="cursor-not-allowed flex justify-center">
                          {" "}
                          <Loader2 className="animate-spin h-6 w-6 font-bold" />
                        </span>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* OTP Verification */}
              {otpSent && !isOtpVerified && (
                <div className="space-y-4">
                  <label htmlFor="otp" className="block text-sm font-medium">
                    Enter OTP
                  </label>
                  <div className="flex space-x-2">
                    {otp.map((_, index) => (
                      <input
                        key={index}
                        type="tel"
                        inputMode="numeric" // Ensures number keyboard on mobile
                        pattern="[0-9]*" // Restricts input to numbers
                        className="w-10 h-10 text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleOtpInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                  {isLoading ? (
                    <button
                      type="submit"
                      className="cursor-not-allowed flex justify-center  bg-blue-400 w-full py-2 rounded-md text-white"
                    >
                      <Loader2 className="animate-spin h-6 w-6 font-bold" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={handleOtpSubmit}
                    >
                      Verify Otp
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="w-full">
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#0C3891]"
                  placeholder="Phone Number"
                  value={number}
                  maxLength={10}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>
            <div className="w-full">
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#0C3891]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
           <div className="w-full">
              <Select
                options={options}
                value={options.find((opt) => opt.value === role) || null}
                onChange={handleRoleChange}
                placeholder="Select Role"
                isClearable
                className="text-sm"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: state.isFocused ? "#0C3891" : "#ccc",
                    boxShadow: state.isFocused ? "0 0 0 1px #0C3891" : "none",
                    "&:hover": { borderColor: "#0C3891" },
                  }),
                }}
              />
            </div>

            {category.find((r) => r._id === role)?.subCategories?.length >
              0 && (
              <div className="w-full">
                <label className="block mb-2 font-medium">
                  Select Categories
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {category
                    .find((r) => r._id === role)
                    .subCategories.map((sub) => (
                      <label key={sub._id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={sub._id}
                          checked={selectedSubcategories.includes(sub._id)}
                          onChange={(e) => {
                            const { checked, value } = e.target;
                            setSelectedSubcategories((prev) =>
                              checked
                                ? [...prev, value]
                                : prev.filter((id) => id !== value)
                            );
                          }}
                        />
                        {sub.name}
                      </label>
                    ))}
                </div>
              </div>
            )}

            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
            {alert && <div className="mt-4"><Alert {...alert} /></div>}
            <button
              type="submit"
              className={`w-full py-2 rounded-md text-white ${
                isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-[#0C3891]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-6 w-6 mx-auto" />
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
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

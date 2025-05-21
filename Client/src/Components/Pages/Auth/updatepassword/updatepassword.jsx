import {
    Loader2
  } from "lucide-react";
  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import useLoadingStore from "../../../utils/UseLoadingStore";
  import { API_URL } from "../../../utils/Apiconfig";
  
  const Updatepassword = () => {
    const navigate = useNavigate();
    const { isLoading, showLoading, hideLoading } = useLoadingStore();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [newPassword, setNewPassword] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
  
    const handleEmailChange = (e) => setEmail(e.target.value);
  
    const handleOtpChange = (value, index) => {
      if (/^\d?$/.test(value)) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
  
        if (value && index < 5) {
          document.getElementById(`otp-${index + 1}`).focus();
        }
        if (!value && index > 0) {
          document.getElementById(`otp-${index - 1}`).focus();
        }
      }
    };
  
    const handlePasswordChange = (e) => setNewPassword(e.target.value);
  
    const handleSendOTP = async () => {
      try {
        showLoading();
        const response = await axios.post(`${API_URL}/send-otp`, { email });
        if (response.data.success) {
          setMessage("OTP sent successfully! Please check your email.");
          setIsOtpSent(true);
        } else {
          setMessage(response.data.message);
          setIsOtpSent(true);
        }
      } catch (error) {
        setMessage("An error occurred while sending OTP.");
      } finally {
        hideLoading();
      }
    };
  
    const handleVerifyOtp = async (otp) => {
      if (!otp || otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP.");
        return;
      }
  
      try {
        const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
        if (response.status === 200) {
          setIsOtpVerified(true);
          setError("");
        } else {
          setError(response.data.message || "Failed to verify OTP.");
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error verifying OTP');
      }
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
  
      if (!email) {
        setError("Email is required.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
  
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
  
        if (response.status === 400) {
          const errorData = await response.json();
          setError(errorData.message || "Incorrect email.");
        } else {
          handleSendOTP();
        }
      } catch (error) {
        setError("There was an error. Please try again.");
      }
    };
  
    const handlePasswordSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(`${API_URL}/auth/reset-pass`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, newPassword })
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setMessage(result.message || "Password updated successfully!");
          navigate('/Thankyou');
        } else {
          setMessage(result.message || "An error occurred");
        }
      } catch (error) {
        setMessage("An error occurred while updating the password");
      }
    };
  
    return (
      <div className="flex flex-col md:flex-row h-screen text-white">
        <div className="w-1/3 h-full hidden lg:flex flex-col justify-center items-center bg-[#0C3891] py-5">
          <h1 className="text-4xl font-bold mb-2">Forgot password</h1>
          <p className="text-base mb-6">You can reset your password</p>
        </div>
  
        <div className="lg:w-2/3 w-full flex items-center justify-center p-4">
          <div className="bg-white text-black p-10 md:p-6 rounded-lg w-[70%] space-y-4 border-2 shadow-lg">
            <h2 className="text-[#0C3891] text-2xl font-bold mb-2">Forgot Password</h2>
            <p className="text-gray-600 mb-6">Enter your email to reset your password.</p>
  
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              readOnly={isOtpVerified}
            />
  
            {!isOtpVerified && (
              <div className="flex justify-end">
                {isLoading ? (
                  <button className="mt-2 cursor-not-allowed flex justify-center bg-blue-400 py-1 px-4 rounded-md text-white">
                    <Loader2 className="animate-spin h-6 w-6 font-bold" />
                  </button>
                ) : (
                  <button onClick={handleLogin} className="mt-2 bg-[#0C3891] text-white py-1 px-4 rounded-md">
                    Send OTP
                  </button>
                )}
              </div>
            )}
  
            {isOtpSent && (
              <div className="mt-4">
                <label className="block text-sm font-medium">Enter OTP</label>
                <div className="flex gap-2 mt-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      className="w-10 h-10 border rounded text-center"
                    />
                  ))}
                </div>
                {isLoading ? (
                  <button className="cursor-not-allowed bg-blue-400 w-full rounded-md text-white mt-2 px-4 py-1">
                    <Loader2 className="animate-spin h-6 w-6 font-bold" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleVerifyOtp(otp.join(""))}
                    className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
                  >
                    Verify OTP
                  </button>
                )}
              </div>
            )}
  
            {isOtpVerified && (
              <div className="mt-4">
                <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
                <button
                  onClick={handlePasswordSubmit}
                  className="mt-2 bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600"
                >
                  Update Password
                </button>
              </div>
            )}
  
            {message && <p className="text-center mt-4 text-green-600">{message}</p>}
            {error && <p className="text-center mt-4 text-red-600">{error}</p>}
  
            <p className="text-center text-gray-500 mt-4">
              Don&apos;t have an account? <Link to="/Signup" className="text-[#0C3891]">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Updatepassword;
  
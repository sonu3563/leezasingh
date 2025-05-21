import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../utils/Apiconfig";
import { useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    const token = localStorage.getItem("userToken");
    // console.log(token);
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email, password) => {
    setIsLoading(true);
    setAuthMessage(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // `withCredentials` is not used in `fetch`; use `credentials: "include"`
      });
      
      if (!response.ok) throw new Error("Login failed, Please check your email or password");
      
      const data = await response.json();
      console.log("login response", data);
      
      if (data.message === "Login successful") {
        const user = data.user;
        const token = data.token;
        
        // Directly extracting the role and formatting it for storage
        const formattedRole = user?.role?.name?.trim().toLowerCase().replace(/\s+/g, "") || "norole";
        
        // Storing the data in localStorage
        localStorage.setItem("userToken", token);
        localStorage.setItem("role", user.role.name); // Saving the role as it is in the response
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("user_name", user.username); // Saving username as well
        localStorage.setItem("user_role", formattedRole); // Saving the formatted role
        localStorage.setItem("userData", JSON.stringify(user));
        
        // Updating the state
        setUser(user);
        setAuthMessage("Login successful! ✅");
  
        console.log("User Role:", user.role.name);
        console.log("Stored Role in LocalStorage:", localStorage.getItem("user_role"));
        
        // Navigate to the role-specific dashboard
        // navigate(`/${formattedRole}/dashboard`);

        const userRole = formattedRole.trim()?.toLowerCase()?.replace(/\s+/g, "");

        console.log("this is user_id",userRole);
        localStorage.setItem("user_role", userRole); // Saving the formatted role
if(formattedRole==="admin" || formattedRole==="creator"){
  
        navigate(`/${formattedRole}/All-jobs`);
}
else{
  navigate(`/${formattedRole}/postjob`);
}


      } else {
        throw new Error(data.message || "Login failed ❌");
        
      }
    } catch (error) {
      setAuthMessage(error.message || "Something went wrong! ❌");
    } finally {
      // setAuthMessage(null);
      setIsLoading(false);
    }
  };
  

  const signup = async (username, firstname, lastname, email, role, number, password, categories, navigate) => {
    setIsLoading(true);
    setAuthMessage(null);
  
    const requestBody = {
      // username,
      // firstName: firstname,
      // lastName: lastname,
      phone: number,
      email,
      role,
      password,
      subCategories: categories,
    };
  
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });
  
      const data = await response.json();
      console.log("Signup Response:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Signup failed. Please try again.");
      }
  
      const { token, user, message } = data;
  
      if (token && user) {
        // console.log("1");

        const formattedRole = user.role?.trim().toLowerCase().replace(/\s+/g, "") || "norole";
  
        localStorage.setItem("userToken", token);
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("user_role", formattedRole);
        localStorage.setItem("role", user.role.name); // Saving the role as it is in the response
        localStorage.setItem("userData", JSON.stringify(user));
  
        console.log("User Role:", formattedRole);
        console.log("Stored Role in LocalStorage:", localStorage.getItem("user_role"));
        


        setUser(user);
        setAuthMessage(message || "Signup successful! ✅");
        // if(formattedRole==="admin" || formattedRole==="superadmin"){
    navigate(`/${formattedRole}/All-jobs`);
  // }
  // else{
  //   navigate(`/${formattedRole}/All-jobs`);
  // }
      } else {
        throw new Error("Invalid signup response format.");
      }
    } catch (error) {
      setAuthMessage(error.message || "Something went wrong! ❌");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleVerifyOtp = async (email,otpValue,setOtp,setIsOtpVerified,setError) => {
    try {
        // console.log("Sending OTP:", otpValue, "Email:", email);
        const response = await axios.post(`${API_URL}/api/auth/confirm-otp`, {
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
};


const handleSendOTP = async (email,setIsVerifyButtonVisible,hideLoading,showLoading,setMessage) => {
  hideLoading();
          try {
              showLoading();
              const response = await axios.post(`${API_URL}/send-otp`, { email });
              if (response.data.success) {
                  
                  setMessage("OTP sent successfully! Please check your email.");
                  // handleVerifyOtp();
                  setIsVerifyButtonVisible(false);
              } else {
                  setMessage(response.data.message);
              }
          } catch (error) {
              setMessage("An error occurred while sending OTP.");
          }
          finally{
              hideLoading();
          }
      };




  const logout = () => {
    try {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  // if (isLoading) return <div>Loading...</div>;
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, authMessage,signup,handleSendOTP,handleVerifyOtp}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../utils/Apiconfig";
import { useNavigate,Navigate } from "react-router-dom";
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
    console.log(token);
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email, password) => {
    setIsLoading(true);
    setAuthMessage(null);
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Login failed , Please check your email or password");
      const data = await response.json();
      console.log("login response",data)
      if (data.success) {
        const user = data.data.user;
        const token = data.data.token;
        const formattedRole = user?.role?.name?.trim().toLowerCase().replace(/\s+/g, "") || "norole";
        localStorage.setItem("userToken", token);
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("user_name", formattedRole);
        localStorage.setItem("userData", JSON.stringify(user));
        setUser(user);
        console.log(user);
        console.log("roles", formattedRole);
        console.log(localStorage.getItem("user_name"));
        setAuthMessage("Login successful! ✅");
        console.log("this is user_id",user.id);
        const userRole = user.roles?.[0]?.name?.trim()?.toLowerCase()?.replace(/\s+/g, "");
        console.log("this is user_id",userRole);
        navigate(`/${formattedRole}/dashboard`);
     
      } else {
        throw new Error(data.message || "Login failed ❌");
      }
    } catch (error) {
      setAuthMessage(error.message || "Something went wrong! ❌");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username, firstName, lastName, email, role, phoneNumber, navigate) => {
    setIsLoading(true);
    setAuthMessage(null);

    const requestBody = {
        username,
        firstName,
        lastName,
        email,
        phoneNumber,  // Ensure it's correctly named
        role
    };

    console.log("Request body:", requestBody);  // Debug request payload

    try {
        const response = await fetch(`${API_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log("responseeee",data);
        if (!response.ok) {
            throw new Error(data.message || "Signup failed. Please try again.");
        }

        console.log("Signup response:", data);

        if (data.user && data.token) {
            const user = data.user;
            const token = data.token;
            const formattedRole = user.role?.trim().toLowerCase().replace(/\s+/g, "") || "norole";

            localStorage.setItem("userToken", token);
            localStorage.setItem("user_id", user.id);
            localStorage.setItem("user_name", formattedRole);
            localStorage.setItem("userData", JSON.stringify(user));

            setUser(user);
            setAuthMessage("Signup successful! ✅ Check your email for login details.");
            console.log("User:", user);
            console.log("Role:", formattedRole);

            navigate(`/${formattedRole}/dashboard`);
        } else {
            throw new Error("Unexpected response format from server.");
        }

    } catch (error) {
        setAuthMessage(error.message || "Something went wrong! ❌");
    } finally {
        setIsLoading(false);
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
    <AuthContext.Provider value={{ user, login, logout, isLoading, authMessage,signup}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
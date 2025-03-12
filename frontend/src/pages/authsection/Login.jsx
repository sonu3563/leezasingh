import React from "react";
import SignIn from "../../components/SignIn"; // Importing SignIn component

const Login = () => {
  // You can define your login validation logic here
  const checkLogin = (user, pass) => {
    return user === "admin@gmail.com" && pass === "rootadmin"; // Example login validation logic
  };

  return (
    <div>
      <h1>Login</h1>
      {/* Render SignIn component and pass checkLogin function as a prop */}
      <SignIn checkLogin={checkLogin} />
    </div>
  );
};

export default Login;

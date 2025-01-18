import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Signup from './Component/Auth/Signup';
import Updatepassword from './Component/Auth/Updatepassword';
import Enterdashboard from './Component/Auth/Enterdashboard';
import Mainlayout from './layout/Mainlayout';
import Thankyou from './Component/Auth/Thankyou';
import Subscription from './Component/Main/Subscription';
import PublicLayout from './layout/Publiclayout';
import Hero from '../src/Component/landing/components/Hero'
const App = () => {
  const token = localStorage.getItem("token");
  // console.log("this is token" , token);
  const isAuthenticated = (token)?true:false;
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Subscription" element={<Subscription />} />
        <Route path="/updatepassword" element={<Updatepassword />} />
        <Route path="/enterdashboard" element={<Enterdashboard />} />
        <Route path="/updatepassword" element={<Updatepassword />} />
        <Route path="/Thankyou" element={<Thankyou />} />
        {/* Protected Main Layout */}
        {isAuthenticated ? (
          <Route path="/*" element={<Mainlayout />} />
        ) : (
          <Route path="/*" element={<PublicLayout />} />
        )}
        {/* <Route path="/*" element={<Mainlayout />} /> */}
      </Routes>
    </Router>
  );
};
export default App;
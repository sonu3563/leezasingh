import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import MyAccount from "../pages/MyAccount";
import PrivateRoute from "../components/PrivateRoute"; 

const FrontendRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
                <Route path="/my-account" element={<MyAccount />} />
            </Route>
        </Routes>
    );
};

export default FrontendRoutes;

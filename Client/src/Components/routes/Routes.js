import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../Pages/Sidebar";
import { AuthProvider } from "../context/AuthContext";
import { AlertProvider } from "../context/AlertContext";
import { CreatorProvider } from "../context/CreatorContext";
import CompanyProfile from "../Pages/Dashboard/company/CompanyProfile";
import CreatorProfile from "../Pages/Dashboard/creators/CreatorProfile";
import { CompanyProvider } from "../context/CompanyContext";
import Postjobs from "../Pages/Dashboard/company/Postjobs";
import { JobProvider } from "../context/JobContext";
import ManageJob from "../Pages/Dashboard/company/ManageJob";
import Alljobs from "../Pages/Dashboard/Alljobs";
import SpecificRole from "../Pages/Dashboard/creators/SpecificRole";
import AppliedJobs from "../Pages/Dashboard/creators/Appliedjobs";
import Help from "../Pages/Dashboard/Help";
import { useState } from "react";
import {TicketProvider} from "../context/TicketContext";
import TicketHistory from "../Pages/utils/TicketHistory";
import Allusers from "../Pages/Dashboard/admin/Allusers";
import { AdminProvider } from "../context/AdminContext";
const RoleBasedRoute = ({ element, allowedRoles }) => {
  // const { user } = useAuth();
  const user = localStorage.getItem("userData");

    
  // console.log("routes", user);
  if (!user) return <Navigate to="/" />;

  console.log("Logged-in User:", user);

  const userRole = localStorage.getItem("user_role");

  console.log("Extracted Role:", userRole);

  const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase().replace(/\s+/g, ""));

  return normalizedAllowedRoles.includes(userRole) ? element : <Navigate to="/" />;
};

const AppRoutes = () => {
  const Role = localStorage.getItem("user_role");
  const [openMenus, setOpenMenus] = useState({});
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const menuItems = {
    admin: [
      { name: "All-Jobs", path: "/admin/All-jobs" },
      { name: "All users", path: "/admin/All-Users" },
      { name: "Help and Support", path: "/Ticket-History" },
    ],
    company: [
      { name: "My Profile", path: "/company/profile" },
      { name: "Post Job", path: "/company/postjob" },
      { name: "Help & Support", path: "/company/support" },
    ],
    creator: [
      { name: "All-Jobs", path: "/creator/All-jobs" },
      { name: "Creator Specific job", path: "/creator/Creator-Specific-job" },
      { name: "My Applications", path: "/creator/My-Applications" },
      { name: "My Profile", path: "/creator/profile" },
      { name: "Help & Support", path: "/creator/support" },
    ],
  };


  return (
    <AlertProvider>
    <AuthProvider>
    <JobProvider>
    <CompanyProvider>
    <CreatorProvider>
      <AdminProvider>
        <TicketProvider>
        
    <div className="flex">

    <Sidebar
  isSidebarOpen={isSidebarOpen}
  toggleSidebar={toggleSidebar}
  setIsSidebarOpen={setIsSidebarOpen}
  userName={localStorage.getItem("user_name") || "UNKNOWN"}
  userRole={localStorage.getItem("user_role") || "UNKNOWN"}
  menuItems={menuItems}
  openMenus={openMenus}
  toggleMenu={toggleMenu}
  logout={logout}
/>


 
<div className={`flex-1 w-full ${isSidebarOpen ? "ml-72" : "ml-0"} transition-all duration-300 py-2.5 px-4 overflow-hidden`}>

      <Routes>
          <Route
            path="/creator/profile"
            element={<RoleBasedRoute element={<CreatorProfile />} allowedRoles={["creator"]} />}
          />
          <Route
            path='/Ticket-History/:id?'
            element={<RoleBasedRoute element={<TicketHistory />} allowedRoles={["creator", "company", "admin"]} />}
          />
          <Route
            path={`/${Role}/support`}
            element={<RoleBasedRoute element={<Help />} allowedRoles={["creator","company"]} />}
          />
          <Route
            path="/creator/Creator-Specific-job"
            element={<RoleBasedRoute element={<SpecificRole />} allowedRoles={["creator"]} />}
          />
          <Route
            path="/creator/My-Applications"
            element={<RoleBasedRoute element={<AppliedJobs />} allowedRoles={["creator"]} />}
          />
          <Route
            path={`/${Role}/All-jobs`}
            element={<RoleBasedRoute element={<Alljobs />} allowedRoles={["creator","admin"]} />}
          />
          <Route
            path="/company/profile"
            element={<RoleBasedRoute element={<CompanyProfile />} allowedRoles={["company"]} />}
          />
          <Route
            path="/company/postjob"
            element={<RoleBasedRoute element={<Postjobs />} allowedRoles={["company"]} />}
          />
          <Route
            path="/company/manage-job/:jobId"
            element={<RoleBasedRoute element={<ManageJob />} allowedRoles={["company"]} />}
          />
          <Route
            path="/admin/All-Users"
            element={<RoleBasedRoute element={<Allusers />} allowedRoles={["admin"]} />}
          />
        </Routes>

      </div>
    </div>

    </TicketProvider>
  </AdminProvider>
</CreatorProvider>
    </CompanyProvider>
    </JobProvider>
    </AuthProvider>
    </AlertProvider>

  );
};
export default AppRoutes;

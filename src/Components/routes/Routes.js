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
  return (
    <AlertProvider>
    <AuthProvider>
    <JobProvider>
    <CompanyProvider>
    <CreatorProvider>
      <TicketProvider>
    <div className="flex">

      <Sidebar />

 
      <div className="flex-1 w-full ml-72 py-2.5 px-4 overflow-hidden">
        <Routes>
        <Route
            path="/creator/profile"
            element={<RoleBasedRoute element={<CreatorProfile />} allowedRoles={["creator"]} />}
          />
            <Route
            path='/Ticket-History'
            element={<RoleBasedRoute element={<TicketHistory />} allowedRoles={["creator","company"]} />}
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
            path="/creator/All-jobs"
            element={<RoleBasedRoute element={<Alljobs />} allowedRoles={["creator"]} />}
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
        </Routes>
        


      </div>
    </div>


    </TicketProvider>
    </CreatorProvider>
    </CompanyProvider>
    </JobProvider>
    </AuthProvider>
    </AlertProvider>

  );
};
export default AppRoutes;

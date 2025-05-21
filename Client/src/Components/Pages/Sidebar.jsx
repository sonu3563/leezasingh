import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { XMarkIcon, ChevronDownIcon ,Bars3Icon} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
// import { Roles } from "../../utils/roles";
import {
  House, Users, User, UserCog, Handshake, FolderOpenDot,
  LogOut, FileSpreadsheet, FileChartLine, CalendarCog, Folders,
} from "lucide-react";


// const userImagePlaceholder = "https://via.placeholder.com/150";

export function Sidebar({isSidebarOpen,toggleSidebar,setIsSidebarOpen}) {
  const [openMenus, setOpenMenus] = useState({});
  const { logout } = useAuth();
  const userName = localStorage.getItem("user_name") || "UNKNOWN";


const Roles = {
  ADMIN: "admin",
  COMPANY: "company",
  CREATORS: "creator",
};

const userRole = localStorage.getItem("user_role") || "UNKNOWN";


  const menuItems = {
    [Roles.ADMIN]: [
      { name: "All-Jobs", path: "/admin/All-jobs" },
      { name: "All users", path: "/admin/All-Users" },
    
  { name: "Help and Support", path: "/Ticket-History" }

    ],
    [Roles.COMPANY]: [
      // { name: "Dashboard", path: "/company/dashboard", icon: <House /> },
      { name: "Post Job", path: "/company/postjob" },
      { name: "My Profile", path: "/company/profile" },
      { name: "Help & Support", path: "/company/support" },
    
    ],
    [Roles.CREATORS]: [
      { name: "All-Jobs", path: "/creator/All-jobs"},
      { name: "Creator Specific job", path: "/creator/Creator-Specific-job"},
      { name: "My Applications", path: "/creator/My-Applications" },
      { name: "My Profile", path: "/creator/profile" },
      { name: "Help & Support", path: "/creator/support" },
    
      

    ],
  };

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false); // Close the sidebar when clicking a menu on mobile
    }
  };
  
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && !isSidebarOpen) {
        setIsSidebarOpen(true); // Open sidebar when width is greater than or equal to 768px
      } else if (window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false); // Close sidebar when width is less than 768px
      }
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);
  

  const items = menuItems[userRole] || [];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
   <button
      className="fixed top-4 left-4 z-20 p-2 bg-white rounded-full shadow-xl xl:hidden"
      onClick={toggleSidebar}
    >
      {isSidebarOpen ? (
        <XMarkIcon className="h-6 w-6 text-gray-700" />
      ) : (
        <Bars3Icon className="h-6 w-6 text-gray-700" />
      )}
    </button>


    {/* Sidebar Navigation */}
<aside
  className={`bg-white shadow-lg fixed left-0 top-0 ${
    isSidebarOpen ? (window.innerWidth < 768 ? "w-full" : "w-72") : "w-0 overflow-hidden"
  } h-full z-10 rounded-xl transition-all duration-300 border border-gray-200 flex flex-col justify-between my-2.5 mx-1.5`}
>

  <div>
    <div className="relative flex items-center py-4 px-4 text-center border-b border-gray-200">
      <img className="rounded-3xl h-14 w-14 mx-2.5" alt="" />
      {isSidebarOpen && (
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          {userName.charAt(0).toUpperCase() + userName.slice(1)}
        </h2>
      )}
    </div>
    <div className="m-2">
      <ul className="flex flex-col gap-2">
        {menuItems[userRole]?.map(({ name, path, icon, children }) => (
          <li key={path} className={`${isSidebarOpen ? "block" : "hidden"}`}>
            {children ? (
           <button
           onClick={() => {
             toggleMenu(path);
             handleMenuClick(); // <-- Add this here as well
           }}
           className="flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors font-medium capitalize text-left text-gray-700 hover:bg-gray-100"
         >
           <span className="flex items-center gap-2">
             {icon}
             {isSidebarOpen && <span>{name}</span>}
           </span>
           {isSidebarOpen && (
             <ChevronDownIcon
               className={`h-5 w-5 text-gray-500 transition-transform ${
                 openMenus[path] ? "rotate-180" : ""
               }`}
             />
           )}
         </button>
         
            ) : (
              <li key={path} onClick={handleMenuClick}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  ` px-4 py-2 rounded-lg transition-colors text-gray-600 font-medium capitalize gap-2 flex flex-row ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                  }`
                }
              >
                {icon}
                {name}
              </NavLink>
            </li>
            
            
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
  <div className="mx-2 my-8">
      <button
        onClick={logout}
        className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg transition-colors font-medium capitalize text-gray-700 hover:bg-gray-100"
      >
        <LogOut />
        LogOut
      </button>
    </div>
</aside>


  
  </>
  );
}

export default Sidebar;

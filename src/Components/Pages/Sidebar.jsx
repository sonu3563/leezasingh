import { useState } from "react";
import { NavLink } from "react-router-dom";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
// import { Roles } from "../../utils/roles";
import {
  House, Users, User, UserCog, Handshake, FolderOpenDot,
  LogOut, FileSpreadsheet, FileChartLine, CalendarCog, Folders,
} from "lucide-react";


// const userImagePlaceholder = "https://via.placeholder.com/150";

export function Sidebar() {
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
      { name: "All-Jobs", path: "/admin/dashboard" },
      { name: "Employee Management", path: "/admin/users" },
    
      { name: "My Profile", path: "/admin/profile" },
    ],
    [Roles.COMPANY]: [
      // { name: "Dashboard", path: "/company/dashboard", icon: <House /> },
      { name: "My Profile", path: "/company/profile" },
      { name: "Post Job", path: "/company/postjob" },
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

  const items = menuItems[userRole] || [];

  return (
    <aside className="bg-white shadow-lg fixed left-0 top-0 h-full w-72 z-10 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-gray-200 flex flex-col justify-between my-2.5 mx-1.5">
    <div>
      <div className="relative flex items-center py-4 px-4 text-center border-b border-gray-200">
        <img
          className="rounded-3xl h-14 w-14 mx-2.5"
          // src={userImagePlaceholder}
          alt=""
        />
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          {userName.charAt(0).toUpperCase() + userName.slice(1)} 
        </h2>
        <button className="absolute right-4 top-4 p-2 rounded focus:outline-none xl:hidden">
          <XMarkIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      <div className="m-2">
        <ul className="flex flex-col gap-2">
          {menuItems[userRole]?.map(({ name, path, icon, children }) => (
            <li key={path}>
              {children ? (
                <button
                  onClick={() => toggleMenu(path)}
                  className="flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors font-medium capitalize text-left text-gray-700 hover:bg-gray-100"
                >
                  <span>{name}</span>
                  {/* <span>{icon}</span> */}
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openMenus[path] ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition-colors text-gray-600 font-medium capitalize gap-2 flex flex-row ${
                      isActive
                        ? "bg-blue-600 text-white" 
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  {icon}
                  {name}
                </NavLink>
              )}
              {children && (
                <ul
                  className={`ml-4 mt-1 bg-gray-50 rounded-lg shadow-inner border-l border-gray-300 pl-4 transition-all duration-300 overflow-hidden ${
                    openMenus[path]
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {children.map(({ name, path }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-lg transition-colors text-gray-600 font-medium capitalize ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-100"
                          }`
                        }
                      >
                        {name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
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
  );
}

export default Sidebar;

import React, { useState, useEffect, useContext } from "react";
// import Cookies from "js-cookie";
import {
  Loader2
    } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../../utils/Alert";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import editicon from "../../assets/edit-icon.png";
import editicon from "../../../assest/profile/edit-icon.png";
import profileicon from "../../../assest/profile/profile-icon.png";
import { useCompany } from "../../../context/CompanyContext";
import avatar from "../../../assest/profile/avatar.png";
import key from "../../../assest/profile/key.png";
import file from "../../../assest/profile/file.png";
import filefolder from "../../../assest/profile/files-folder.png";
import security from "../../../assest/profile/security.png";
import { API_URL } from "../../../utils/Apiconfig";
// import { ProfileContext } from "../../utils/ProfileContext";
import googledrive from '../../../assest/profile/googledrive.png';
import dropbox from '../../../assest/profile/dropbox.png';
import profile from '../../../assest/profile/profile.png';
import plans from '../../../assest/profile/plans.png';

import { FaPen } from "react-icons/fa";
import useLoadingStore from "../../../utils/UseLoadingStore";


import defaultprofile from '../../../assest/profile/defaulttwo.jpeg'
import { Check, X } from "lucide-react";

// const DROPBOX_REDIRECT_URI = `${FAPI_URL}/my-profile`;  
const CompanyProfile = () => {
  const { isLoading, showLoading, hideLoading } = useLoadingStore();

  const { companyDetails,fetchCompanyProfile,setCompanyDetails, loading, alert, setAlert, saveCompanyProfile, handleCompanyChange } = useCompany();

  const [isEditMode, setIsEditMode] = useState(false);
  const [cut, setCut] = useState(false);

  // const saveChanges = async () => {
  //   const success = await saveCompanyProfile(companyDetails);
  //   if (!success) {
  //     setAlert({ type: 'error', message: 'Failed to update company profile.' });
  //   } else {
  //     setIsEditMode(false);
  //   }
  // };




  
  const [phoneverifybox, setPhoneverifybox] = useState(false);
  const [otpverifybox, setOtpverifybox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
//   const { profilePicture, setProfilePicture } = useContext(ProfileContext);
  const navigate = useNavigate();
  // Fetch user details on component mount
  const [message, setMessage] = useState("");
  // const [companyDetails, setCompanyDetails] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
 const [phoneNumber, setPhoneNumber] = useState(''); // Phone number input
    const [isotpsendbox, setIsotpsendbox] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));

    const [formData, setFormData] = useState({
        ssn: "",
        address: "",
      });


      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };


  const [isEdditing, setIsEdditing] = useState({
    ssn: false,
    address: false,
  });
  const [status, setStatus] = useState(false); // Default status is false
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [checkpass, setCheckpass] = useState("");
  // const [alert, setAlert] = useState(null);




const showAlert = (variant, title, message) => {
  setAlert({ variant, title, message });

  // Automatically remove alert after 5 seconds
  setTimeout(() => {
    setAlert(null);
  }, 3000);
};
  const [socialSecurityPass, setSocialSecurityPass] = useState("");
  // const [loading, setLoading] = useState(false);


  async function logout() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const apiUrl = `${API_URL}/api/auth/signout`;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(apiUrl, { method: "POST", headers });

      if (!response.ok) {
        throw new Error("Failed to log out. Please try again.");
      }

      // Clear token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("googleDriveToken");
      localStorage.removeItem("dropboxToken");
      localStorage.removeItem("role");
      // Clear cookies if used
    //   Cookies.remove("token");

      // Prevent cached pages from being accessed
      window.history.pushState(null, null, window.location.href);
      window.addEventListener("popstate", () => {
        window.history.pushState(null, null, window.location.href);
      });

      // Redirect to the login page
      navigate("/Login");
    } catch (error) {
      // console.error(error);
    }
  }
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setCut(true);
  };


  useEffect(() => {
    fetchCompanyProfile();
    // console.log("Company Detailsc 4321:", companyDetails);
  }, [])
  


  const saveChanges = async () => {
    const success = await saveCompanyProfile(companyDetails);
    if (!success) {
      setAlert({ type: 'error', message: 'Failed to update company profile.' });
    } else {
      setIsEditMode(false);
    }
  };
  
  const handleAddField = (field) => {
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [field]: [...(prevDetails[field] || []), ''], // Adds a new empty string to the array
    }));
  };
  
  const handleFieldChange = (e, field, index) => {
    const value = e.target.value;
    setCompanyDetails((prevDetails) => {
      const updatedArray = [...(prevDetails[field] || [])];
      updatedArray[index] = value; // Update the specific index in the array
      return { ...prevDetails, [field]: updatedArray };
    });
  };
  const handleRemoveField = (key, index) => {
    const updatedFields = [...companyDetails[key]];
    updatedFields.splice(index, 1); // Remove the field at the specified index
    handleCompanyChange({ target: { value: updatedFields } }, key); // Update the state with the new fields
  };
  


  return (
    <div className="max-w-full mx-auto py-8 px-4 mt-8">
    <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-200 max-w-full mx-auto space-y-10">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <div className="relative group w-24 h-24">
          <img
            src={defaultprofile}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <label className="cursor-pointer w-10 h-10 relative">
              <img src={editicon} alt="Edit" className="w-full h-full object-cover" />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">{companyDetails?.name}</h1>
          <p className="text-gray-500 text-sm">{companyDetails?.website?.[0]}</p>
        </div>
      </div>
  
      {/* Company Info Section */}
      <div className="bg-gray-50/60 p-6 rounded-2xl border border-gray-200 shadow-inner">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img src={avatar} alt="Company Icon" className="w-8 h-8" />
            <h2 className="text-xl font-semibold text-gray-700">Company Details</h2>
          </div>
          {!isEditMode ? (
            <img
              src={profileicon}
              alt="Edit Profile"
              className="w-7 h-7 cursor-pointer hover:scale-105 transition"
              onClick={toggleEditMode}
            />
          ) : (
            <X
              className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => {
                setIsEditMode(false);
              }}
            />
          )}
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {[
    { label: 'Name', key: 'name' },
    { label: 'Website', key: 'website', isArray: true },
    { label: 'About', key: 'about', isTextarea: true }, 
    { label: 'Industry', key: 'industry', isArray: true },
    { label: 'Number of Employees', key: 'noOfEmployees' },
    { label: 'Projects', key: 'projects', isArray: true },
    { label: 'Clients', key: 'clients', isArray: true },
    { label: 'Year Established', key: 'yearEstablished' },
    { label: 'Support Email', key: 'supportEmail' },
    { label: 'Support Phone', key: 'supportPhoneNumber' }, 
   
  ].map((field, index) => (
    <div key={index} className="flex flex-col">
      <label htmlFor={field.key} className="text-sm text-gray-500 mb-1 font-medium">
        {field.label}
      </label>
      {!isEditMode ? (
  <p className="text-gray-800 font-medium leading-snug break-words">
    {field.isArray
      ? companyDetails?.[field.key]?.join(', ') || '-'
      : field.key === 'yearEstablished' && companyDetails?.[field.key]
      ? new Date(companyDetails[field.key]).getFullYear()
      : companyDetails?.[field.key] || ''}
  </p>
) : field.isTextarea ? (
  <textarea
    id={field.key}
    rows={4}
    value={companyDetails?.[field.key] || ''}
    onChange={(e) => handleCompanyChange(e, field.key)}
    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
  />
) : (

        <div>
          {/* Conditionally Render Array Fields */}
          {field.isArray ? (
            <>
              <div className="flex flex-col">
                {companyDetails?.[field.key]?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleFieldChange(e, field.key, idx)}
                      className="border border-gray-300 rounded-xl px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.key, idx)} // Call the remove function
                      className="text-red-500 hover:text-red-600"
                    >
                      &times; {/* This will display a '×' symbol for removing */}
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleAddField(field.key)} // Call the add function
                className="text-blue-500 hover:text-blue-600 mt-2"
              >
                + Add {field.label}
              </button>
            </>
          ) : (
            <input
            id={field.key}
            type="text"
            value={
              field.key === 'yearEstablished' && companyDetails?.[field.key]
                ? new Date(companyDetails[field.key]).getFullYear()
                : companyDetails?.[field.key] || ''
            }
            onChange={(e) => handleCompanyChange(e, field.key)}
            className="border border-gray-300 rounded-xl px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          
          )}
        </div>
      )}
    </div>
  ))}
</div>

  
        {isEditMode && (
          <div className="flex justify-end mt-8">
            <button
              onClick={saveChanges}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>



  
      {/* Logout Section */}
      <div className="bg-gray-50/60 p-6 rounded-2xl border border-gray-200 shadow-inner">
        <div className="flex items-center gap-3 mb-4">
          <img src={security} alt="Security Icon" className="w-8 h-8" />
          <h2 className="text-lg font-semibold text-gray-700">Log Out</h2>
        </div>
        <p className="text-gray-500 mb-4 text-sm">
          Click the button below to securely log out of your account. Your progress will be saved.
        </p>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          Log Out
        </button>
      </div>
  
      {alert && <Alert {...alert} />}
    </div>
  </div>
  
  );
};
export default CompanyProfile;
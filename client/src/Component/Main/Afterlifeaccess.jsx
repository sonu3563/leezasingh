import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, Grid, List, Loader2 } from "lucide-react";
import { ArrowRight, Menu, LayoutGrid, X, Users, Camera, Edit, Eye, Trash2, EllipsisVertical, Download, Search } from 'lucide-react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { API_URL } from "../utils/Apiconfig";
import ShareIcon from "../../assets/ShareIcon.png"
import editicon from "../../assets/editicon.png"
import arrowdown from "../../assets/arrowdown.png"
import WhiteFolderNotch from "../../assets/WhiteFolderNotch.png"
import FileText from "../../assets/FileText.png"
import foldericon from "../../assets/foldericon.png"
import hariom from "../../assets/hariom.png"
import useLoadingStore from "../../store/UseLoadingStore";

const Afterlifeaccess = () => {
  const [folders, setFolders] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoadingStore();
  const [isGridView, setIsGridView] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [queryParams, setQueryParams] = useState({ email: "", otp: "" });
  const [expandedItemId, setExpandedItemId] = useState(null);
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isMembershipActive, setIsMembershipActive] = useState(false);
  const [showafterlifePopup, setAfterlifePopup] = useState(false); // Toggles the popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [designeeName, setDesigneeName] = useState(""); // Holds the input for designee name
  const [designeePhone, setDesigneePhone] = useState(""); // Holds the input for designee phone number
  const [designeeEmail, setDesigneeEmail] = useState("");
  const [userFoldersAndFiles, setUserFoldersAndFiles] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({
    "Legal Documents": [],
    "Insurance": [],
    "Education Documents": [],
    "Property Documents": [],
  });
  const [designers, setDesigners] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentSelection, setCurrentSelection] = useState("Only View");

  const dropdownChoices = ["Only View", "Edit Access", "Remove Access"];

  const handleSelection = (choice) => {
    setCurrentSelection(choice);
    setDropdownOpen(false);
  };


  const fetchFoldersAndFiles = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/api/auth/get-user-folders-and-files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.folders) {
        const folders = response.data.folders;
        const foldersWithFiles = folders.reduce((acc, folder) => {
          acc[folder.folder_name] = folder.files || [];  // Assuming files are part of the response
          return acc;
        }, {});

        setUserFoldersAndFiles(foldersWithFiles);  // Setting the folders with files in state

        // Initialize selected files state based on the fetched data
        const initialSelectedFiles = folders.reduce((acc, folder) => {
          acc[folder.folder_name] = [];  // Empty initially
          return acc;
        }, {});

        setSelectedFiles(initialSelectedFiles);
      }
    } catch (error) {
      console.error("Error fetching folders and files", error);
    }
  };
  


  useEffect(() => {
    fetchFoldersAndFiles();    
  }, []);


  const handleAddDesignee = async () => {
    showLoading();
    if (designeeName && designeePhone && designeeEmail) {
      setDesigners([...designers, designeeName]); // Add the new designer to the list
      //setShowDesignerPopup(false); // Close the popup
      console.log("designeeName", designeeName);
      console.log("designeePhone", designeePhone);
      console.log("designeeEmail", designeeEmail);
      setDesigneeName(""); // Reset the input fields
      setDesigneePhone("");
      setDesigneeEmail("");
      console.log("designeeName", designeeName);
      console.log("designeePhone", designeePhone);
      console.log("designeeEmail", designeeEmail);
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/api/designee/add-designee`, { designeeName, designeePhone, designeeEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      // alert("Designee added successfully!");
      setAfterlifePopup(false);
      // fetchDesignees();
      hideLoading();
    } else {
      alert("Please fill out all fields before inviting a designee.");
      hideLoading();
    }

  };

  const toggleDropdownVisibility = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleCategoryExpansion = (category) => {
    setExpandedCategories((previousState) => ({
      ...previousState,
      [category]: !previousState[category],
    }));
  };

  const toggleCategorySelection = (category) => {
    const allFilesSelected =
      selectedFiles[category]?.length === userFoldersAndFiles[category]?.length;
  
    const newSelectedFiles = allFilesSelected
      ? []  // Deselect all files in this category if they are all selected
      : userFoldersAndFiles[category]?.map((file) => file.id);  // Select all files in the category
  
    setSelectedFiles((previousState) => ({
      ...previousState,
      [category]: newSelectedFiles,
    }));
  };

  const toggleFileSelection = (category, file) => {
    setSelectedFiles((previousState) => {
      const isFileSelected = previousState[category]?.includes(file.id);
  
      const newSelection = isFileSelected
        ? previousState[category].filter((f) => f !== file.id)  // Deselect the file
        : [...previousState[category], file.id];  // Select the file
  
      return {
        ...previousState,
        [category]: newSelection,
      };
    });
  };

  const selectAllFiles = () => {
    const newSelectedFiles = {};
  
    Object.keys(userFoldersAndFiles).forEach((category) => {

      if (userFoldersAndFiles[category]?.length > 0) {
        newSelectedFiles[category] = userFoldersAndFiles[category].map((file) => file.id);
      }
    });
  
    setSelectedFiles(newSelectedFiles);
  };

  const deselectAllFiles = () => {
    setSelectedFiles({});
  };

  const fileCategories = {
    "Legal Documents": ["Estate 4.pdf", "Estate 4.pdf", "Estate 4.pdf"],
    "Insurance": [],
    "Education Documents": [],
    "Property Documents": [],
  };

  const togglePopup = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
    
    });
    setIsPopupOpen(!isPopupOpen);
  };

  const handleOption = (option) => {
    console.log(`${option} selected`);
    setIsPopupOpen(false); // Close the popup
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopupD = () => {
    setDropdownOpen(false);
    setIsOpen(!isOpen);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const sharedAllFiles = async (email) => {

    const token = localStorage.getItem("token");

    try {
      const payload = { to_email_id: email };
      const headers = token
        ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' };

      const response = await axios.post(`${API_URL}/api/designee/get-shared-voices-cumulus`, payload, { headers });

      if (response.data && Array.isArray(response.data.voices)) {
        const filesWithUsers = response.data.voices.map((voice) => {
          const fromUser = voice.from_user;
          const sharedVoices = voice.shared_voices || [];
          return sharedVoices.map((file) => ({
            ...file,
            from_user: fromUser,
            created_at: voice.created_at, // Attach the shared date from the main object
          }));
        });

        const allSharedFiles = filesWithUsers.flat();
        setSharedFiles(allSharedFiles);
      } else {
        setSharedFiles([]);
      }
    } catch (error) {
      console.error("Error fetching shared files:", error.message);
      setSharedFiles([]);
    }
  };


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get('email');
    if (emailFromUrl) {
      setQueryParams((prevParams) => ({ ...prevParams, email: emailFromUrl }));
      setEmail(emailFromUrl);
    }
  }, [location]);

  useEffect(() => {
    sharedAllFiles(email);
  }, [email]);

  const toggleDropdown = (username, accessType) => {
    const key = `${username}-${accessType}`;
    setExpandedItemId(expandedItemId === key ? null : key);
  };

  const groupedFiles = sharedFiles.reduce((acc, file) => {
    const username = file?.from_user?.username || "Unknown User";
    const accessType = file.access || "view";

    if (!acc[username]) {
      acc[username] = { username, files: { view: [], edit: [] } };
    }

    acc[username].files[accessType].push(file);
    return acc;
  }, {});

  const isCategorySelected = (category) =>
    selected[category].length === files[category].length &&
    files[category].length > 0;

    const isCategoryFullySelected = (category) => {
      return selectedFiles[category]?.length === userFoldersAndFiles[category]?.length;
    };
  return (
    <div className="">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">After Life Access</h1>
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 sm:hidden"
          >
            {isGridView ? <List size={20} /> : <Grid size={20} />}
          </button>
        </div>

        <div className="sm:block">
          {!isGridView ? (
            <div>
              <div
                className="bg-[#0067FF] w-60 rounded-2xl my-2 px-2 py-4 cursor-pointer space-y-0 sm:space-y-1 flex flex-col gap-3"
                onClick={togglePopupD}
              >
                <button className="flex items-center  text-white px-2">
                  {/* <img src={VoiceLogo} alt="" className="h-12 w-12" /> */}
                  <img src={ShareIcon} alt="" className='h-8 bg-white mr-3 p-1 rounded-full' />
                  <p className="text-xl">Share File</p>
                </button>
                <div className="flex justify-between items-center">
                  <p className="text-white  text-xs ml-1">Click to Share File/Doc Now</p>
                  <ArrowRight className="mr-2 text-white w-5 h-5" />
                </div>
              </div>
              {/* <div className="flex">
                <h1 className="text-lg font-semibold text-blue-600 border-b-4 border-blue-500 py-4">Lists of Shared Items</h1>
              </div> */}
              <div className="flex gap-6">
                <div class="flex justify-between items-center mt-8 md:px-0 border-gray-300">
                  <div class="text-sm">
                    <div class="flex items-center md:gap-x-2 border-b-4 border-blue-600 text-blue-600">
                      <span class=" font-semibold pb-2 mr-2">List of shared items</span>
                      <span class="text-black rounded-lg text-sm mt-1 mb-2 px-2.5 bg-[#EEEEEF]">1</span>
                    </div>
                    <div class=""></div>
                  </div>
                </div>
                {/* Popup */}
                {isOpen && (
                  <div className="flex flex-col items-center justify-center z-40 bg-gray-100">
                    {/* Trigger Button */}
                    {/* <button
                      onClick={togglePopup}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Click to Share File/Doc Now
                    </button> */}

                    {/* Popup */}
                    {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg relative">
            <button
              onClick={togglePopupD}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              Share <span className="text-black">Items</span>
            </h2>

            {/* File Input */}
            <div className="mb-4">
              <div className="relative w-full">
                {/* Dropdown Trigger */}
                <div
                  onClick={toggleDropdownVisibility}
                  className="flex items-center justify-between text-black px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:border-[#0067ff] hover:border-[#0067ff] rounded-lg w-full text-left"
                >
                  <button>Add Files, Documents</button>
                  <img className="w-3" src={arrowdown} alt="" />
                </div>

                {dropdownVisible && (
                  <div className="absolute top-12 left-0 bg-white border shadow-lg rounded-lg w-full z-10">
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Select Files, Documents</span>
                        <span className="flex justify-between items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox mr-3"
                            checked={Object.keys(userFoldersAndFiles).every((category) =>
                              isCategoryFullySelected(category)
                            )}
                            onChange={() => {
                              const allCategoriesSelected = Object.keys(userFoldersAndFiles).every(
                                (category) => isCategoryFullySelected(category)
                              );
                              setSelectedFiles(
                                allCategoriesSelected
                                  ? Object.keys(userFoldersAndFiles).reduce((acc, category) => {
                                      acc[category] = [];
                                      return acc;
                                    }, {})
                                  : Object.keys(userFoldersAndFiles).reduce((acc, category) => {
                                      acc[category] = userFoldersAndFiles[category];
                                      return acc;
                                    }, {})
                              );
                            }}
                          />
                          <span className="text-[#0067ff] text-xs">Select All</span>
                        </span>
                      </div>

                      {/* File Categories */}
                      {Object.keys(userFoldersAndFiles).map((category) => (
                        <div key={category} className="mt-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center justify-between gap-3">
                              <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={isCategoryFullySelected(category)}
                                onChange={() => toggleCategorySelection(category)}
                              />
                              <img className="w-8 bg-blue-600 p-1 rounded-full" src={WhiteFolderNotch} alt="" />
                              <span
                                className="ml-2 cursor-pointer"
                                onClick={() => toggleCategoryExpansion(category)}
                              >
                                {category}
                              </span>
                            </div>
                            <button
                              onClick={() => toggleCategoryExpansion(category)}
                              className="text-[#0067ff]"
                            >
                              {expandedCategories[category] ? (
                                <img className="w-3 rotate-[180deg]" src={arrowdown} alt="" />
                              ) : (
                                <img className="w-3" src={arrowdown} alt="" />
                              )}
                            </button>
                          </div>

                          {/* File List */}
                          {expandedCategories[category] && (
                            <div className="mt-2 bg-[#eff5ff] py-3 border-b px-2">
                              {userFoldersAndFiles[category].map((file, index) => (
                                <div key={index} className="mt-2 flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={selectedFiles[category].includes(file.file_name)}
                                    onChange={() => toggleFileSelection(category, file.file_name)}
                                  />
                                  <img className="w-8 bg-white p-1 rounded-full" src={FileText} alt="" />
                                  <span className="ml-2">{file.file_name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add Button */}
                    <div className="p-4">
                      <button className="text-[#0067ff] text-sm px-2 py-2 rounded-lg w-full text-end">
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Files with Access */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Files with access</h3>
              <button className="flex items-center space-x-2">
                <span className="bg-gray-200 rounded-full p-2 py-2 w-9 h-9">?</span>
                <span>Add</span>
              </button>
              <div className="flex">
                <div className="flex items-center">
                  <img className="w-8 h-8 bg-[#DCDFE4] p-1 rounded-full z-[3]" src={foldericon} alt="" />
                  <img
                    className="w-7 h-7 bg-[#DCDFE4] p-1 ring-2 ring-[#c6c9cd] -ml-2 mr-3 rounded-full z-[5]"
                    src={FileText}
                    alt=""
                  />
                </div>
                <div className="flex items-start justify-start flex-col">
                  <p className="font-semibold mb-1">Real Estate 4.pdf</p>
                  <p className="text-xs text-blue-500 font-semibold">+3 Items</p>
                </div>
              </div>
            </div>

            {/* Add Existing Designee */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Add Existing Designee</label>
              <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
                <option>Select Designee</option>
              </select>
            </div>
          </div>
        </div>
      )}
                  </div>
                )}
           
              </div>
              <table class="w-full table-auto">
                <thead>
                  <tr class="bg-gray-200 py-4">
                    <th class="px-2 py-4 text-slate-500 text-left font-semibold">Shared User</th>
                    <th class="px-2 py-2 text-slate-500 text-left font-semibold">Shared Date</th>
                    <th class="px-2 py-2 text-slate-500 text-left font-semibold">Shared Item</th>
                    <th class="px-2 py-2 text-slate-500 text-left font-semibold">Access</th>
                    <th class="px-2 py-2 text-slate-500 text-left font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b hover:bg-gray-50">
                    <td class="px-2 py-3 w-[20%]">
                      <div class="py-2">
                        <span class="ml-3 bg-gray-100 rounded-lg py-2 px-2 font-semibold text-sm">SONU</span>
                      </div>
                    </td>
                    <td class="font-semibold text-slate-500 w-[22%] text-sm">28-9-2025</td>
                    <td class="w-[30%] text-sm">
                      <div class="flex items-center cursor-pointer relative">
                        <div class="flex">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down text-gray-500 mr-1 mt-1 cursor-pointer">
                            <path d="m6 9 6 6 6-6">
                            </path>
                          </svg>
                          <div>
                            <p class="font-semibold mb-1">freelance-4523096_1920.jpg</p>
                            <p class="text-xs text-blue-500 font-semibold">+3 Items</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="font-medium text-black pl-2 w-[18%] text-sm"><span className="bg-[#EEEEEF] rounded-lg px-3 py-2">Edit</span></td>
                    <td class="font-medium text-gray-400 pl-2 w-[22%] relative" onClick={togglePopup}><img src={editicon} alt="" className='h-8 bg-white mr-3 p-1 rounded-full cursor-pointer' />
                      {/* Popup */}
                      {isPopupOpen && (
                        <div
                          className="absolute bg-white border border-gray-300 rounded-lg shadow-lg z-10 right-24 w-40">
                          <ul className="text-sm">
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-[#0067FF]"
                              onClick={() => handleOption("Only View")}
                            >
                              Only View
                            </li>
                            <li
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-[#0067FF]"
                              onClick={() => handleOption("Edit Access")}
                            >
                              Edit Access
                            </li>
                            <li
                              className="px-4 py-2 cursor-pointer text-red-500 hover:bg-gray-100 hover:text-red-600"
                              onClick={() => handleOption("Remove Access")}
                            >
                              Remove Access
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {sharedFiles.map((file, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
                  <p><strong>Username:</strong> {file.from_user?.username || "Unknown"}</p>
                  <p><strong>Voice Name:</strong> {file.voice_name || "Unknown"}</p>
                  <p><strong>Access:</strong> {file.access}</p>
                  <p><strong>Shared At:</strong> {new Date(file.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Afterlifeaccess;

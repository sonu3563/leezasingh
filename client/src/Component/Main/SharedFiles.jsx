import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, Grid, List } from "lucide-react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { API_URL } from "../utils/Apiconfig";
import document from "../../assets/Document.png";

const SharedFiles = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [queryParams, setQueryParams] = useState({ email: "", otp: "" });
  const [expandedItemId, setExpandedItemId] = useState(null); // Track dropdown visibility
  const dropdownRef = useRef(null); // Reference for dropdown positioning
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const closePopup = () => { setShowPopup(false); };
  const [sharedUser, setsharedUser] = useState(true);
  const [sharedItem, setsharedItem] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");
}, [])


const handleClickOutside = (event) => {
      
  if (dropdownRef.current[openDropdownIndex] && !dropdownRef.current[openDropdownIndex].contains(event.target)) {
    setExpandedItemId(null); 
  }
};



const sharedAllFiles = async (email) => {
  const token = localStorage.getItem("token");

  try {
    let response;
    const payload = { to_email_id: email };

    if (token) {
      response = await axios.post(
        `${API_URL}/api/designee/get-shared-files-cumulus`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      response = await axios.post(
        `${API_URL}/api/designee/get-shared-files-nc`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const deduplicateFiles = (files) => {
      const seen = new Set();
      return files.filter((file) => {
        const fileId = file.file_id || file.id; // Adjust depending on your file schema
        if (seen.has(fileId)) {
          return false;
        }
        seen.add(fileId);
        return true;
      });
    };

    if (response.data && Array.isArray(response.data.files)) {
      const filesWithUsers = response.data.files.map((userFiles) => {
        const fromUser = userFiles.from_user;
        const sharedFiles = userFiles.shared_files || [];
        return sharedFiles.map((file) => ({
          ...file,
          from_user: fromUser,
        }));
      });

      const allSharedFiles = deduplicateFiles(filesWithUsers.flat());
      setSharedFiles(allSharedFiles);
    } else if (
      response.data &&
      response.data.decryptedSharedFiles &&
      Array.isArray(response.data.decryptedSharedFiles)
    ) {
      const filesWithUsers = response.data.decryptedSharedFiles.map((userFiles) => {
        const fromUser = userFiles.from_user;
        const sharedFiles = userFiles.shared_files || [];
        return sharedFiles.map((file) => ({
          ...file,
          from_user: fromUser,
        }));
      });

      const allSharedFiles = deduplicateFiles(filesWithUsers.flat());
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
      setQueryParams((prevParams) => ({
        ...prevParams,
        email: emailFromUrl,
      }));
      setEmail(emailFromUrl);
    }
  }, [location]);

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const email = params.get("email");
    sharedAllFiles(email);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const guest_token = localStorage.getItem("guest_token");
    if (token) {
      setShowPopup(false);
    } else {
      setShowPopup(!guest_token);
    }
  }, []);

  const toggleDropdown = (username, accessType) => {
    const key = `${username}-${accessType}`; // Create a unique key for each dropdown
    setExpandedItemId(expandedItemId === key ? null : key); // Toggle only if the same key is clicked
  };

  // Group by username and access type
  const groupedFiles = sharedFiles.reduce((acc, file) => {
    const username = file?.from_user?.username || "Unknown User";
    const accessType = file.access || "view"; // assuming access type is either 'view' or 'edit'

    if (!acc[username]) {
      acc[username] = {
        username,
        files: {
          view: [],
          edit: []
        }
      };
    }

    acc[username].files[accessType].push(file);
    return acc;
  }, {});

  const handlesharedUser = () => {
      setsharedUser(true);
      setsharedItem(false);
  }

  const handlesharedItem = () => {
    setsharedUser(false);
    setsharedItem(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = queryParams.email.trim();
    const trimmedPassword = password.trim();

    try {
      const response = await fetch(`${API_URL}/api/designee/nc-designee-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoginError('Login failed. Please check your credentials.');
        return;
      }
      if (response.status === 200) {
        setEmail(email);
        setShowPopup(false);
        setLoginError('');
        sharedAllFiles(email);
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again later.');
    }
  };

  const fetchFileContent = async (fileId) => {
    try {
      setLoading(true);
      setError("");
      console.log("defaultttttttttttttt", fileId);
      const response = await axios.post(
        `${API_URL}/api/view-file-content`,
        { fileId: fileId },
      );

      console.log("xknwjxbexnbc", response);

      const { file_name, file_url, file_type } = response.data;

      if (!file_url) {
        throw new Error("File URL is missing from the response.");
      }

      setFileData({
        fileName: file_name || "Unknown",
        mimeType: file_type || "Unknown",
        fileUrl: file_url,
      });

      setShowOverlay(true); // Show overlay after fetching file details

    } catch (err) {
      console.error("Error fetching file content:", err);
      setError(
        err.response?.data?.message ||
        "An unexpected error occurred while fetching the file content."
      );
    } finally {
      setLoading(false);
    }
  };


  const renderFileContent = () => {
    if (!fileData || !fileData.fileUrl) return null;

    const { mimeType, fileUrl } = fileData; // Destructuring to get mimeType and fileUrl from state

    console.log("MIME Type:", mimeType); // Log MIME type to check if it is image-related

    console.log("File URL:", fileUrl); // Log the File URL to check

    // Handle Image files (e.g., PNG, JPG, SVG)

    if (
      mimeType.startsWith("image/") || // Covers common image types
      mimeType === "image/jpeg" ||
      mimeType === "image/jpg" ||
      mimeType === "image/png" ||
      mimeType === "jpg" || // Specific check for 'jpg'
      mimeType === "jpeg" || // Specific check for 'jpeg'
      mimeType === "png" ||
      mimeType === "image/svg+xml"
    ) {
      return (
        <div>
          <img
            src={fileUrl}
            alt="file content"
            style={{ width: "100%", maxHeight: "500px" }}
            onError={(e) => {
              console.error("Error loading image:", e);

              e.target.src = "https://via.placeholder.com/500"; // Fallback if image fails to load
            }}
          />
        </div>
      );
    }

    // Handle PDF files

    if (mimeType === "application/pdf" || mimeType === "pdf") {
      return (
        <iframe
          src={fileUrl}
          title="PDF Document"
          style={{ width: "500vw", height: "500vh", border: "none" }}
        />
      );
    }

    // Handle Word Documents (.docx) via Google Docs Viewer

    if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/msword" ||
      mimeType === "docx" // In case backend sends 'docx' instead of full MIME type
    ) {
      const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
        fileUrl
      )}&embedded=true`;

      return (
        <iframe
          src={googleDocsUrl}
          title="Word Document Viewer"
          style={{ width: "100vw", height: "200vh", border: "none" }}
          className="max-w-6xl overflow-hidden"
        />
      );
    }

    // Handle Excel files (e.g., .xlsx, .xls)

    if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      mimeType === "application/vnd.ms-excel"
    ) {
      return (
        <div>
          <p>Spreadsheet detected. Please download to view:</p>

          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download Spreadsheet
          </a>
        </div>
      );
    }

    // Default fallback for unsupported file types

    return <p>Unsupported file type for viewing.</p>;
  };

  const renderOverlay = () => (
    <div
      className="fixed top-0 left-0  w-[100vw] h-[100%] bg-[rgba(0,0,0,0.8)] text-white z-[1000] flex justify-center items-center"
      onContextMenu={(e) => e.preventDefault()} // Restrict right-click
    >
      <div
        className="bg-white text-black p-5 rounded-lg max-w-[90%] max-h-[90%] overflow-y-auto relative w-[80%] h-auto"
      >
        <h2>Document Viewer</h2>

        {renderFileContent()}

        <button
          className="absolute top-[10px] right-[10px] bg-red-500 text-white border-none px-[10px] py-[2px] rounded"
          onClick={() => setShowOverlay(false)}
        >
          X
        </button>
      </div>
    </div>
  );



  return (
    <div className="p-6">
      {showPopup && (
        <form onSubmit={handleSubmit}>
          <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black bg-opacity-40">
            <div className="bg-white p-5 rounded-lg shadow-lg w-1/3 mx-4">
              <div className="flex justify-between border-b-2 border-slate-300 w-full">
                <h2 className="font-bold py-2 border-slate-500">For File Access</h2>
              </div>
              <p className="text-sm font-semibold text-slate-400 mb-6 mt-4">
                Enter your email and OTP to verify your identity.
              </p>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email ID</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={queryParams.email}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  readOnly
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">OTP</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g. 1234"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <button></button>
                <button className="bg-blue-500 text-white px-10 py-2 rounded-lg text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700">
                  Done
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Shared Files</h1>
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 sm:hidden"
          >
            {isGridView ? <List size={20} /> : <Grid size={20} />}
          </button>
        </div>

        <div className="sm:block">
          {!isGridView ? (
            <div className="">
              <div className="flex gap-6">
                <div className="flex justify-between items-center mt-8 md:px-0 border-gray-300">
                  <div className="text-sm">
                    <div onClick={handlesharedUser} className={`${sharedUser ? 'flex items-center md:gap-x-2 border-b-4 border-blue-600 text-blue-600' : 'flex items-center md:gap-x-2'}`} >
                      <span className="font-semibold cursor-pointer pb-2 mr-2">Shared Users</span>
                      <span className="text-black rounded-lg text-sm mt-1 mb-2 px-2.5 bg-[#EEEEEF]">{sharedFiles?.length}</span>
                    </div>
                    <div className=""></div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-8 md:px-0 border-gray-300">
                  <div className="text-sm">
                    <div  onClick={handlesharedItem} className={`${sharedItem ? 'flex items-center md:gap-x-2 border-b-4 border-blue-600 text-blue-600' : 'flex items-center md:gap-x-2'}`}>
                      <span className="font-semibold cursor-pointer pb-2 mr-2">After life Sharing</span>
                      <span className="text-black rounded-lg text-sm mt-1 mb-2 px-2.5 bg-[#EEEEEF]">{sharedFiles?.length}</span>
                    </div>
                    <div className=""></div>
                  </div>
                </div>
              </div>

              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 py-4">
                    <th className="px-2 py-4 text-slate-500 text-left font-semibold">Shared User</th>
                    <th className="px-2 py-2 text-slate-500 text-left font-semibold">Shared Date</th>
                    <th className="px-2 py-2 text-slate-500 text-left font-semibold">Shared Item</th>
                    <th className="px-2 py-2 text-slate-500 text-left font-semibold">Access</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(groupedFiles).length > 0 ? (
                    Object.keys(groupedFiles).map((username) => {
                      const userFiles = groupedFiles[username];
                      return (
                        <>
                          {["view", "edit"].map((accessType) => {
                            if (userFiles.files[accessType].length > 0) {
                              return (
                                <tr key={`${username}-${accessType}`} className="border-b hover:bg-gray-50">
                                  <td className="px-2 py-3 w-[20%]">
                                    <div className="py-2">
                                      <span className="ml-3 bg-gray-100 rounded-lg py-2 px-2 font-semibold">
                                        {username}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="font-semibold text-slate-500 w-[22%]">28-9-2025</td>
                                  <td className="w-[30%]">
                                    <div className="flex items-center cursor-pointer relative">
                                      <div className="flex">
                                        <ChevronDown
                                          size={24}
                                          className="text-gray-500 mr-5 mt-4 cursor-pointer"
                                          onClick={() => toggleDropdown(username, accessType)} // Updated logic
                                        />
                                        <div>
                                          <p className="font-semibold mb-1">{userFiles.files[accessType][0].file_name}</p>
                                          <p className="text-xs text-blue-500 font-semibold">+{userFiles.files[accessType].length} Items</p>
                                        </div>
                                      </div>
                                    </div>
                                    {expandedItemId === `${username}-${accessType}` && ( // Compare key here
                                      <div
                                        ref={dropdownRef}
                                        className="absolute left-[850px] mt-2 p-4 bg-white border-2 border-gray-200 rounded-2xl w-72"
                                        style={{ zIndex: 10 }}
                                      >
                                        <h1 className="text-xl font-semibold mx-2 my-4">Shared Items</h1>
                                        {userFiles.files[accessType].map((file) => (
                                          <div
                                            key={file._id}
                                            className="py-2 text-sm text-gray-600 cursor-pointer"
                                            onClick={() => fetchFileContent(file.id || file.file_id)}
                                          >
                                            <div className="flex items-center">
                                              <img src={document} alt={file.file_name} className="w-10 h-10" />
                                              <p className="text-lg ml-4 mt-1">{file.file_name}</p>
                                            </div>
                                          </div>
                                        ))}

                                      </div>
                                    )}
                                  </td>
                                  <td className="font-medium text-gray-400 pl-2 w-[22%]">{accessType}</td>
                                </tr>
                              );
                            }
                          })}
                        </>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-slate-400">
                        No files available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sharedFiles.length > 0 ? (
                sharedFiles.map((file) => (
                  <div key={file._id} className="flex flex-col items-center bg-white shadow-md rounded-lg p-4">
                    <div className="text-sm font-semibold text-gray-600">{file.file_name}</div>
                    <div className="text-xs text-gray-500">
                      {file?.from_user?.username || "Unknown User"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center text-gray-500 py-4">No files available</div>
              )}
            </div>
          )}
        </div>
      </div>
      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showOverlay && renderOverlay()}
    </div>
  );
};

export default SharedFiles;
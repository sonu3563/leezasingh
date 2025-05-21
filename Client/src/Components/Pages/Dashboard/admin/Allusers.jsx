import React, { useState, useEffect } from 'react';
import { useAdminContext } from '../../../context/AdminContext';
import { FaTimes,FaEdit } from 'react-icons/fa';
import { Check, X ,Eye, Edit, Trash2,FileClock} from "lucide-react";
import Alert from '../../../utils/Alert';
import { useNavigate } from "react-router-dom";

function Allusers() {
    const { adminData, loading, error, getParticularUser, editUserProfile ,editCompanyProfile ,alert,setAlert} = useAdminContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    // const [editedUser, setEditedUser] = useState({});
    const [userDetails, setUserDetails] = useState(null);
    const [userRole, setUserRole] = useState({});
      const navigate = useNavigate();
//   const [alert, setAlert] = useState(null);
const [role, setRole] = useState(null);
  const [id, Setid] = useState(null);
  const [editedUser, setEditedUser] = useState(userDetails || {});

//   useEffect(() => {
//     const token = localStorage.getItem("user_role");
//     const userId = localStorage.getItem("user_id");
//     setRole(token);
//     Setid(userId);
//   }, []);



  useEffect(() => {
    if (userDetails) {
      setEditedUser(userDetails);
    }
  }, [userDetails]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const navigateToTicketHistory = (id) => {
    navigate(`/Ticket-History/${id}`);
  };

    const showAlert = (variant, title, message) => {
        setAlert({ variant, title, message });
      
        // Automatically remove alert after 5 seconds
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      };


    useEffect(() => {
        if (selectedUser) {
            console.log('Selected User:', selectedUser.userId);
            const fetchUserDetails = async () => {
                const response = await getParticularUser(selectedUser.userId);
                if (response?.success) {
                    setUserDetails(response.user);
                }
            };
            fetchUserDetails();
        }
    }, [selectedUser, getParticularUser]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSearchOption('');
    };

    const filteredUsers = adminData?.filter(user => {
        if (!searchTerm) return true;
    
        const searchTermLower = searchTerm.toLowerCase();
        const option = searchOption || 'name'; // Default to 'name' if not specified
    
        if (option === 'email' && user.email?.toLowerCase()?.includes(searchTermLower)) {
            return true;
        }
    
        if (option === 'name') {
            if (user.role === 'Creator') {
                // For Creator: Check firstName and lastName
                const fullName = `${user.detailedProfile?.firstName ?? ''} ${user.detailedProfile?.lastName ?? ''}`.toLowerCase();
                return fullName.includes(searchTermLower);
            } else {
                // For Company or others: Check detailedProfile.name instead of user.name
                return user.detailedProfile?.name?.toLowerCase()?.includes(searchTermLower);
            }
        }
    
        if (option === 'role' && user.role?.toLowerCase()?.includes(searchTermLower)) {
            return true;
        }
    
        return false;
    });
    
    
    
    

    const handleEdit = (user) => {
        setIsEditing(true);
        setEditedUser({ ...user });
    };


    const handleSave = async () => {
        console.log('Edited User:', selectedUser.userId);
        console.log('Selected User:', selectedUser);
        
        let success = false; 
    
        if (userRole === 'Creator') {
            success = await editUserProfile(selectedUser.userId, editedUser);
        } else if (userRole === 'Company') {
            success = await editCompanyProfile(selectedUser.userId, editedUser);
        }
    
        if (!success) {
            setAlert({ type: 'error', message: 'Failed to update company profile.' });
            setIsEditing(false);
            setSelectedUser(null);
        } else {
            setIsEditing(false);
            setSelectedUser(null);
        }
    };
    



    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditedUser(prev => {
    //         const newState = { ...prev, [name]: value };
    //         console.log(newState); // Log the updated state
    //         return newState;
    //     });
    // };
    

    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsEditing(false);
        setUserDetails(null);
    };

    if (loading) {
        return <div className="text-center text-lg font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 font-semibold">Error: {error}</div>;
    }

    return (
        <div className=" bg-gray-100 min-h-screen">
            <div className="sticky top-0 bg-white shadow-md">
                   <h2 className="text-3xl font-bold text-center py-6">All User</h2>
           
                   <div className="px-6 pb-4">
                 <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                   <div className="relative flex-1">
                     <input
                       type="text"
                       className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                       placeholder={`Search ${searchOption || 'by filter'}`}
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                     />
                     {searchTerm && (
                       <FaTimes
                         onClick={() => setSearchTerm('')}
                         className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                       />
                     )}
                   </div>
           
                   <div className="flex items-center space-x-6">
<select
    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-lg"
    value={searchOption}
    onChange={(e) => setSearchOption(e.target.value)}
>
    <option value="">Filter By</option>
    <option value="email">Email</option>
    <option value="name">Name</option>
    <option value="role">Role</option>
</select>

<button
    onClick={handleClearFilters}
    className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-all duration-300 text-lg"
>
    Clear
</button>
</div>
                 </div>
               </div>
                 </div>

            <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="sticky top-0 bg-gray-100">
            <tr className="text-gray-700">
                <th className="py-3 px-4 text-left">S.no</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            {filteredUsers?.map((user, index) => (
                <tr
                    key={user.userId}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                >
                    <td className="py-3 px-4">{index + 1}</td>
                    {user.role === 'Creator' ? (
    <td className="py-3 px-4">
        {user.detailedProfile
            ? `${user.detailedProfile.firstName ?? ''} ${user.detailedProfile.lastName ?? ''}`.trim()
            : ""}
    </td>
) : (
    <td className="py-3 px-4">
        {user.detailedProfile?.name ?? ""}
    </td>
)}

                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                    <button
                            className="text-yellow-500 hover:bg-blue-100 p-2 rounded-lg transition-all"
                            onClick={() => {
                                // Setid(user.userId);
                                navigateToTicketHistory(user.userId)}}
                        >
                            <FileClock className="w-5 h-5" />
                        </button>
                        <button
                            className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition-all"
                            onClick={() => {
                                setUserRole(user.role);
                                setSelectedUser(user);
                            }}
                        >
                            <Eye className="w-5 h-5" />
                        </button>
                        <button
                            className="text-green-600 hover:bg-green-100 p-2 rounded-lg transition-all"
                            onClick={() => {console.log('Edit', user.userId)
                                setIsEditing(true);
                                setUserRole(user.role);
                                setSelectedUser(user);
                            }}
                        >
                            <Edit className="w-5 h-5" />
                        </button>
                        <button
                            className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition-all"
                            onClick={() => console.log('Delete', user.userId)}
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>


            {/* User Details Modal */}
    

{selectedUser && (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl">
            <div className="bg-gray-50/60 p-6 rounded-2xl border border-gray-200 shadow-inner">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        {/* <img src={userDetails?.avatar || '/default-avatar.png'} alt="User Icon" className="w-8 h-8" /> */}
                        <h2 className="text-xl font-semibold text-gray-700">User Details</h2>
                    </div>
                    <div>
                        {/* {!isEditing ? ( */}
                            <X
                                className="w-7 h-7 text-gray-400 cursor-pointer hover:text-gray-600"
                                onClick={() => {
                                    setIsEditing(false);
                                    setSelectedUser(null);
                                }}
                            />
                        {/* ) : (
                            <X
                                className="w-7 h-7 text-gray-400 cursor-pointer hover:text-gray-600"
                                onClick={() => setIsEditing(false)}
                            />
                        )} */}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {(
    userRole === 'Creator'
      ? [
          { label: 'First Name', key: 'firstName' },
          { label: 'Last Name', key: 'lastName' },
          { label: 'Email', key: 'email', from: 'userDetails' },
          { label: 'Role', key: 'role', from: 'userDetails' },
          { label: 'Portfolio Links', key: 'portfolioLinks', isArray: true },
          { label: 'Skills', key: 'skills', isArray: true },
          { label: 'Hourly Rate', key: 'hourlyRate' },
          { label: 'Location', key: 'location' },
          { label: 'Certifications', key: 'certifications', isArray: true },
          { label: 'Social Links', key: 'socialLinks', isArray: true },
          {
            label: 'Education',
            key: 'education',
            isArray: false,
            formatData: (data) => {
              if (!Array.isArray(data)) return '-';
              return data.map((edu, idx) => (
                <div key={idx} className="mb-2">
                  <div className="font-semibold">{edu.degreeName}</div>
                  <div>{edu.instituteName}</div>
                  <div>{edu.fieldOfStudy}</div>
                  <div>
                    {edu.startDate ? new Date(edu.startDate).getFullYear() : 'N/A'} - 
                    {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                  </div>
                  <div>{edu.location}</div>
                </div>
              ));
            },
          },
          {
            label: 'Experience',
            key: 'experience',
            isArray: false,
            formatData: (data) => {
              if (!Array.isArray(data)) return '-';
              return data.map((exp, idx) => (
                <div key={idx} className="mb-2">
                  <div className="font-semibold">{exp.position}</div>
                  <div>{exp.companyName}</div>
                  <div>
                    {exp.startDate ? new Date(exp.startDate).getFullYear() : 'N/A'} - 
                    {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                  </div>
                  <div>{exp.location}</div>
                </div>
              ));
            },
          },
        ]
      : userRole === 'Company'
      ? [
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
        ]
      : []
  ).map((field, index) => (
    <div key={index} className="flex flex-col">
      <label htmlFor={field.key} className="text-sm text-gray-500 mb-1 font-medium">
        {field.label}
      </label>
      {!isEditing ? (
  <p className="text-gray-800 font-medium leading-snug break-words">
    {field.isArray
      ? (field.from === 'userDetails'
          ? userDetails?.[field.key]?.join(', ')
          : userDetails?.detailedProfile?.[field.key]?.join(', ')
        ) || '-'
      : field.formatData
      ? field.formatData(
          field.from === 'userDetails'
            ? userDetails?.[field.key] || []
            : userDetails?.detailedProfile?.[field.key] || []
        )
      : (field.from === 'userDetails'
          ? userDetails?.[field.key]
          : userDetails?.detailedProfile?.[field.key]
        ) || '-'}
  </p>
) : (

<input
  type="text"
  id={field.key}
  name={field.key}
  value={
    ( (editedUser?.[field.key] ??
        (field.from === 'userDetails'
          ? userDetails?.[field.key]
          : userDetails?.detailedProfile?.[field.key]
        )
      ) || ''
    )
  }
  
  onChange={handleInputChange}
  disabled={
    userRole === 'Company'
      ? !['name', 'supportEmail', 'supportPhoneNumber'].includes(field.key)
      : !['firstName', 'lastName', 'email', 'phoneNumber', 'role'].includes(field.key)
  }
  className="border border-gray-300 rounded-xl px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
  placeholder={`Enter ${field.label}`}
/>

  
)}
    </div>
  ))}
</div>


                {isEditing && (
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handleSave}
                            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md transition"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
)}
    {alert && <Alert {...alert} />}
        </div>
    );
}

export default Allusers;
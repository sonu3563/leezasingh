import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/Apiconfig';
import Alert from '../utils/Alert';
const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [adminData, setAdminData] = useState([]);
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ParticularUser, setParticularuser] = useState([]);
    const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const showAlert = (variant, title, message) => {
    setAlert({ variant, title, message });
  
    // Automatically remove alert after 5 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const fetchAdminData = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/all-user-details`, {
            withCredentials: true,
        });
        console.log("Admin Data:", response);
        if (response.data.success) {
            setAdminData(response.data.users);
            setUsers(response.data.users.filter(user => user.role === 'user'));
            setCompanies(response.data.users.filter(user => user.role === 'company'));
        } else {
            throw new Error('Failed to fetch admin data');
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};
    useEffect(() => {
      

        fetchAdminData();
    }, []);

    const getParticularUser = async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/admin/particular-user/${userId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            setError(error.message);
            return null;
        }
    };

    const editUserProfile = async (userId, userData) => {
        console.log("User Data:", userData);
        console.log("User ID:", userId);
        try {
            const response = await axios.post(`${API_URL}/admin/edit-user-profile/${userId}`, userData, {
                withCredentials: true,
            });
            console.log("Response from backend:", response);
    
            if (response.status === 200) {
                // Success handling
                showAlert('success', 'Updated successfully', 'User profile updated successfully!');
            } else {
                // If the response status is not 200, handle it here
                showAlert('error', 'Update failed', 'Failed to update user profile!');
            }
            fetchAdminData();
            return response.data;
        } catch (error) {
            setError(error.message);
            showAlert('error', 'Error', 'An error occurred while updating the user profile!');
            return null;
        }
    };
    
    const editCompanyProfile = async (companyId, companyData) => {
        try {
            const response = await axios.post(`${API_URL}/admin/edit-company-profile/${companyId}`, companyData, {
                withCredentials: true,
            });
    
            if (response.status === 200) {
                // Success handling
                showAlert('success', 'Updated successfully', 'Company profile updated successfully!');
            } else {
                // If the response status is not 200, handle it here
                showAlert('error', 'Update failed', 'Failed to update company profile!');
            }
            fetchAdminData();
            return response.data;
        } catch (error) {
            setError(error.message);
            showAlert('error', 'Error', 'An error occurred while updating the company profile!');
            return null;
        }
    };
    

    return (
        <AdminContext.Provider value={{ adminData, users, companies, loading, error, getParticularUser, editUserProfile,editCompanyProfile, setAlert,   alert,
            setAlert, }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    return useContext(AdminContext);
};
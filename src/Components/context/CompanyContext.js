import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/Apiconfig';
import Alert from '../utils/Alert';
const CompanyContext = createContext();  //user_id

export const CompanyProvider = ({ children }) => {
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    website: [],
    about: '',
    noOfEmployees: '',
    supportEmail: '',
    supportPhone: '',
    industry: [],
    projects: [],
    clients: [],
    yearEstablished: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const token = localStorage.getItem("userToken");
  const user_id = localStorage.getItem("user_id");


  const showAlert = (variant, title, message) => {
    setAlert({ variant, title, message });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/profile/get-company-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Response from backend:", response.data);
      // ✅ Only set the actual profile
      setCompanyDetails(response.data.profile);
    } catch (error) {
      // console.error('Error fetching profile:', error);
      // setAlert({ type: 'error', message: 'Failed to fetch profile.' });
    } finally {
      setLoading(false);
    }
  };
  

  // Save Company Profile to API (edit or add)
  
  useEffect(() => {
    console.log("Updated companyDetails:", companyDetails);
  }, [companyDetails]);
  


  const saveCompanyProfile = async (companyData) => {
    console.log("Raw companydata:", companyData);
    console.log("Raw token:", token);
  
    // Fix keys to match backend expectations
    const formattedData = {
      ...companyData,
      supportPhone: companyData.supportPhone, // Correct key for phone number
      yearEstablished: companyData.yearEstablished
      ? new Date(companyData.yearEstablished).getFullYear().toString()
      : null,
    
      user_id: user_id, // Add user_id to the request
    };
  
    // Remove invalid key
    delete formattedData.supportPhone;
  
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/profile/edit-company-profile`, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from backend:", response.data);
      setCompanyDetails(response.data);
      fetchCompanyProfile();
      showAlert('success', 'Updated successfully', 'Company profile updated successfully!');
      return true;
    } catch (error) {
      console.error('Error saving profile:', error?.response?.data || error.message);
      showAlert("error", "Failed", "Failed to update company profile.");
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  // Handle changes to form fields
  const handleCompanyChange = (e, key, isArray = false) => {
    const value = e.target.value;
    setCompanyDetails((prev) => ({
      ...prev,
      [key]: isArray ? value.split(',').map((item) => item.trim()) : value,
    }));
  };

  // Load company profile when the provider is mounted
  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        companyDetails,
        loading,
        fetchCompanyProfile,
        alert,
        setAlert,
        setCompanyDetails,
        saveCompanyProfile,
        handleCompanyChange,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

// Custom hook to use the company context
export const useCompany = () => useContext(CompanyContext);

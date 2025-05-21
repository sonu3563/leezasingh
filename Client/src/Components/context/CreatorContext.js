import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/Apiconfig';
import Alert from '../utils/Alert';

const CreatorContext = createContext();

export const CreatorProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = (variant, title, message) => {
    setAlert({ variant, title, message });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/profile/get-profile`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      setProfile(response.data.profile);
      console.log("Response from backend:", response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch profile');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const editProfile = async (updatedData) => {
    console.log('Updated Data:', updatedData);
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/profile/edit-profile`,
        updatedData, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
      setProfile(response.data.profile);
      showAlert('success', 'Profile Updated', 'Your profile was successfully updated.');
    } catch (err) {
      showAlert('error', 'Update Failed', 'Could not update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <CreatorContext.Provider
      value={{
        profile,
        loading,
        error,
        alert,
        refetch: fetchProfile,
        editProfile,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreator = () => useContext(CreatorContext);

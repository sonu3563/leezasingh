import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../utils/Apiconfig';
import axios from 'axios';

// Create context
const RolesContext = createContext();


export const useRoles = () => useContext(RolesContext);

// Provider component
export const RolesProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchsubRoles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/get-roles`);
      setCategory(response.data); 
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchsubRoles();
  }, []);

  return (
    <RolesContext.Provider value={{ category, loading, error }}>
      {children}
    </RolesContext.Provider>
  );
};

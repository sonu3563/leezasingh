import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/Apiconfig';
import Alert from '../utils/Alert';
const TicketContext = createContext();

export const useTicket = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("userToken");
  const [alert, setAlert] = useState(null);
  const showAlert = (variant, title, message) => {
    setAlert({ variant, title, message });
  
    // Automatically remove alert after 5 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };


  const createTicket = async (subject, message) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${API_URL}/ticket/create-ticket`,
        { subject, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || 'Error creating ticket');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/ticket/user-ticket-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTickets(res.data.tickets || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Error fetching tickets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        error,
        createTicket,
        fetchTickets,
        alert,
        setAlert,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

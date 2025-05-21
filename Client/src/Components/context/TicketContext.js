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
  const [currentTicket, setCurrentTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [alert, setAlert] = useState(null);

  const showAlert = (variant, title, message) => {
    setAlert({ variant, title, message });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const createTicket = async (subject, message) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(`${API_URL}/ticket/create-ticket`, { subject, message }, {
        withCredentials: true,
      });
      showAlert('success', 'Ticket Created', 'Your ticket has been created successfully.');
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || 'Error creating ticket');
      showAlert('danger', 'Error', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async (ticketId) => {
    // console.log('Fetching tickets...', ticketId);
    try {
      setLoading(true);
      setError(null);
  
   
      const url = ticketId
        ? `${API_URL}/ticket/ticket-details?${ticketId}`  
        : `${API_URL}/ticket/ticket-details`;             
  
      console.log('Request URL:', url); 
  
      const res = await axios.get(url, {
        withCredentials: true,
      });
  
      console.log('Tickets:', res);
      setTickets(res.data);  
    } catch (err) {
      setError(err?.response?.data?.message || 'Error fetching tickets');
    } finally {
      setLoading(false);
    }
  };
  

  
  
  
  
  
  

  const fetchTicketMessages = async (ticketId) => {
    try {
      setError(null);
      const res = await axios.get(`${API_URL}/ticket/ticket-messages/${ticketId}`, {
        withCredentials: true,
      });
  
      console.log('Ticket Messages:', res);
      setMessages(res.data.messages || []);
      setCurrentTicket(res.data);
    } catch (err) {
      console.error("Error fetching ticket messages: ", err);
      setError(err?.response?.data?.message || 'Error fetching ticket messages');
    }
  };
  
  

  const sendMessage = async (ticketId, message, senderRole) => {
    console.log('Sending ticketId:', ticketId);
    console.log('Sender role:', senderRole);

    try {
      setLoading(true); 
      setError(null);
  
      const res = await axios.post(`${API_URL}/ticket/message/${ticketId}`, { message, senderRole }, {
        withCredentials: true,
      });
  console.log('Message sent:', res);
      fetchTicketMessages(ticketId); 
      return res.data;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Error sending message';
      setError(errorMessage);
      showAlert('danger', 'Error', errorMessage); 
      return null;
    } finally {
      setLoading(false); 
    }
  };
  

  const updateTicketStatus = async (ticketId, status) => {
    console.log('Updating ticket status:', ticketId, status);
    try {
      setLoading(true);
      setError(null);
      const res = await axios.put(`${API_URL}/ticket/ticket-status/${ticketId}`, { status }, {
        withCredentials: true,
      });
    
      showAlert('success', 'Ticket Updated', 'The ticket status has been updated.');
      fetchTickets();
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || 'Error updating ticket status');
      showAlert('danger', 'Error', error);
      return null;
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
        fetchTicketMessages,
        sendMessage,
        updateTicketStatus,
        messages,
        currentTicket,
        alert,
        setAlert,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

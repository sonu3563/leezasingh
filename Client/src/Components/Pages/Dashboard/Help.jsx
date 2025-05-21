import React, { useEffect, useState, useRef } from 'react';
import { useTicket } from '../../context/TicketContext';
import Alert from '../../utils/Alert';
import { useNavigate } from "react-router-dom";

const Help = () => {
  const {
    loading,
    error,
    sendMessage,
    messages,
    fetchTicketMessages,
    currentTicket,
    alert,
    setAlert,
    createTicket
  } = useTicket();

  const [message, setMessage] = useState('');
  const [senderRole, setSenderRole] = useState('user');
  const messagesEndRef = useRef(null);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [localMessages, setLocalMessages] = useState([]);
  const [role, setRole] = useState(null);
  const [id, Setid] = useState(null);
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(true); // ✅ For cleanup

  // 🟢 Clear state when navigating away from the page
  useEffect(() => {
    const handleTabChange = () => {
      console.log("Tab changed, clearing state...");
      setActiveTicket(null);
      setLocalMessages([]);
      setChatBoxOpen(false);
      setTicketSubject('');
      setTicketMessage('');
    };
    window.addEventListener("blur", handleTabChange);

    return () => {
      window.removeEventListener("blur", handleTabChange);
      setIsMounted(false); // ✅ Prevent state updates if unmounted
    };
  }, []);

  // ✅ Only set local messages if component is still mounted
  useEffect(() => {
    if (messages && isMounted) {
      setLocalMessages(messages);
    }
  }, [messages, isMounted]);

  // ✅ Fetch messages only if the ticket is active and mounted
  useEffect(() => {
    if (currentTicket && chatBoxOpen && role === 'admin' && isMounted) {
      console.log("Fetching ticket messages...");
      fetchTicketMessages(currentTicket._id);
    }
  }, [currentTicket, chatBoxOpen, role, isMounted]);

  // ✅ Scroll only if mounted
  useEffect(() => {
    if (isMounted) scrollToBottom();
    const token = localStorage.getItem("user_role");
    const userId = localStorage.getItem("user_id");
    setRole(token);
    Setid(userId);
  }, [localMessages, isMounted]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const navigateToTicketHistory = (id) => {
    navigate(`/Ticket-History`);
  };

  const showAlert = (variant, title, message) => {
    setAlert({ variant, title, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!ticketSubject.trim()) {
      showAlert('warning', 'Warning', 'Please enter a ticket subject.');
      return;
    }
    if (!ticketMessage.trim()) {
      showAlert('warning', 'Warning', 'Please enter a ticket message.');
      return;
    }

    const newTicket = await createTicket(ticketSubject, ticketMessage);
    if (newTicket) {
      setTicketSubject('');
      setTicketMessage('');
      showAlert('success', 'Success', 'Ticket created successfully!');
      setChatBoxOpen(true);
      setActiveTicket(newTicket);
      setLocalMessages([]);
      fetchTicketMessages(newTicket._id);
    } else {
      showAlert('danger', 'Error', 'Failed to create ticket.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
  
    let response = null; // Declare response here once
  
    if (activeTicket) {
      const role = localStorage.getItem("user_role");
  
      if (role === 'admin') {
        response = await sendMessage(activeTicket._id, message, role); // Assign response here
      } else {
        response = await sendMessage(activeTicket._id, message, senderRole); // Assign response here
      }
  
      if (response) {
        setLocalMessages((prevMessages) => [
          ...prevMessages,
          { _id: Date.now().toString(), senderRole, message },
        ]);
        setMessage('');
        scrollToBottom();
      }
    } else {
      showAlert('warning', 'Warning', 'Please select a ticket to send message.');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="absolute top-6 right-6">
        <button
          onClick={() => navigateToTicketHistory(id)}
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300"
        >
          View Ticket History
        </button>
      </div>      
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Live Chat</h2>

          {!chatBoxOpen ? (
            <form onSubmit={handleCreateTicket} className="space-y-3 mb-6">
              <div>
                <label htmlFor="ticketSubject" className="block text-sm font-medium text-gray-700">Ticket Subject:</label>
                <input
                  type="text"
                  id="ticketSubject"
                  placeholder="Enter ticket subject"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="ticketMessage" className="block text-sm font-medium text-gray-700">Ticket Message:</label>
                <textarea
                  id="ticketMessage"
                  placeholder="Enter your initial message"
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Creating Ticket...' : 'Create New Ticket'}
              </button>
            </form>
          ) : (
            <>
              <div className="space-y-4 mb-6 h-96 overflow-y-auto p-2">
                {localMessages.map((msg) => (
                  <div key={msg._id} className={`flex flex-col ${msg.senderRole === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`text-sm ${msg.senderRole === 'user' ? 'text-blue-700' : 'text-green-700'} mb-1`}>
                      {msg.senderRole === 'user' ? 'You' : 'Admin'}
                    </div>
                    <div className={`max-w-xs break-words rounded-lg py-2 px-3 ${msg.senderRole === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {error && <p className="text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                >
                  {loading ? 'Sending.....' : 'Send Message'}
                </button>
              </form>
            </>
          )}

          {alert && <div className="mt-4"><Alert {...alert} /></div>}
        </div>
      </div>
    </div>
  );
};

export default Help;

import React, { useEffect, useMemo, useState ,useRef} from 'react';
import { useTicket } from '../../context/TicketContext';
import { FaTimes } from 'react-icons/fa';
import { Check, X ,Eye, Edit, Trash2, Send,FileClock} from "lucide-react";
import { useParams } from 'react-router-dom';
import Alert from '../../utils/Alert';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const TicketHistory = () => {
  const { tickets, fetchTickets,updateTicketStatus, loading,sendMessage, messages, fetchTicketMessages,alert, setAlert } = useTicket();
  // const [searchTerm, setSearchTerm] = useState('');
  // const [searchOption, setSearchOption] = useState('');
    const messagesEndRef = useRef(null);
    const [activeTicket, setActiveTicket] = useState(null); 
    const [modalOpen, setModalOpen] = useState(false); 
    const [tickectstatus, setTickectstatus] = useState('')
  const [role, setRole] = useState(null); 
  const [localMessages, setLocalMessages] = useState([]); 
  const [message, setMessage] = useState('');
  const [senderRole, setSenderRole] = useState('user');
  const [userId, setUserId] = useState('');
const [userEmail, setUserEmail] = useState('');
const messagesRef = useRef(null);
const [selectedStatus, setSelectedStatus] = useState('');
  const { id } = useParams(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  // const [message, setMessage] = useState('');
  // const messagesRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    console.log("Role from localStorage:", role);
    setRole(role);
  }, [])

  
  useEffect(() => {
    if (id) {
      fetchTickets(id); 
    } else {
      fetchTickets(); 
    }
  }, [id]); 
  
  const handleStatusChange = async (event, ticketId) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
  
    console.log('Updating Ticket ID:', ticketId);
    console.log('New Status:', newStatus);
  
    // Call the API to update the ticket status
    await updateTicketStatus(ticketId, newStatus);
    setSelectedStatus('')
  };


  const handleViewChats = async (ticketId) => {
    setActiveTicket(ticketId);
    setModalOpen(true); 
    fetchTicketMessages(ticketId);
  
    // Find the active ticket from the list of tickets
    const selectedTicket = tickets.find((ticket) => ticket._id === ticketId);
    
    if (selectedTicket) {
      setUserId(selectedTicket.user._id);
      setUserEmail(selectedTicket.user.email);
    }
  };
  

  useEffect(() => {
    if (messages) {
      setLocalMessages(messages);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const showAlert = (variant, title, message) => {
    setAlert({ variant, title, message });
    setTimeout(() => setAlert(null), 3000);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePickerVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
  
    let response = null; // Declare response once here
  
    if (activeTicket) {
      console.log('activeTicket:', activeTicket);
      const role = localStorage.getItem("user_role");
  
      if (role === 'admin') {
        response = await sendMessage(activeTicket, message, role); // Assign response here
      } else {
        response = await sendMessage(activeTicket, message, senderRole); // Assign response here
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
  
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [localMessages]);
  const handleClearFilters = () => {
    setSearchTerm('');
    setSearchOption('');
  };

  const filteredJobs = useMemo(() => {
    const value = searchTerm.toLowerCase();

    return tickets.filter((job) => {
      if (searchOption === 'createdDate' && selectedDate) {
        const jobDate = new Date(job.createdAt).toLocaleDateString();
        const selected = new Date(selectedDate).toLocaleDateString();
        return jobDate === selected;
      }

      if (!searchTerm) return true;

      switch (searchOption) {
        case 'status':
          return job.status?.toLowerCase().includes(value);
        case 'subject':
          return job.subject?.toLowerCase().includes(value);
        case 'email':
          return job.user.email?.toLowerCase().includes(value);
        default:
          return false;
      }
    });
  }, [tickets, searchTerm, searchOption, selectedDate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header Section */}
      <div className="sticky top-0 bg-white  shadow-md">
        <h2 className="text-3xl font-bold text-center py-6">Ticket History</h2>

        <div className="px-6 pb-4">
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 "
            value={searchOption}
            onChange={(e) => {
              setSearchOption(e.target.value);
            }}
          >
            <option value="">Filter By</option>
            <option value="status">Status</option>
            <option value="subject">Subject</option>
            <option value="email">Email</option>
            <option value="createdDate">Created Date</option>
          </select>

          {searchOption === 'createdDate' && (
        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholderText="Select a date"
        portalId="root"
      />
      
       
          )}

          <button
            onClick={handleClearFilters}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all duration-300"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
      </div>

      {/* Scrollable Ticket List */}
      <div className="px-6 pt-4 pb-10 overflow-y-auto h-[calc(100vh-180px)]">
        <div className="w-full mx-auto">
        {loading ? (
  <p className="text-center text-gray-500">Loading tickets...</p>
) : filteredJobs.length === 0 ? (
  <p className="text-center text-gray-500">No tickets found.</p>
) : (
  filteredJobs.map((ticket) => (
    <div key={ticket._id} className="relative bg-white border rounded-xl shadow-md p-6 mb-6 w-full">
      
      {/* Status Badge */}
      <div className="absolute bottom-4 right-4 flex gap-5">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full right-10 ${
            ticket.status === 'Resolved'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {ticket.status === 'Resolved' ? 'Resolved' : 'Open'}
        </span>
        {ticket.status === 'Open' && role=== "admin" && (
          <select
            value={selectedStatus}
            onChange={(e) => {
              handleStatusChange(e, ticket._id); // Pass both event and ticketId
            }}
            className="px-2 py-1 text-xs font-semibold rounded-full border border-gray-300 bg-white"
          >
            <option value="Open">Open</option>
            <option value="Resolved">Resolved</option>
            {/* <option value="Closed">Closed</option> */}
          </select>
        )}

        {/* View Icon */}
         {ticket.status === 'Resolved'?(
        <button
          onClick={() => {
            setTickectstatus(ticket.status);
            handleViewChats(ticket._id);
          }}
          className="text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
        >
          <FileClock className="w-5 h-5" />
        </button>
  ):(
    <button
    onClick={() => {
      setTickectstatus(ticket.status);
      handleViewChats(ticket._id);
    }}
    className="text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
  >
    <Send className="w-5 h-5" />
  </button>
  )}
      </div>

      {/* User Email */}
      <p className="text-sm text-gray-600 mb-1">
        <strong>Email:</strong> {ticket.user.email}
      </p>

      {/* User ID */}
      <p className="text-sm text-gray-600 mb-1">
        <strong>User ID:</strong> {ticket.user._id}
      </p>
      <p className="text-xs text-gray-400 mb-2">
        <strong>Created:</strong> {new Date(ticket.createdAt).toLocaleString()}
      </p>
      {/* Ticket Subject */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{ticket.subject}</h3>
    </div>
  ))
)}


{modalOpen && activeTicket && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
       <div className="bg-white rounded-2xl w-[90%] max-w-[1200px] h-[85vh] p-8 relative shadow-xl overflow-hidden">
         <button
           onClick={() => setModalOpen(false)}
           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
         >
           <FaTimes size={20} />
         </button>

         <div className="mb-6">
           <h2 className="text-2xl font-semibold text-gray-800">Ticket Details</h2>
           <p className="text-sm text-gray-500 mt-1">
             User ID: {userId} | Email: 
             <a href={`mailto:${userEmail}`} className="text-blue-600 hover:underline ml-1">
               {userEmail}
             </a>
           </p>
         </div>

         <div
           ref={messagesRef}
           className="space-y-4 mb-6 h-[55vh] p-4 overflow-y-auto border rounded-lg bg-gray-100"
         >
           {localMessages.map((msg, index) => (
             <div
               key={msg._id}
               className={`flex ${
                 role === 'admin'
                   ? msg.senderRole === 'admin'
                     ? 'justify-end'
                     : 'justify-start'
                   : msg.senderRole === 'user'
                   ? 'justify-end'
                   : 'justify-start'
               }`}
             >
               <div
                 ref={index === localMessages.length - 1 ? lastMessageRef : null} // Reference to the last message
                 className={`p-4 rounded-lg max-w-[75%] shadow-sm ${
                   msg.senderRole === 'user'
                     ? 'bg-blue-100 text-blue-800'
                     : 'bg-green-100 text-green-800'
                 }`}
               >
                 <span className="text-sm font-medium block mb-1">
                   {role === 'admin'
                     ? msg.senderRole === 'user'
                       ? 'User'
                       : 'Admin'
                     : msg.senderRole === 'user'
                     ? 'You'
                     : 'Admin'}
                 </span>
                 <p>{msg.message}</p>
               </div>
             </div>
           ))}
         </div>

         {tickectstatus === 'Open' && (
           <form onSubmit={handleSubmit} className="flex items-center gap-2">
             <textarea
               placeholder="Type your message here..."
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               required
               className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
               rows="2"
             />
             <button
               type="submit"
               disabled={loading}
               className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 shadow-md w-auto min-w-[200px] text-center"
             >
               {loading ? (
                 <span className="flex items-center justify-center">
                   <svg
                     className="animate-spin h-5 w-5 mr-3"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                   >
                     <circle
                       cx="12"
                       cy="12"
                       r="10"
                       strokeWidth="4"
                       stroke="currentColor"
                       fill="none"
                     />
                   </svg>
                   Sending...
                 </span>
               ) : (
                 'Send Message'
               )}
             </button>
           </form>
         )}

         {alert && <p className="text-red-600 mt-3">{alert.message}</p>}
       </div>
     </div>
)}






        </div>
      </div>
      {alert && <Alert {...alert} />}
    </div>
  );
};

export default TicketHistory;

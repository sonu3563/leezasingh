import React, { useEffect, useMemo, useState } from 'react';
import { useTicket } from '../../context/TicketContext';
import { FaTimes } from 'react-icons/fa';

const TicketHistory = () => {
  const { tickets, fetchTickets, loading } = useTicket();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSearchOption('');
  };

  const filteredJobs = useMemo(() => {
    const value = searchTerm.toLowerCase();
    return tickets.filter((job) => {
      if (!searchTerm) return true;
  
      switch (searchOption || 'jobTitle') {
        case 'jobTitle':
          return job.jobTitle?.toLowerCase().includes(value);
        case 'location':
          return job.location?.toLowerCase().includes(value);
        case 'status':
          return job.status?.toLowerCase().includes(value);
        case 'subject':
          return job.subject?.toLowerCase().includes(value);
        case 'message':
          return job.message?.toLowerCase().includes(value);
        case 'subCategories.name':
          return job.subCategories?.some((sub) =>
            sub.name?.toLowerCase().includes(value)
          );
        default:
          return false;
      }
    });
  }, [tickets, searchTerm, searchOption]);
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header Section */}
      <div className="sticky top-0 bg-white z-10 shadow-md">
        <h2 className="text-3xl font-bold text-center py-6">My Ticket History</h2>

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

            <div className="flex flex-col md:flex-row gap-4">
              <select
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchOption}
                onChange={(e) => setSearchOption(e.target.value)}
              >
                <option value="">Filter By</option>
                <option value="status">Status</option>
                <option value="subject">Subject</option>
                <option value="message">Message</option>
              </select>

              <button
                onClick={handleClearFilters}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
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
                <div
                  key={ticket._id}
                  className="relative bg-white border rounded-xl shadow-md p-6 mb-6 w-full"
                >
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        ticket.status === 'resolved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {ticket.status === 'resolved' ? 'Resolved' : 'Open'}
                    </span>
                  </div>
              
                  {/* Ticket Subject */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {ticket.subject}
                  </h3>
              
                  {/* Ticket Message */}
                  <p className="text-gray-600 text-sm mb-3">
                    <strong className="block text-gray-700 mb-1">Message:</strong>
                    {ticket.message}
                  </p>
              
                  {/* Created Time */}
                  <p className="text-xs text-gray-400 mb-2">
                    Created: {new Date(ticket.createdAt).toLocaleString()}
                  </p>
              
                  {/* Replies */}
                  {ticket.messages?.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Replies ({ticket.messages.length})
                      </h4>
                      <ul className="space-y-3">
                        {ticket.messages.map((msg) => (
                          <li
                            key={msg._id}
                            className="bg-gray-50 p-3 rounded-md border text-sm text-gray-700"
                          >
                            <p>{msg.message}</p>
                            <span className="block text-xs text-gray-400 mt-1">
                              {new Date(msg.createdAt).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
              
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketHistory;

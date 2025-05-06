import React, { useEffect, useState } from 'react';
import { useTicket } from '../../context/TicketContext';
import Alert from '../../utils/Alert';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const { loading, error, createTicket, fetchTickets, alert, setAlert } = useTicket();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const showAlert = (variant, title, message) => {
    setAlert({ variant, title, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createTicket(subject, message);
    if (response) {
      showAlert('success', 'Success', 'Ticket created successfully!');
      setSubject('');
      setMessage('');
      fetchTickets();
    }
  };

  return (
    <div className="min-h-screen  items-center   px-4">
      <div className="w-full  bg-white p-8 mt-10 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create a Support Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full px-4 py-3 h-32 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Ticket'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/Ticket-History')}
              className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
            >
              View Ticket History
            </button>
          </div>
        </form>

        {alert && <div className="mt-4"><Alert {...alert} /></div>}
      </div>
    </div>
  );
};

export default Help;

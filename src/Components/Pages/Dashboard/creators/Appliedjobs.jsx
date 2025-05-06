import React, { useState, useEffect } from 'react';
import { useJob } from '../../../context/JobContext';
import { FaTimes } from 'react-icons/fa';

const AppliedJobs = () => {
  const { applications = [], fetchAppliedJobs, loading } = useJob(); // Default to []
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null); // For modal

  useEffect(() => {
    fetchAppliedJobs();
  }, [fetchAppliedJobs]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleClearFilters = () => {
    setSearchTerm('');
    setSearchOption('');
  };

  const handleViewDetails = (app) => {
    setSelectedApplication(app);
  };

  const handleCloseModal = () => setSelectedApplication(null);

  const filteredApplications = applications.filter((app) => {
    if (!searchTerm) return true;
    const job = app.jobDetails;
    const company = app.companyDetails;

    if (searchOption === 'jobTitle') {
      return job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === 'location') {
      return job.location.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === 'status') {
      return app.status.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === 'subCategories.name') {
      return job.subCategories?.some((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return (
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  return (
    <div style={{ padding: '24px' }}>
      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-50 bg-white p-5 rounded-xl shadow-xl mb-4 flex items-center justify-between space-x-6">
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-lg"
            placeholder={`Search ${searchOption || 'by filter'}`}
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <FaTimes
              onClick={() => setSearchTerm('')}
              className="absolute top-3 right-4 text-gray-500 cursor-pointer hover:text-gray-700 transition-all duration-300"
            />
          )}
        </div>

        <div className="flex items-center space-x-6">
          <select
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-lg"
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="">Filter By</option>
            <option value="jobTitle">Job Title</option>
            <option value="location">Location</option>
            <option value="status">Status</option>
            <option value="subCategories.name">Type</option>
          </select>

          <button
            onClick={handleClearFilters}
            className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-all duration-300 text-lg"
          >
            Clear
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 sticky top-[96px] bg-white z-40 p-2 shadow-sm">My Applied Jobs</h2>

      <div
        style={{
          maxHeight: 'calc(100vh - 180px)',
          overflowY: 'auto',
        }}
        className="space-y-4 pr-2"
      >
        {loading ? (
          <p>Loading...</p>
        ) : filteredApplications.length === 0 ? (
          <p className="text-gray-500">No jobs match your search criteria.</p>
        ) : (
          filteredApplications.map((app) => {
            const job = app.jobDetails;
            const company = app.companyDetails;

            let statusStyle = 'bg-yellow-100 text-yellow-800 border-yellow-300';
            if (app.status === 'shortlisted') statusStyle = 'bg-green-100 text-green-800 border-green-300';
            if (app.status === 'rejected') statusStyle = 'bg-red-100 text-red-800 border-red-300';

            return (
                <div
                key={app.applicationId}
                className="border border-gray-200 rounded-lg p-5 flex justify-between items-start shadow hover:shadow-md transition-all"
              >
              
                <div>
                  <h3 className="text-xl font-semibold text-indigo-800">{job.jobTitle}</h3>
                  <p className="text-sm text-gray-700 mt-1"><strong>Company:</strong> {company.name}</p>
                  <p className="text-sm text-gray-700"><strong>Location:</strong> {job.location}</p>
                  <p className="text-sm text-gray-700"><strong>Budget:</strong> {job.budget}</p>
                  <p className="text-sm text-gray-700"><strong>Applied At:</strong> {new Date(app.appliedAt).toLocaleString()}</p>

                 
                </div>

                <div className="text-right">
                <span
  className={`text-sm font-medium px-4 py-2 rounded-full border inline-block ${
    app.status === 'shortlisted'
      ? 'bg-green-100 text-green-800 border-green-300'
      : app.status === 'rejected'
      ? 'bg-red-100 text-red-800 border-red-300'
      : 'bg-yellow-100 text-yellow-800 border-yellow-300'
  }`}
>
  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
</span>

                </div>
                <button
                    onClick={() => handleViewDetails(app)}
                    className="mt-3 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    View Details
                  </button>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {selectedApplication && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {selectedApplication.jobDetails.jobTitle}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {selectedApplication.companyDetails.name} • {selectedApplication.jobDetails.location}
          </p>
        </div>
        <button
          onClick={handleCloseModal}
          className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto p-6 space-y-8 max-h-[65vh]">

        {/* Highlights */}
        <section className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold underline text-gray-800 mb-3">Highlights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div><strong>Budget:</strong> {selectedApplication.jobDetails.budget}</div>
            <div><strong>Deadline:</strong> {new Date(selectedApplication.jobDetails.deadline).toLocaleDateString()}</div>
            <div><strong>Status:</strong> {selectedApplication.jobDetails.status}</div>
          </div>
        </section>

        {/* Job Description */}
        <section>
          <h3 className="text-lg font-semibold underline text-gray-800 mb-2">Job Description</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {selectedApplication.jobDetails.jobDescription}
          </p>
        </section>

        {/* Company Overview */}
        <section>
          <h3 className="text-lg font-semibold underline text-gray-800 mb-2">
            About {selectedApplication.companyDetails.name}
          </h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">{selectedApplication.companyDetails.about}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
            <div>
              <p><strong>Website:</strong> {selectedApplication.companyDetails.website?.join(', ')}</p>
              <p><strong>Email:</strong> {selectedApplication.companyDetails.supportEmail}</p>
            </div>
            <div>
              <p><strong>Employees:</strong> {selectedApplication.companyDetails.noOfEmployees}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-6 border-t">
        <p className="text-sm text-gray-500">
          {/* Optional: add a posted date if available */}
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            Close
          </button>
          {/* Optional action button */}
        </div>
      </div>
    </div>
  </div>
)}







    </div>
  );
};

export default AppliedJobs;

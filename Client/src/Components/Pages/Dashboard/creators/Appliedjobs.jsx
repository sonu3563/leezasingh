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
    <div >
      {/* Sticky Search Bar */}
      <div className="sticky top-0 bg-white  shadow-md">
                        <h2 className="text-3xl font-bold text-center py-6">My Applications</h2>
                
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
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-lg"
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
                            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all duration-300"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                      </div>


      <div
        style={{
          maxHeight: 'calc(100vh - 180px)',
          overflowY: 'auto',
        }}
        className="space-y-4 pr-2 py-4"
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
                className="border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                {/* Left: Job Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.jobTitle}</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      <span className="font-medium text-gray-800">Company:</span>{' '}
                      {job.name}
                    </li>
                    <li>
                      <span className="font-medium text-gray-800">Location:</span>{' '}
                      {job.location}
                    </li>
                    <li>
                      <span className="font-medium text-gray-800">Budget:</span>{' '}
                      {job.budget}
                    </li>
                    <li>
                      <span className="font-medium text-gray-800">Applied At:</span>{' '}
                      {new Date(app.appliedAt).toLocaleString()}
                    </li>
                  </ul>
                </div>

  {/* Right: Status + Button */}
  <div className="flex flex-col justify-between items-start md:items-end gap-4">
    <span
      className={`text-sm font-medium px-4 py-1.5 rounded-full border ${
        app.status === 'shortlisted'
          ? 'bg-green-100 text-green-800 border-green-300'
          : app.status === 'rejected'
          ? 'bg-red-100 text-red-800 border-red-300'
          : 'bg-yellow-100 text-yellow-800 border-yellow-300'
      }`}
    >
      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
    </span>

    <button
      onClick={() => handleViewDetails(app)}
      className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
    >
      View Details
    </button>
  </div>
</div>

            );
          })
        )}
      </div>

      {/* Modal */}
    {selectedApplication && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[100vh] overflow-hidden">
          
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
                  <p><strong>Email:</strong><a className='text-blue-600 underline' href={`mailto:${selectedApplication.companyDetails.supportEmail}`}>{" "} {selectedApplication.companyDetails.supportEmail}</a></p>
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

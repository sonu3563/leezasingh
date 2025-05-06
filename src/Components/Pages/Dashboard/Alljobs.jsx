
import React, { useContext } from 'react';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// import job
import { useJob } from '../../context/JobContext';
import Alert from '../../utils/Alert';
const Alljobs = () => {
  const { jobs, loading, error,applyForJob ,alert,setApplyModalOpen,applyModalOpen ,setCoverLetter ,coverLetter} = useJob();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
//   const [coverLetter, setCoverLetter] = useState('');
// const [applyModalOpen, setApplyModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle clear search filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSearchOption('');
  };

  // Open modal with job details
  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredJobs = jobs.filter((job) => {
    if (!searchTerm) return true;
    if (searchOption === 'jobTitle') {
      return job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchOption === 'location') {
      return job.location.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchOption === 'status') {
      return job.status.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchOption === 'subCategories.name') {
      return job.subCategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return false;
  });


  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
    {/* Search Bar */}
    <div>
  {/* Sticky Search Bar */}
  <div className="sticky top-0 z-50 bg-white p-6 rounded-xl shadow-lg mb-8 flex items-center justify-between space-x-4">
  <div className="flex-1 relative">
      <input
        type="text"
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        placeholder={`Search ${searchOption || 'by filter'}`}
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <FaTimes
          onClick={() => setSearchTerm('')}
          className="absolute top-4 right-4 text-gray-500 cursor-pointer transition-all duration-300"
        />
      )}
    </div>

    <div className="flex items-center space-x-4">
      <select
        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
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
        className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-all duration-300"
      >
        Clear
      </button>
    </div>
  </div>
</div>

    {/* Job Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 max-h-[75vh] overflow-y-auto scrollbar-hide">
    {filteredJobs.map((job) => (
        <div
          key={job._id}
          className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-4"
        >
          {/* Job Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
              {job.company.name?.[0]?.toUpperCase() || 'C'}
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-800">{job.jobTitle}</h3>
              <p className="text-sm text-gray-500">{job.company.name}</p>
            </div>
          </div>

          {/* Job Tags */}
          <div className="mb-3">
            <span className="inline-block text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
              {job.location}
            </span>
          </div>

          {/* Job Details */}
          <ul className="text-sm text-gray-700 space-y-1 mb-4">
            <li>
              <span className="font-medium text-gray-800">Posted Date:</span>{' '}
              {new Date(job.createdAt).toLocaleDateString('en-GB')}
            </li>
            <li>
              <span className="font-medium text-gray-800">Deadline:</span>{' '}
              {new Date(job.deadline).toLocaleDateString('en-GB')}
            </li>
            <li>
              <span className="font-medium text-gray-800">Description:</span>{' '}
              <p className="line-clamp-2 overflow-hidden text-ellipsis">{job.jobDescription}</p>
            </li>
          </ul>

          {/* Job Buttons */}
          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-md"
              onClick={() => {
                setSelectedJobId(job._id);
                openModal(job)}}
            >
              View
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm rounded-md"
              onClick={() => {
                setSelectedJobId(job._id);
                setIsModalOpen("");
                setApplyModalOpen(true);
            
            } }
            >
              Apply
            </button>
          </div>
        </div>
      ))}
    </div>


    {applyModalOpen && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Cover Letter</h3>
        <button
          onClick={() => {setApplyModalOpen(false)
            setCoverLetter("");
          }}
          className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>
      </div>

      {/* Input for Cover Letter */}
      <div className="mt-4">
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Write your cover letter..."
          rows="6"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <button
           onClick={() => {setApplyModalOpen(false)
            setCoverLetter("");
          }}
          className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={()=>applyForJob(selectedJobId,coverLetter)}
          className="ml-3 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Submit Application
        </button>
      </div>
    </div>
  </div>
)}


    {/* Modal for Viewing Job Details */}
    {isModalOpen && selectedJob && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{selectedJob.jobTitle}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {selectedJob.company?.name} • {selectedJob.location}
          </p>
        </div>
        <button
          onClick={closeModal}
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
            <div><strong>Budget:</strong> {selectedJob.budget}</div>
            <div><strong>Deadline:</strong> {new Date(selectedJob.deadline).toLocaleDateString('en-GB')}</div>
            <div><strong>Status:</strong> {selectedJob.status}</div>
            <div><strong>Industry:</strong> {selectedJob.company?.industry?.join(', ')}</div>
            <div><strong>Employees:</strong> {selectedJob.company?.noOfEmployees}</div>
          </div>
        </section>

        {/* Job Description */}
        <section>
          <h3 className="text-lg font-semibold underline text-gray-800 mb-2">Job Description</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {selectedJob.jobDescription}
          </p>
        </section>

        {/* Company Overview */}
        <section>
          <h3 className="text-lg font-semibold underline text-gray-800 mb-2">About {selectedJob.company?.name}</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">{selectedJob.company?.about}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
            <div>
              <p><strong>Website:</strong> {selectedJob.company?.website?.join(', ')}</p>
              <p><strong>Email:</strong> {selectedJob.company?.supportEmail}</p>
              <p><strong>Phone:</strong> {selectedJob.company?.supportPhoneNumber}</p>
            </div>
            <div>
              <p><strong>Established:</strong> {new Date(selectedJob.company?.yearEstablished).getFullYear()}</p>
              <p><strong>Clients:</strong> {selectedJob.company?.clients?.join(', ')}</p>
              <p><strong>Projects:</strong> {selectedJob.company?.projects?.join(', ')}</p>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        {selectedJob.subCategories?.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold underline text-gray-800 mb-2">Roles & Responsibilities</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {selectedJob.subCategories.map((sub) => (
                <li key={sub._id}>
                  <strong>{sub.roleName}</strong> – {sub.name}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-6 border-t">
        <p className="text-sm text-gray-500">
          Posted on {new Date(selectedJob.createdAt).toLocaleDateString()}
        </p>
        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            Close
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => {
                setApplyModalOpen(true);
setIsModalOpen(false);
            }

            } 
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  </div>
)}


{alert && <Alert {...alert} />}


  </div>
  
  );
};

export default Alljobs;

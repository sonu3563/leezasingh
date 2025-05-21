import React, { useState, useEffect,useMemo } from 'react';
import { useRoles } from '../../../context/Rolecontext';
import { useJob } from '../../../context/JobContext';
import { FaTimes } from 'react-icons/fa'; // For the clear icon
import { useNavigate } from 'react-router-dom';
import Alert from '../../../utils/Alert';
const Postjobs = () => {
  const { createJob, getMyCompanyJobs, jobLoading, jobError, jobSuccess,alert, setAlert, myJobs,handleUpdate,handleDelete } = useJob();
  const { category, loading, error } = useRoles(); // Fetch categories/subcategories
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [jobData, setJobData] = useState(null);

  
  const handleUpdateJob = (jobId) => {
    const jobToEdit = filteredJobs.find(job => job._id === jobId);
    setJobData(jobToEdit);  
    setModalOpen(true);  
  };


  const handleCloseModal = () => {
    setModalOpen(false);
    setJobData(null); 
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    console.log('Saving job details:', jobData);
    try {
      await handleUpdate(jobData); 
      handleCloseModal();
    } catch (error) {
      console.error('Error saving job details', error);
    }
  };



  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState(''); 
  const navigate = useNavigate();


  const allSubcategories = category?.flatMap(cat => cat.subCategories) || [];


  useEffect(() => {
    getMyCompanyJobs();
  }, [jobSuccess]); 


  const filteredJobs = useMemo(() => {
    const value = searchTerm.toLowerCase();
  
    return myJobs.filter((job) => {
      if (!searchTerm) return true; 
  
      switch (searchOption || 'jobTitle') {
        case 'jobTitle':
          return job.jobTitle?.toLowerCase().includes(value);
        case 'location':
          return job.location?.toLowerCase().includes(value);
        case 'status':
          return job.status?.toLowerCase().includes(value);
        case 'subCategories.name':
          return job.subCategories?.some((sub) =>
            sub.name?.toLowerCase().includes(value)
          );
        default:
          return job.jobTitle?.toLowerCase().includes(value);
      }
    });
  }, [myJobs, searchTerm, searchOption]);
  

  
  const handleSubmit = () => {
    const jobData = {
      jobTitle,
      jobDescription,
      category: [selectedSubCategory._id],
      budget,
      location,
      deadline,
    };
    createJob(jobData);
    setIsModalVisible(false);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSearchOption('');
   
  };

  return (
    <div className="container mx-auto p-8 max-w-screen-xl">
<div className="sticky top-0 bg-white shadow-md w-full">
  <div className="container mx-auto p-6 flex flex-col md:flex-row justify-between items-center md:space-x-8 space-y-4 md:space-y-0">
    <h1 className="text-4xl font-bold text-gray-900">Post a Job</h1>

    <button
      onClick={() => setIsModalVisible(true)}
      className="bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-700 transition-all duration-300"
    >
      Create New Job Post
    </button>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 space-y-4 md:space-y-0 w-full">
    {/* Search Input */}
    <div className="flex-1 relative w-full">
      <input
        type="text"
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        placeholder={`Search ${searchOption || 'by filter'}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <FaTimes
          onClick={() => setSearchTerm('')}
          className="absolute top-4 right-4 text-gray-500 cursor-pointer transition-all duration-300"
        />
      )}
    </div>

    {/* Filter Section */}
    <div className="flex flex-col md:flex-row items-stretch md:items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
      <select
        className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 w-full md:w-auto"
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
        className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-all duration-300 w-full md:w-auto"
      >
        Clear
      </button>
    </div>
  </div>
</div>




   
{isModalVisible && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-8 rounded-lg w-full max-w-xl shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Create Job</h2>

      {!selectedSubCategory ? (
        <>
          <label className="text-lg font-semibold mb-4 block">Select Role</label>
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center mt-2">{error}</p>
          ) : (
            <div className="space-y-4">
              {allSubcategories.map((subCat) => (
                <button
                  key={subCat._id}
                  onClick={() => setSelectedSubCategory(subCat)}
                  className="block w-full p-4 bg-gray-100 rounded-lg hover:bg-indigo-50 text-left transition-all focus:outline-none"
                >
                  {subCat.name}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <p className="mb-4 text-lg text-gray-600">
            Selected Role: <span className="font-semibold text-indigo-600">{selectedSubCategory.name}</span>
          </p>

          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 h-36 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Budget (e.g., 2000 USD)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          {jobLoading ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg w-full mt-6 hover:bg-indigo-700 transition-all"
            >
              Post Job
            </button>
          )}
        </>
      )}

      <button
        onClick={() => {
          setIsModalVisible(false);
          setSelectedSubCategory(null);
        }}
        className="bg-gray-400 text-white py-3 px-6 rounded-lg w-full mt-6 hover:bg-gray-500 transition-all"
      >
        Cancel
      </button>
    </div>
  </div>
)}


      {/* Success/Error messages */}
      {jobError && <p className="text-red-500 mt-4">{jobError}</p>}
      {jobSuccess && <p className="text-green-600 mt-4">{jobSuccess}</p>}

      {/* Display Jobs */}
      <div className="max-h-screen overflow-y-auto px-4 scrollbar-hide">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 ">
    {filteredJobs.map((job) => (
      <div
        key={job._id}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-6"
      >
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
          {job.companyName?.[0]?.toUpperCase() || 'C'}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{job.jobTitle}</h3>
          <p className="text-sm text-gray-500">{job.companyName}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-3">
        <span className="inline-block text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
          {job.location}
        </span>
      </div>

      {/* Details */}
      <ul className="text-sm text-gray-700 space-y-1 mb-5">
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
  <p className="line-clamp-3 overflow-hidden text-ellipsis">{job.jobDescription}</p>
</li>

        <li>
          <span className="font-medium text-gray-800">Status:</span>{' '}
          {job.status}
        </li>
        <li>
          <span className="font-medium text-gray-800">Budget:</span>{' '}
          {job.budget}
        </li>
      </ul>

      {/* Categories */}
      {job.subCategories?.length > 0 && (
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-1">Categories:</p>
          <div className="flex flex-wrap gap-2">
            {job.subCategories.map((sub) => (
              <span
                key={sub._id}
                className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap justify-between gap-2">
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 text-sm rounded-md"
                      onClick={() => navigate(`/company/manage-job/${job._id}`)}
>
          Manage
        </button>
        <button
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-md"
          onClick={() => handleUpdateJob(job._id)}
        >
          Edit
        </button>
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-md"
          onClick={() => handleDelete(job._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
</div>



      {/* Modal for Editing Job */}
      {modalOpen && jobData && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-2xl max-w-4xl w-full shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center">Edit Job Details</h3>

      {/* Job Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={jobData.jobTitle}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Job Description</label>
        <textarea
          name="jobDescription"
          value={jobData.jobDescription}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          rows="6"
        />
      </div>

      {/* Budget */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Budget</label>
        <input
          type="text"
          name="budget"
          value={jobData.budget}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* Deadline */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={new Date(jobData.deadline).toISOString().split('T')[0]}
          onChange={handleInputChange}
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}


{alert && <Alert {...alert} />}

    </div>
  );
};

export default Postjobs;

// context/JobContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/Apiconfig';
import Alert from '../utils/Alert';
const JobContext = createContext();
const token = localStorage.getItem("userToken");

export const JobProvider = ({ children }) => {
  const [jobLoading, setJobLoading] = useState(false);
  const [jobError, setJobError] = useState(null);
  const [jobSuccess, setJobSuccess] = useState(null);
  const [myJobs, setMyJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [jobdata, setJobdata] = useState([]);
  const [alert, setAlert] = useState(null);
  const [jobs, setJobs] = useState([]); 
  const [specificjobs, setSpecificJobs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
const [applyModalOpen, setApplyModalOpen] = useState(false);
const [applications, setApplications] = useState([]);
  const showAlert = (variant, title, message) => {
    setAlert({ variant, title, message });
  
    // Automatically remove alert after 5 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/apply/user-all-applied`,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',  // Add this header

          },
        });
        console.log("response",response);
        setApplications(response.data.applications);

      } catch (error) {
        console.error('Failed to fetch applied jobs:', error);
      } finally {
        setLoading(false);
      }
    };

  //   fetchAppliedJobs();
  // }, []);


  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs/get-all-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.jobs || [];
    } catch (err) {
      throw new Error('Error fetching jobs');
    }
  };


  // Use the fetchJobs function inside useEffect
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadJobs();
  }, []);







  const fetchJspecificobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs/user-matching-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.jobs || [];
    } catch (err) {
      throw new Error('Error fetching jobs');
    }
  };


  // Use the fetchJobs function inside useEffect
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchJspecificobs();
        setSpecificJobs(fetchedJobs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadJobs();
  }, []);





  const createJob = async (jobData) => {
    setJobLoading(true);
    setJobError(null);
    setJobSuccess(null);

    try {
      const response = await axios.post(`${API_URL}/jobs/add-job`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showAlert('success', 'Job Created ', 'The job was Created successfully.');
      getMyCompanyJobs();
    //   setJobSuccess(response.data.message);
      return response.data.job;
    } catch (error) {
        showAlert('error', 'Failed ', error.response?.data?.message || 'Failed to create job');

      setJobError(error.response?.data?.message || 'Failed to create job');
      return null;
    } finally {
      setJobLoading(false);
    }
  };

  const applyForJob = async (selectedJob,coverLetter) => {
    console.log("selectedJob", selectedJob);
    console.log("coverLetter", coverLetter);  
    if (!coverLetter.trim()) {
      showAlert('warning', 'Missing field ', 'Please provide a cover letter');

      // alert('Please provide a cover letter');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/apply/apply-job`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',  // Add this header

        },
        body: JSON.stringify({
          job_id: selectedJob, 
          coverLetter: coverLetter,
        }),
      });
  
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        showAlert('success', ' Successfully', 'Application submitted successfully');

        // alert('Application submitted successfully');
        setApplyModalOpen(false);
        fetchJobs();
        setCoverLetter('');
      } else {
        // alert('Error applying for job: ' + data.message);
        showAlert('error', ' Failed', data.message);

      }
    } catch (error) {
      console.error('Error applying for job:', error);
      showAlert('error', ' Failed', error);

      // alert('Something went wrong. Please try again.');
    }
  };
  



  const getMyCompanyJobs = async () => {
    setJobLoading(true);
    try {
      const response = await axios.get(`${API_URL}/jobs/my-company-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response.data.jobs", response.data.jobs);
      setMyJobs(response.data.jobs || []);
    } catch (error) {
      setJobError(error.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setJobLoading(false);
    }
  };


  const handleDelete = async (jobId) => {
    console.log("jobId", jobId);
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.delete(`${API_URL}/jobs/delete-company-job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getMyCompanyJobs();
      // After successful deletion, show alert and remove from UI
      showAlert('success', 'Job deleted', 'The job was deleted successfully.');
      // You may also remove the job from your state here
    } catch (error) {
        showAlert("error", "Failed", "Failed to update company profile.");
    }
  };

  const handleUpdate = async (updatedJobData) => {
    // Extract jobId from updatedJobData
    const jobId = updatedJobData._id;
    console.log("Extracted jobId", jobId);
    console.log("updatedJobData", updatedJobData);

    // Ensure jobId is a string and not an object
    if (typeof jobId !== 'string') {
        console.error('Invalid jobId, it must be a string');
        return;
    }

    // Ensure category is an array, if not, convert it to an empty array
    if (!Array.isArray(updatedJobData.category)) {
        updatedJobData.category = [];
    }

    const token = localStorage.getItem('userToken');
    
    try {
        const response = await axios.put(
            `${API_URL}/jobs/edit-company-job/${jobId}`, // jobId extracted from updatedJobData
            updatedJobData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        showAlert('success', 'Updated successfully', 'Company profile updated successfully!');
        getMyCompanyJobs();
    } catch (error) {
        console.error(error);
        showAlert('error', 'Failed to update job', 'Error updating the job.');
    }
};


const getApplicants = async (jobId) => {
    console.log("jobId", jobId);
    setJobLoading(true);
    try {
      const response = await axios.get(`${API_URL}/apply/company-job-applications/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jobDetails = response.data.jobDetails || {};
      const applications = response.data.applications || [];
  
      setJobdata(jobDetails);
      setApplicants(applications);
  
      // ✅ Return the data
      return { jobDetails, applications };
    } catch (error) {
      setJobError(error.response?.data?.message || 'Failed to fetch jobs');
      return null;
    } finally {
      setJobLoading(false);
    }
  };
  
  const changeApplicationStatus = async (applicationId, newStatus,jobId) => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.put(
        `${API_URL}/apply/change-applications-status/${applicationId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      showAlert('success', 'Updated successfully', 'Company profile updated successfully!');
      console.log("response", jobId);
      showAlert('success', 'Status Updated', `Status changed to ${newStatus}`);
    //   return response.data;
    await getApplicants(jobId);
    } catch (error) {
      console.error('Error updating status:', error);
      showAlert('error', 'Failed', 'Could not update applicant status');
      return null;
    }
  };


  return (
    <JobContext.Provider value={{
      createJob,
      getMyCompanyJobs,
      jobLoading,
      jobError,
      jobSuccess,
      handleUpdate,
      handleDelete,
      myJobs,
      jobs,
      loading,
      error,
      getApplicants,
      jobdata,
      applicants,
      alert,
      setAlert,
      applyForJob,
      changeApplicationStatus,
      setApplyModalOpen,
      applyModalOpen,
      coverLetter,
      setCoverLetter,
      fetchAppliedJobs,
      setApplications,
      applications,
      setSpecificJobs,
      specificjobs,
      fetchJspecificobs
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);

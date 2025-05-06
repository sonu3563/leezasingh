import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from '../../../utils/Alert';
import { useJob } from '../../../context/JobContext';

const ManageJob = () => {
  const { jobId } = useParams();
  const { alert, setAlert, applicants, getApplicants ,changeApplicationStatus } = useJob();
  const [job, setJob] = useState(null);
  const [applicantList, setApplicantList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const openUserModal = (user) => setSelectedUser(user);
  const closeModal = () => setSelectedUser(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getApplicants(jobId);
      if (data) {
        console.log("data", data);
        setJob(data.jobDetails);
        setApplicantList(data.applications);
      }
    };

    fetchData();
  }, [jobId]);



  useEffect(() => {

console.log("applicants", applicantList);
console.log("job", job);

  }, []);

  const handleStatusChange = async (index, newStatus) => {
    const applicationId = applicantList[index].applicationId;
  
    const success = await changeApplicationStatus(applicationId, newStatus,jobId);
    const data =  await getApplicants(jobId);
   if (data) {
    console.log("data", data);
    setJob(data.jobDetails);
    setApplicantList(data.applications);
  }
    if (success) {
      const updatedList = [...applicantList];
      updatedList[index].status = newStatus;
      setApplicantList(updatedList);
    }
  };

  if (!job) return <div className="p-6">Loading job details...</div>;

  return (
<div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
  {alert && <Alert type={alert.type} message={alert.message} />}

  {/* Job Details */}
  <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">{job.jobTitle}</h2>
    <p className="text-gray-700 mb-6">{job.jobDescription}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Budget:</strong> {job.budget}</p>
      <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {job.status}</p>
    </div>
  </section>

  {/* Applicants */}
  <section>
    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Applicants</h3>
    {applicantList.length === 0 ? (
      <p className="text-gray-600 italic">No applicants found.</p>
    ) : (
      applicantList.map((app, index) => {
        const user = app.userDetails;
        return (
          <div key={app.applicationId} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <button
                className="text-lg font-semibold text-blue-600 hover:underline"
                onClick={() => openUserModal(user)}
              >
                {user.firstName} {user.lastName} (@{user.username})
              </button>
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className="border rounded px-4 py-2 text-gray-700"
              >
                <option value="applied">pending</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <p className="text-gray-700 text-sm"><strong>Cover Letter:</strong> {app.coverLetter}</p>
          </div>
        );
      })
    )}
  </section>

  {/* User Detail Modal */}
  {selectedUser && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-lg relative">
        <button className="absolute top-2 right-4 text-gray-600 text-lg" onClick={closeModal}>✕</button>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {selectedUser.firstName} {selectedUser.lastName} (@{selectedUser.username})
        </h2>
        <p className="text-gray-700 mb-4"><strong>Location:</strong> {selectedUser.location}</p>
        <p className="text-gray-700 mb-4"><strong>Availability:</strong> {selectedUser.availability}</p>
        <p className="text-gray-700 mb-4"><strong>Hourly Rate:</strong> {selectedUser.hourlyRate}</p>

        <div className="mb-4">
          <strong>Skills:</strong>
          <p className="text-gray-600">{selectedUser.skills.join(', ')}</p>
        </div>

        <div className="mb-4">
          <strong>Experience:</strong>
          <ul className="list-disc list-inside text-gray-600">
            {selectedUser.experience.map((exp, i) => (
              <li key={i}>
                {exp.position} at {exp.companyName} ({new Date(exp.startDate).getFullYear()} - {new Date(exp.endDate).getFullYear()})
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <strong>Education:</strong>
          <ul className="list-disc list-inside text-gray-600">
            {selectedUser.education.map((edu, i) => (
              <li key={i}>
                {edu.degreeName} in {edu.fieldOfStudy} at {edu.instituteName} ({edu.location})
                ({new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()})
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <strong>Portfolio Links:</strong>
          <ul className="list-disc list-inside text-blue-600">
            {selectedUser.portfolioLinks.map((link, i) => (
              <li key={i}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="underline">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )}

  {alert && <Alert {...alert} />}
</div>


  
  );
};

export default ManageJob;

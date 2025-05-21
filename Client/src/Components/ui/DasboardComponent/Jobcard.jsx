import React from 'react';

const JobCard = ({
  job,
  role,
  onView,
  onApply
}) => {
  return (
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
      <div className="mb-3 flex justify-between">
        <span className="inline-block text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
          {job.location}
        </span>
        <p className="text-sm text-gray-500">{job.status}</p>
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
          <span className="font-medium text-gray-800">Status:</span>{' '}
          <span className="text-gray-500">{job.status}</span>
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
          onClick={() => onView(job._id)}
        >
          View
        </button>
        {role === 'Admin' && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm rounded-md"
            onClick={() => onApply(job._id)}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;

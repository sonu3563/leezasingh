import React, { useState, useEffect } from 'react';
import { useCreator } from '../../../context/CreatorContext';
import defaultProfilePic from '../../../assest/profile/defaulttwo.jpeg';
import editicon from "../../../assest/profile/edit-icon.png";
import Alert from '../../../utils/Alert';
import avatar from "../../../assest/profile/avatar.png";
import profileicon from "../../../assest/profile/profile-icon.png";
import { Check, X } from "lucide-react";
import defaultprofile from '../../../assest/profile/defaulttwo.jpeg'


const CreatorProfile = () => {
  const { profile, loading, error, alert, editProfile } = useCreator();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  useEffect(() => {
    if (profile) {
      setEditedProfile(profile); // Set profile to state when it loads
    }
  }, [profile]);

  const handleChange = (e, key) => {
    setEditedProfile({
      ...editedProfile,
      [key]: e.target.value,
    });
  };

  const handleSave = () => {
    editProfile(editedProfile); // Save updated profile
    setIsEditMode(false);
  };

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-full mx-auto px-4 ">
    <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-200 max-w-full mx-auto space-y-10">
      {/* Profile Header */}
      <div className="flex items-center gap-6 cursor-pointer bg-gray-50/60 p-4 rounded-2xl border border-gray-200 shadow-inner">
        <div className="relative group w-24 h-24">
          <img
            src={profile?.profilePic || defaultprofile}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-md cursor-pointer"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <label className="cursor-pointer w-10 h-10 relative">
              <img src={editicon} alt="Edit" className="w-full h-full object-cover" />
              <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </label>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">{profile?.name}</h1>
          <p className="text-gray-500 text-sm">{profile?.socialLinks?.[0]}</p>
        </div>
      </div>
  
      {/* Profile Info Section */}
      <div className="bg-gray-50/60 p-6 rounded-2xl border border-gray-200 shadow-inner">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img src={avatar} alt="Company Icon" className="w-8 h-8" />
            <h2 className="text-xl font-semibold text-gray-700">Creator Details</h2>
          </div>
          <div>
            {!isEditMode ? (
              <img
                src={profileicon}
                alt="Edit Profile"
                className="w-7 h-7 cursor-pointer hover:scale-105 transition"
                onClick={toggleEditMode}
              />
            ) : (
              <X
                className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => {
                  setIsEditMode(false);
                }}
              />
            )}
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'First Name', key: 'firstName' },
            { label: 'Last Name', key: 'lastName' },
            { label: 'email', key: 'email' },
            { label: 'Name', key: 'username' },
            { label: 'Portfolio Links', key: 'portfolioLinks', isArray: true },
            { label: 'Skills', key: 'skills', isArray: true },
            { label: 'Hourly-Rate', key: 'hourlyRate' },
            { label: 'Location', key: 'location' },
            { label: 'Certifications', key: 'certifications', isArray: true },
            { label: 'Social Links', key: 'socialLinks', isArray: true },
            {
              label: 'Education',
              key: 'education',
              isArray: false,
              formatData: (data) => {
                if (!Array.isArray(data)) return '-';
                return data.map((edu, idx) => (
                  <div key={idx} className="mb-2 ">
                    <div className="font-semibold">{edu.degreeName}</div>
                    <div>{edu.instituteName}</div>
                    <div>{edu.fieldOfStudy}</div>
                    <div>{new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}</div>
                    <div>{edu.location}</div>
                  </div>
                ));
              },
            },
            {
              label: 'Experience',
              key: 'experience',
              isArray: false,
              formatData: (data) => {
                if (!Array.isArray(data)) return '-';
                return data.map((exp, idx) => (
                  <div key={idx} className="mb-2">
                    <div className="font-semibold">{exp.jobTitle}</div>
                    <div>{exp.companyName}</div>
                    <div>{new Date(exp.startDate).getFullYear()} - {new Date(exp.endDate).getFullYear()}</div>
                    <div>{exp.location}</div>
                  </div>
                ));
              },
            },
          ].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={field.key} className="text-sm text-gray-500 mb-1 font-medium">
                {field.label}
              </label>
              {!isEditMode ? (
                <p className="text-gray-800 font-medium leading-snug break-words">
                  {field.isArray
                    ? (editedProfile?.[field.key]?.length ? editedProfile[field.key].join(', ') : '-') || '-'
                    : field.formatData
                    ? field.formatData(editedProfile?.[field.key] || [])
                    : editedProfile?.[field.key] || '-'}
                </p>
              ) : 
              
             field.isArray ? (
              // Existing array-of-strings editing
              <div>
                {(editedProfile?.[field.key] || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updatedArray = [...editedProfile[field.key]];
                        updatedArray[idx] = e.target.value;
                        setEditedProfile({ ...editedProfile, [field.key]: updatedArray });
                      }}
                      className="border border-gray-300 rounded-xl px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        const newArray = [...editedProfile[field.key]];
                        newArray.splice(idx, 1);
                        setEditedProfile({ ...editedProfile, [field.key]: newArray });
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setEditedProfile({
                      ...editedProfile,
                      [field.key]: [...(editedProfile[field.key] || []), ''],
                    });
                  }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  + Add {field.label}
                </button>
              </div>
                     ) : field.key === 'experience' || field.key === 'education' ? (
                      <div>
                        {(editedProfile?.[field.key] || []).map((item, idx) => (
                          <div key={idx} className="border p-3 rounded-xl mb-3 space-y-2">
                            {Object.keys(item).map((prop) => {
                              if (['_id'].includes(prop)) return null; // 🚫 Skip unwanted fields
      
                              const isDateField = prop === 'startDate' || prop === 'endDate';
                              const value = item[prop]
                                ? isDateField
                                  ? new Date(item[prop]).toISOString().substring(0, 10)
                                  : item[prop]
                                : '';
      
                              return (
                                <input
                                  key={prop}
                                  type={isDateField ? 'date' : 'text'}
                                  placeholder={prop}
                                  value={value}
                                  onChange={(e) => {
                                    const updatedList = [...editedProfile[field.key]];
                                    updatedList[idx] = {
                                      ...updatedList[idx],
                                      [prop]: e.target.value,
                                    };
                                    setEditedProfile({ ...editedProfile, [field.key]: updatedList });
                                  }}
                                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                              );
                            })}
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => {
                                const newList = [...editedProfile[field.key]];
                                newList.splice(idx, 1);
                                setEditedProfile({ ...editedProfile, [field.key]: newList });
                              }}
                            >
                              &times; Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const emptyObj =
                              field.key === 'experience'
                                ? {
                                    companyName: '',
                                    jobTitle: '',
                                    startDate: '',
                                    endDate: '',
                                    location: '',
                                  }
                                : {
                                    instituteName: '',
                                    degreeName: '',
                                    fieldOfStudy: '',
                                    startDate: '',
                                    endDate: '',
                                    location: '',
                                  };
                            setEditedProfile({
                              ...editedProfile,
                              [field.key]: [...(editedProfile[field.key] || []), emptyObj],
                            });
                          }}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          + Add {field.label}
                        </button>
                      </div>
      
            ) : (
              // Default input for simple fields
              <input
                type="text"
                value={editedProfile?.[field.key] || ''}
                onChange={(e) => handleChange(e, field.key)}
                className="border border-gray-300 rounded-xl px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              )}
            </div>
          ))}
        </div>
  
        {isEditMode && (
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
  
      {alert && <Alert {...alert} />}
    </div>
  </div>
  
  
  );
};

export default CreatorProfile;

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';

function statusBadge(status) {
  const map = {
    Applied: 'bg-yellow-600 text-yellow-100',
    Interviewing: 'bg-blue-600 text-blue-100',
    Offer: 'bg-green-600 text-green-100',
    Rejected: 'bg-red-600 text-red-100'
  };
  return map[status] || 'bg-gray-600 text-gray-100';
}

export default function JobDetails() {
  const { id } = useParams();
  const { jobs, deleteJob } = useJobs();
  const job = jobs.find(j => j.id === id);
  const navigate = useNavigate();

  if (!job) {
    return (
      <main className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="bg-gray-800 p-10 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-100">Job not found</h2>
            <Link
              to="/"
              className="text-indigo-400 hover:text-indigo-300 mt-4 inline-block text-sm font-medium transition-colors duration-200"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  function handleDelete() {
    if (confirm('Delete this job?')) {
      deleteJob(id);
      navigate('/');
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-100">{job.title}</h1>
              <p className="text-sm text-gray-400">{job.company}</p>
            </div>
            <div className="text-right">
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(job.status)}`}
              >
                {job.status}
              </div>
              <div className="text-xs text-gray-500 mt-2">{job.appliedDate || '-'}</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg text-gray-100">Notes</h3>
            <p className="text-gray-300 mt-2">{job.notes || 'No notes provided.'}</p>
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              to={`/edit/${job.id}`}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
            >
              Delete
            </button>
            <Link
              to="/"
              className="px-6 py-3 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
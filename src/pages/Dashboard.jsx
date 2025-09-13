import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

export default function Dashboard() {
  const { jobs } = useJobs();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <Link
            to="/add"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-base font-medium"
          >
            Add Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-gray-800 p-12 rounded-lg shadow-lg text-center flex-grow flex items-center justify-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-100">No applications yet</h3>
              <p className="text-gray-400 mt-3 text-lg">Click “Add Job” to create your first entry.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs.map(job => (
              <article
                key={job.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-gray-100">{job.title}</h3>
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

                <p className="text-sm text-gray-300 mt-4 line-clamp-3">
                  {job.notes ? job.notes : 'No notes'}
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => navigate(`/job/${job.id}`)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
                  >
                    View
                  </button>
                  <Link
                    to={`/edit/${job.id}`}
                    className="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
import React, { useState, useEffect } from 'react';
import { useJobs } from '../context/JobsContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEditJob() {
  const { jobs, addJob, updateJob } = useJobs();
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);

  const [form, setForm] = useState({
    company: '',
    title: '',
    status: 'Applied',
    appliedDate: '',
    notes: ''
  });

  useEffect(() => {
    if (editing) {
      const job = jobs.find(j => j.id === id);
      if (job) setForm({ company: job.company, title: job.title, status: job.status, appliedDate: job.appliedDate, notes: job.notes || '' });
    }
  }, [editing, id, jobs]);

  function handle(e) { 
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); 
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.company || !form.title) {
      alert('Please enter company and job title.');
      return;
    }
    if (editing) {
      updateJob({ ...form, id });
    } else {
      addJob(form);
    }
    navigate('/');
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          {editing ? 'Edit Job' : 'Add Job'}
        </h1>
        <form onSubmit={onSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Company</label>
            <input
              name="company"
              value={form.company}
              onChange={handle}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Job Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handle}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handle}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Applied Date</label>
            <input
              type="date"
              name="appliedDate"
              value={form.appliedDate}
              onChange={handle}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handle}
              rows="5"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
            >
              {editing ? 'Update' : 'Add Job'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
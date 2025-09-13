import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddEditJob from './pages/AddEditJob';
import JobDetails from './pages/JobDetails';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddEditJob />} />
        <Route path="/edit/:id" element={<AddEditJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

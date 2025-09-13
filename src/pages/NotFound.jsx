import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold">404 — Not found</h2>
        <p className="text-gray-600 mt-2">Sorry, we couldn't find that page.</p>
        <Link to="/" className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Go home</Link>
      </div>
    </main>
  );
}

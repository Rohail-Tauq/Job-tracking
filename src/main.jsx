import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { JobsProvider } from './context/JobsContext';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <JobsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JobsProvider>
  </React.StrictMode>
);

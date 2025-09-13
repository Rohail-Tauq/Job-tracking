import React, { createContext, useContext, useEffect, useReducer } from "react";

const JobsContext = createContext();
const ACTIONS = { INIT: "init", ADD: "add", UPDATE: "update", DELETE: "delete" };

function jobsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT:
      return action.payload || [];
    case ACTIONS.ADD:
      return [action.payload, ...state];
    case ACTIONS.UPDATE:
      return state.map((j) => (j.id === action.payload.id ? action.payload : j));
    case ACTIONS.DELETE:
      return state.filter((j) => j.id !== action.payload);
    default:
      return state;
  }
}

function uid() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  );
}

export function JobsProvider({ children }) {
  const [jobs, dispatch] = useReducer(jobsReducer, []);

  useEffect(() => {
    const raw = localStorage.getItem("job-tracker-jobs");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        dispatch({ type: ACTIONS.INIT, payload: parsed });
      } catch (e) {
        console.error("Error parsing jobs from localStorage:", e);
      }
    }
  }, []);

 
  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem("job-tracker-jobs", JSON.stringify(jobs));
    } else {
      localStorage.removeItem("job-tracker-jobs");
    }
  }, [jobs]);

  const addJob = (job) => {
    const payload = {
      ...job,
      id: job.id || uid(),
      createdAt: job.createdAt || Date.now(),
    };
    dispatch({ type: ACTIONS.ADD, payload });
    return payload.id;
  };

  const updateJob = (job) => dispatch({ type: ACTIONS.UPDATE, payload: job });
  const deleteJob = (id) =>
    dispatch({ type: ACTIONS.DELETE, payload: id });

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  return useContext(JobsContext);
}

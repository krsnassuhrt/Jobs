import * as React from "react";
import type { Job } from "./jobsSlice";

interface JobListProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onEdit, onDelete }) => {
  if (jobs.length === 0) return <p>No jobs available.</p>;

  return (
    <ul>
      {jobs.map(job => (
        <li key={job.id}>
          <h3>{job.title} @ {job.company}</h3>
          <p>{job.location}</p>
          <p>{job.description}</p>
          <button onClick={() => onEdit(job)}>Edit</button>
          <button onClick={() => onDelete(job.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default JobList;

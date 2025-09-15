/* eslint-disable no-empty-pattern */
import { Link } from "react-router-dom";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ }: SidebarProps) {

  return (
    <aside className="flex flex-col h-full bg-white shadow-lg p-6">
  <h1 className="text-2xl font-bold text-indigo-600 mb-6">ProHire</h1>
  <nav className="flex flex-col gap-3">
    <Link
      to="/jobs"
      className="px-4 py-2 rounded hover:bg-indigo-100 hover:text-indigo-700 font-medium"
    >
      Jobs
    </Link>
    <Link
      to="/candidates"
      className="px-4 py-2 rounded hover:bg-indigo-100 hover:text-indigo-700 font-medium"
    >
      Candidates
    </Link>
    <Link
      to="/assessments"
      className="px-4 py-2 rounded hover:bg-indigo-100 hover:text-indigo-700 font-medium"
    >
      Assessments
    </Link>
  </nav>
</aside>

  );
}

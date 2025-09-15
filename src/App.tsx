import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import JobsPage from "./features/jobs/JobsPage";
import JobDetails from "./features/jobs/JobDetails";
import CandidatesPage from "./features/candidates/CandidatesPage";
import CandidateProfile from "./features/candidates/CandidateProfile";
import AssessmentsPage from "./features/assessments/AssessmentPage";
import AssessmentRuntime from "./features/assessments/AssessmentRuntime";

function App() {
  return (
    <Router>
      <div className="flex h-screen font-sans bg-gray-100 text-gray-900">
        {/* Sidebar */}
        <Sidebar className="w-64 bg-white shadow-lg" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar className="bg-white shadow-sm px-6 py-4" />

          {/* Content Area */}
          <main className="flex-1 p-6 md:p-10 overflow-auto">
            <Routes>
              <Route path="/" element={<JobsPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetails />} />

              <Route path="/candidates" element={<CandidatesPage />} />
              <Route path="/candidates/:id" element={<CandidateProfile candidate={{
                appliedRole: undefined,
                id: "",
                name: "",
                role: undefined,
                bio: undefined,
                email: undefined,
                phone: undefined,
                status: undefined
              }} />} />

              <Route path="/assessments" element={<AssessmentsPage />} />
              <Route path="/assessments/:id" element={<AssessmentRuntime />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

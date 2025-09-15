import { Candidate } from "../../types/models"
import Notes from "../../components/Notes"

interface Props {
  candidate: Candidate
}

export default function CandidateProfile({ candidate }: Props) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{candidate.name}</h2>
      <p className="text-gray-600 mb-4">{candidate.appliedRole}</p>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Status</h3>
          <p>{candidate.status}</p>
        </div>

        <div>
          <h3 className="font-semibold">Email</h3>
          <p>{candidate.email || "Not provided"}</p>
        </div>

        <div>
          <h3 className="font-semibold">Phone</h3>
          <p>{candidate.phone || "Not provided"}</p>
        </div>

        {/* ✅ Notes Section */}
        <div>
          <Notes />
        </div>
      </div>
    </div>
  )
}


import { useParams } from "react-router-dom"
import { useGetJobsQuery } from "../../api/rtkApi"

export default function JobDetails() {
  const { id } = useParams<{ id: string }>()
  const { data: jobs, isLoading, error } = useGetJobsQuery({ page: 1, pageSize: 5 })

  if (isLoading) return <p className="p-6">Loading job...</p>
  if (error) return <p className="p-6 text-red-600">Failed to load job</p>

  const job = jobs?.data.find((j: { id: string | undefined }) => j.id === id)

  if (!job) {
    return <p className="p-6 text-gray-600">Job not found.</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <span
        className={`inline-block px-2 py-1 text-xs rounded mb-4 ${
          job.status === "active" ? "bg-green-200" : "bg-gray-300"
        }`}
      >
        {job.status}
      </span>
      <p className="text-gray-700">{job.description}</p>
    </div>
  )
}

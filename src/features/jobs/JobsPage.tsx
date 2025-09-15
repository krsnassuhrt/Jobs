import { useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"
import { useGetJobsQuery } from "../../api/rtkApi"
import DragReorderList from "../../components/DragReorderList"

import type { Job } from "../../types/models"

export default function JobsPage() {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)

  // Pass required argument to useGetJobsQuery
  const { data: jobsResponse, isLoading, error } = useGetJobsQuery({
    search: debouncedSearch,
    status: "",
    page: 1,
    pageSize: 100,
  })

  if (isLoading) return <p className="p-6">Loading jobs...</p>
  if (error) return <p className="p-6 text-red-600">Failed to load jobs</p>
  if (!jobsResponse) return null

  // Filter jobs from the response data array
  const filtered: Job[] = jobsResponse.data.filter((job) =>
    job.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  )



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>

      {/* Search box */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search jobs..."
        className="border px-3 py-2 mb-4 w-full rounded"
      />

      {/* Render jobs */}
      {filtered.length > 0 ? (
        <>
          {/* Drag & Drop List */}
          <DragReorderList jobs={filtered} />

         
        </>
      ) : (
        <p className="text-gray-500">No jobs found.</p>
      )}
    </div>
  )
}

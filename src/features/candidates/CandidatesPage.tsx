import { useState } from "react"
import { useGetCandidatesQuery } from "../../api/rtkApi"
import VirtualizedList from "../../components/VirtualizedList"
import { useDebounce } from "../../hooks/useDebounce"
import type { Candidate } from "../../types/models"

export default function CandidatesPage() {
  const { data: candidates, isLoading, error } = useGetCandidatesQuery()
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)

  if (isLoading) return <p className="p-6">Loading candidates...</p>
  if (error) return <p className="p-6 text-red-600">Failed to load candidates</p>
  if (!candidates) return null

  // Filter candidates
  const filtered: Candidate[] = candidates.filter((c) =>
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Candidates</h1>

      {/* Search box */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search candidates..."
        className="border px-3 py-2 mb-4 w-full rounded"
      />

      {/* Virtualized list */}
      {filtered.length > 0 ? (
        <VirtualizedList items={candidates} height={500}  />
      ) : (
        <p className="text-gray-500">No candidates found.</p>
      )}
    </div>
  )
}

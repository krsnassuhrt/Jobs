import { useGetAssessmentsQuery } from "../../api/rtkApi"

export default function AssessmentsPage() {
  const { data: assessments, isLoading, error } = useGetAssessmentsQuery()

  if (isLoading) return <p className="p-6">Loading assessments...</p>
  if (error) return <p className="p-6 text-red-600">Failed to load assessments</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assessments</h1>
      <ul className="space-y-2">
        {assessments?.map((a) => (
          <li key={a.id} className="p-3 bg-white shadow rounded">
            <h2 className="font-semibold">{a.title}</h2>
            <p className="text-sm text-gray-600">
              {a.questions.length} questions
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

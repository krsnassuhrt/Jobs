import { useState } from "react"
import { useGetAssessmentsQuery } from "../../api/rtkApi"

export default function AssessmentRuntime() {
  const { data: assessments } = useGetAssessmentsQuery()
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!assessments || assessments.length === 0) {
    return <p className="p-4 text-gray-600">No assessments available.</p>
  }

  const current = assessments[currentIndex]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{current.title}</h2>
      <p className="mb-4 text-gray-700">{current.description}</p>
      <ol className="list-decimal list-inside space-y-2">
        {current.questions.map((q, i) => (
          <li key={i} className="p-2 bg-white shadow rounded">
            {q}
          </li>
        ))}
      </ol>

      <div className="mt-4 flex space-x-2">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((p) => p - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentIndex === assessments.length - 1}
          onClick={() => setCurrentIndex((p) => p + 1)}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

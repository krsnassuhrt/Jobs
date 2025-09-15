import { useState } from "react"
import { useCreateAssessmentMutation } from "../../api/rtkApi"
import { v4 as uuidv4 } from "uuid"

export default function AssessmentBuilder() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<string[]>([])

  const [createAssessment] = useCreateAssessmentMutation()

  const addQuestion = () => setQuestions([...questions, ""])

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    setQuestions(newQuestions)
  }

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return
    await createAssessment({ id: uuidv4(), title, description, questions })
    setTitle("")
    setDescription("")
    setQuestions([])
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Assessment</h2>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <h3 className="font-semibold mb-2">Questions</h3>
      {questions.map((q, i) => (
        <input
          key={i}
          className="border p-2 mb-2 w-full"
          placeholder={`Question ${i + 1}`}
          value={q}
          onChange={(e) => handleQuestionChange(i, e.target.value)}
        />
      ))}
      <div className="flex space-x-2">
        <button
          onClick={addQuestion}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          Add Question
        </button>
        <button
          onClick={handleSubmit}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Save Assessment
        </button>
      </div>
    </div>
  )
}

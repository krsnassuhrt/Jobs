import { useState } from "react"

interface Note {
  id: string
  text: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [input, setInput] = useState("")

  const handleAdd = () => {
    if (!input.trim()) return
    setNotes([...notes, { id: crypto.randomUUID(), text: input }])
    setInput("")
  }

  return (
    <div className="p-4 bg-gray-50 rounded shadow">
      <h3 className="font-semibold mb-2">Notes</h3>
      <ul className="space-y-1 mb-2">
        {notes.map((n) => (
          <li key={n.id} className="p-2 bg-white rounded shadow">
            {n.text}
          </li>
        ))}
      </ul>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a note... (use @Name)"
        className="border px-2 py-1 w-full rounded"
      />
      <button
        onClick={handleAdd}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
      >
        Add Note
      </button>
    </div>
  )
}

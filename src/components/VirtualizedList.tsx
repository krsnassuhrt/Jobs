// src/components/VirtualizedList.tsx
import React from "react"
import { Virtuoso } from "react-virtuoso"
import type { Candidate } from "../types/models"

type Props = {
  items: Candidate[]
  height?: number
}

const VirtualizedList: React.FC<Props> = ({ items, height = 400 }) => {
  return (
    <div className="border rounded shadow bg-white">
      <Virtuoso
        style={{ height }}
        totalCount={items.length}
        itemContent={(index) => {
          const candidate = items[index]
          return (
            <div className="p-2 border-b border-gray-200 flex flex-col">
              <span className="font-medium">{candidate.name}</span>
              <span className="text-sm text-gray-600">{candidate.role}</span>
            </div>
          )
        }}
      />
    </div>
  )
}

export default VirtualizedList

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useState } from "react"
import { useReorderJobsMutation } from "../api/rtkApi"
import SortableItem from "./SortableItem"
import { Job } from "../types/models"

interface Props {
  jobs: Job[]
}

export default function DragReorderList({ jobs }: Props) {
  const [items, setItems] = useState(jobs)
  const [reorderJobs] = useReorderJobsMutation()

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)
    const newOrder = arrayMove(items, oldIndex, newIndex)

    setItems(newOrder) // optimistic update
    try {
      await reorderJobs(newOrder.map((j) => j.id)).unwrap()
    } catch (err) {
      console.error("Reorder failed", err)
      setItems(items) // rollback
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((job) => (
          <SortableItem key={job.id} id={job.id}>
            <div className="p-2 border rounded bg-white shadow">
              {job.title}
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  )
}

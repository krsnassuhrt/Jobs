import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { jobSchema } from "../../utils/validators"
import { z } from "zod"
import Modal from "../../components/Modal"
import Button from "../../components/Button"
import { useCreateJobMutation } from "../../api/rtkApi"
import { useToast } from "../../hooks/useToast"

type JobFormData = z.infer<typeof jobSchema>

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function JobFormModal({ isOpen, onClose }: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  })

  const [createJob] = useCreateJobMutation()
  const { addToast } = useToast()

  const onSubmit = async (data: JobFormData) => {
    try {
      await createJob(data).unwrap()
      addToast("Job created successfully!", "success")
      reset()
      onClose()
    } catch {
      addToast("Failed to create job", "error")
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Job">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("title")}
            placeholder="Job Title"
            className="border px-3 py-2 rounded w-full"
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </div>
        <div>
          <textarea
            {...register("description")}
            placeholder="Job Description"
            className="border px-3 py-2 rounded w-full"
          />
          {errors.description && <p className="text-red-600">{errors.description.message}</p>}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  )
}

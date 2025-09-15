import { useToast } from "../hooks/useToast"

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow ${
            toast.type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-2">✕</button>
          </div>
        </div>
      ))}
    </div>
  )
}

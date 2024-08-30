import { toast } from 'react-hot-toast'

export function useToast() {
  function showSuccess(message: string) {
    toast.success(message)
  }

  function showError(message: string) {
    toast.error(message)
  }

  return {
    showSuccess,
    showError,
  }
}

import type { Attachment } from '@telepetros/core/structs'

export function useChatMessage(attachment: Attachment | null) {
  function handleDeleteButtonClick() {}

  function handleEditButtonClick() {}

  function handleCopyButtonClick() {}

  return {
    handleCopyButtonClick,
    handleEditButtonClick,
    handleDeleteButtonClick,
  }
}

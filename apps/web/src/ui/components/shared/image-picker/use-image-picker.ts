import { type RefObject, useState, type ChangeEvent, useEffect } from 'react'
import type { ReactCropperElement } from 'react-cropper'

import type { ModalRef } from '../modal/types'

export function useImagePicker(
  modalRef: RefObject<ModalRef>,
  cropperRef: RefObject<ReactCropperElement>,
  onPick: (file: File) => void,
) {
  const [image, setImage] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string>('')

  function handleCropImage() {
    const canvas = cropperRef.current?.cropper.getCroppedCanvas()
    if (!canvas) return

    const croppedImage = canvas.toDataURL()

    canvas.toBlob((blob) => {
      if (!blob) return

      const file = new File([blob], 'cropped_image.png', { type: 'image/png' })
      onPick(file)
    })

    if (croppedImage) {
      setImage(croppedImage)
    }
  }

  function handleInputFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.item(0)

    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewImage(url)
      modalRef.current?.open()
    }
  }

  useEffect(() => {
    return () => URL.revokeObjectURL(previewImage)
  }, [previewImage])

  return {
    image,
    previewImage,
    handleInputFileChange,
    handleCropImage,
  }
}

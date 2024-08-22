import { type RefObject, useState, type ChangeEvent, useEffect } from 'react'
import type { ReactCropperElement } from 'react-cropper'

export function useImagePicker(cropperRef: RefObject<ReactCropperElement>) {
  const [image, setImage] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string>('')

  function handleCropImage() {
    const croppedImage = cropperRef.current?.cropper.getCroppedCanvas().toDataURL()

    if (croppedImage) {
      setImage(croppedImage)
    }
  }

  function handleInputFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.item(0)

    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewImage(url)
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

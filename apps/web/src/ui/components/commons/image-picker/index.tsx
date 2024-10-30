import { type ReactNode, useRef } from 'react'
import { Image } from '@nextui-org/react'
import { Cropper, type ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import { Icon } from '../icon'
import { Modal } from '../modal'
import type { ModalRef } from '../modal/types'
import { useImagePicker } from './use-image-picker'

type ImagePickerProps = {
  id: string
  children: (image: string) => ReactNode
  onPick: (file: File) => void
}

export const ImagePicker = ({ id, children, onPick }: ImagePickerProps) => {
  const modalRef = useRef<ModalRef>(null)
  const cropperRef = useRef<ReactCropperElement>(null)
  const { image, previewImage, handleInputFileChange, handleCropImage } = useImagePicker(
    modalRef,
    cropperRef,
    onPick,
  )

  return (
    <>
      <Modal ref={modalRef} title='Cutting image' isLarge onConfirm={handleCropImage}>
        <Cropper
          ref={cropperRef}
          src={previewImage}
          aspectRatio={1}
          className='w-full h-full'
          guides
        />
      </Modal>

      <label htmlFor={id}>
        {image ? (
          <Image src={image} alt='cropped image' radius='full' width={192} height={192} />
        ) : (
          <Icon name='image' size={48} className='text-slate-500' />
        )}
        <input
          id={id}
          type='file'
          name='file-input'
          accept='image/*'
          onChange={handleInputFileChange}
          className='sr-only'
        />
      </label>
    </>
  )
}

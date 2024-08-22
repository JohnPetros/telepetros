import { useRef } from 'react'
import { Cropper, type ReactCropperElement } from 'react-cropper'

import { Icon } from '../icon'
import { Modal } from '../modal'
import { useImagePicker } from './use-image-picker'
import { Image } from '@nextui-org/react'

export const ImagePicker = () => {
  const cropperRef = useRef<ReactCropperElement>(null)
  const { image, previewImage, handleInputFileChange, handleCropImage } =
    useImagePicker(cropperRef)

  return (
    <>
      <Modal title='Crop image' onConfirm={handleCropImage} isDefaultOpen={true}>
        {previewImage && (
          <Cropper
            ref={cropperRef}
            src={previewImage}
            aspectRatio={60}
            className='flex-1 h-0'
            guides
          />
        )}
      </Modal>

      <label
        htmlFor='avatar'
        className='grid place-content-center mx-auto size-32 mt-3 bg-slate-100 rounded-full cursor-pointer'
      >
        {image ? (
          <Image src={image} alt='cropped image' radius='full' />
        ) : (
          <Icon name='image' size={48} className='text-slate-500' />
        )}
        <input
          id='avatar'
          type='file'
          name='avatar'
          accept='image/*'
          onChange={handleInputFileChange}
          className='hidden'
        />
      </label>
    </>
  )
}

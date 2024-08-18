import Image from 'next/image'

type LogoProps = {
  size: number
}

export const Logo = ({ size }: LogoProps) => {
  return (
    <div className='p-2 bg-blue-500 w-max rounded-full'>
      <Image src='/images/panda.svg' width={size} height={size} alt='' />
    </div>
  )
}

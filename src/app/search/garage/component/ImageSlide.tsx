import { Box, Image } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

import { getFileUrl } from '@/utils/images'
import { useState } from 'react'

const ImageSlide = ({ data }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % data.length)
  }

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + data.length) % data.length)
  }

  return (
    <div className="h-full w-full">
      <Image
        src={getFileUrl(data[currentIndex])}
        alt={`Slide ${currentIndex + 1}`}
        className="h-full max-h-[500px] rounded-2xl"
        fit="cover"
      />
      <Box className="absolute flex gap-4 bottom-2 right-8 cursor-pointer z-10 translate-y-[-50%] p-2 ">
        <Box onClick={prevSlide} className=" bg-white rounded-full p-1">
          <IconChevronLeft />
        </Box>
        <Box onClick={nextSlide} className="bg-white rounded-full p-1">
          <IconChevronRight />
        </Box>
      </Box>
    </div>
  )
}

export default ImageSlide

'use client'

import { Box, Spoiler, Text } from '@mantine/core'
import Textarea from 'react-textarea-autosize'

const Description = ({ describe }: { describe: string }) => {
  return (
    <Box className="w-full mt-5">
      <Spoiler
        maxHeight={120}
        showLabel={<Text className="mt-4 font-bold text-black">Xem thêm</Text>}
        hideLabel={<Text className="mt-4 font-bold text-black">Ẩn bớt</Text>}
        transitionDuration={0}
        color="black"
      >
        <Textarea id="content" className="w-full h-fit resize-none border-none">
          {describe}
        </Textarea>
      </Spoiler>
    </Box>
  )
}

export default Description

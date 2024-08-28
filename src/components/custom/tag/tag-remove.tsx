import { IconArrowUpRight, IconX } from '@tabler/icons-react'

import { Text } from '@mantine/core'

interface TagProps {
  children: React.ReactNode
  handleClose: (e: any) => void
  onMouseDown: () => void
  onClick?: (e: any) => void
  type: 'remove' | 'enter'
  item: any
}
function TagRemove({
  children,
  handleClose,
  onMouseDown,
  onClick,
  type = 'remove',
  item
}: TagProps) {
  return (
    <div className="flex justify-between gap-x-4 items-center cursor-pointer bg-[#f8f8f8] rounded-md py-2 px-2 md:bg-transparent md:px-0 md:py-0">
      <div
        onClick={() => {
          onClick && onClick(children)
        }}
        className="flex md:w-full cursor-pointer hover:underline"
      >
        <Text className="cursor-pointer text-main font-medium hover:underline line-clamp-1 max-w-[150px]">
          {/* {children} */}
          {item.key}
        </Text>
      </div>
      {type === 'enter' ? (
        <button>
          <IconArrowUpRight size={16} />
        </button>
      ) : (
        <button onClick={() => handleClose(item)} className="mt-0.5 md:mt-0">
          <IconX size={16} />
        </button>
      )}
    </div>
  )
}

export default TagRemove

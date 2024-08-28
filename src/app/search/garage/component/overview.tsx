import { IconHeart, IconStar } from '@tabler/icons-react'

import { Text } from '@mantine/core'

interface OverviewProps {
  icon: 'heart' | 'star' | 'cart' | 'calender' | string
  content: string
  value: string
  handleViewRating?: (e: any) => void
  opened?: boolean
}
function Overview({
  icon,
  content,
  value,
  handleViewRating,
  opened
}: OverviewProps) {
  return (
    <div
      onClick={() => {
        if (icon === 'star') {
          //@ts-ignore
          handleViewRating(!opened)
        }
      }}
      className="flex items-center gap-x-3 cursor-pointer justify-between"
    >
      <div className="flex md:gap-2 gap-1 items-center">
        {icon === 'heart' && <IconHeart />}
        {icon === 'star' && <IconStar />}
        {icon === 'cart' && (
          <img
            className="w-6 h-6 object-cover filter-image"
            src="/svg/cart.svg"
          />
        )}
        {icon === 'calender' && (
          <img
            className="w-6 h-6 object-cover filter-image"
            src={'/svg/calendar.svg'}
          />
        )}
        <div className="text-sm md:text-base whitespace-nowrap">{content}</div>
      </div>
      <div className="gradientText text-base md:text-lg font-bold">{value}</div>
    </div>
  )
}

export default Overview

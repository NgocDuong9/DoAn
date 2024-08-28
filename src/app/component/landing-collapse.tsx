'use client'

import { Collapse, Flex, Image } from '@mantine/core'
import { IconLink } from '@tabler/icons-react'
import { Fragment, ReactNode, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

const LandingCollapse = ({ item }: { item: any }) => {
  const [opened, setOpened] = useState<boolean>(false)

  return (
    <div className="max-w-main mx-auto md:pb-2 ">
      <div className="flex gap-x-2 my-6 justify-between items-center">
        <div className="flex items-center flex-1 gap-x-2">
          <IconCollapse
            open={opened}
            onChange={() => {
              setOpened(o => !o)
            }}
          />
          <div className="flex flex-col md:flex-row items-start md:items-end gap-x-2 whitespace-nowrap">
            <div className="text-4xl md:text-[80px] font-medium text-main">
              {item.quantity}
            </div>
            <div className="text md:text-2xl font-medium text-main">
              {item.title}
            </div>
          </div>
        </div>

        <div className="flex flex-1 justify-between items-center">
          <div className="font-medium text-sm md:text-2xl max-w-[300px] md:max-w-[600px] text-main">
            {item.desc}
          </div>
          <IconLink href="#" />
        </div>
      </div>
      <Collapse in={opened}>
        <Image src={item.img} alt={item.img} />
      </Collapse>
    </div>
  )
}

export default LandingCollapse

const IconCollapse = ({
  open,
  onChange
}: {
  open: boolean
  onChange: () => void
}) => {
  return (
    <div
      onClick={onChange}
      className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] flex justify-center items-center bg-[#ECF3F5] rounded-full cursor-pointer"
    >
      {open ? <FiMinus /> : <FiPlus />}
    </div>
  )
}

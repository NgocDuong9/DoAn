import { Box, Paper, Text } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'

import { IconChevronDown } from '@tabler/icons-react'
import { Input } from '@/components/custom/input/input'
import { NestedCheckboxes } from './nested-checkbox'
import PriceRange from './price-range-slider'
import useClickOutside from './useClickOutside'

interface CheckboxProps {
  title: string
  data: any
  onChange: (e: any, isChecked: boolean) => void
  checkedData: any
  type?: 'checkbox' | 'radio'
  hideSearch?: boolean
  typeChildren?: 'checkbox' | 'range'
  bgColor?: string
  hideNumb?: boolean
}
function CheckboxWithFilter({
  title,
  data,
  onChange,
  checkedData,
  type = 'checkbox',
  hideSearch = false,
  typeChildren = 'checkbox',
  bgColor,
  hideNumb = false
}: CheckboxProps) {
  const [opened, setOpened] = useState(false)
  const [dataFilter, setDataFilter] = useState([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDataFilter(data)
  }, [data])

  useClickOutside(ref, () => {
    setOpened(false)
  })

  const handleButtonClick = () => setOpened(true)

  const handleOnchangeText = (e: any) => {
    const value = e.target.value
    const filterData = data.filter((item: any) =>
      item.key.toLowerCase().includes(value.toLowerCase())
    )
    setDataFilter(filterData)
  }
  return (
    <Box
      className={`${
        opened
          ? 'bg-gradient-to-r from-[#52BAE6] via-[#67F2D1] to-[#51C2A7]'
          : bgColor
            ? 'bg-white'
            : 'bg-[#F8F8F8]'
      }  ? rounded-full py-2 px-4  min-w-[150px] cursor-pointer relative`}
      onClick={() => {
        handleButtonClick()
      }}
    >
      <Box className="flex items-center justify-between">
        <Text
          className={`text-base ${opened ? 'text-white' : 'text-black'}`}
          lineClamp={1}
        >
          {title}
        </Text>
        <div
          className={`flex justify-center items-center  rounded-full h-5 w-5 ${
            hideNumb || checkedData.length === 0 ? 'bg-transparent' : 'bg-white'
          }`}
        >
          {hideNumb || checkedData.length === 0 ? (
            <></>
          ) : (
            <Text className="text-black">{checkedData.length}</Text>
          )}
        </div>
        <div className="">
          <IconChevronDown size={14} color={opened ? 'white' : 'black'} />
        </div>
      </Box>
      {opened && (
        <Paper
          ref={ref}
          withBorder
          shadow="md"
          className={`absolute z-10 border md:left-0 left-0 border-gray-300 rounded mt-2 shadow-md px-4 py-4 cursor-pointer ${
            typeChildren === 'checkbox' ? 'max-w-fit' : 'w-[150%]'
          }`}
        >
          {!hideSearch && (
            <Input
              label=""
              placeholder="Tìm kiếm"
              onChange={e => handleOnchangeText(e)}
            />
          )}
          <div className="mt-2">
            {typeChildren === 'checkbox' ? (
              <NestedCheckboxes
                data={dataFilter}
                checkedItems={checkedData ?? ''}
                filterKey="key"
                onChange={(e: any, isChecked: boolean) => {
                  onChange(e, isChecked)
                }}
                type={type}
              />
            ) : (
              <div className="mb-4">
                <PriceRange
                  setData={(e: any) => {
                    onChange(e, false)
                  }}
                  valuePick={checkedData}
                />
              </div>
            )}
          </div>
        </Paper>
      )}
    </Box>
  )
}

export default CheckboxWithFilter

'use client'

import { Box, Button, Checkbox, Grid, Modal, Text } from '@mantine/core'

import province from '../../../../assets/address/province.json'
import { useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'

interface ModalProps {
  showDropdown: boolean
  setShowDropdown: () => void
  multiple?: boolean
  checkedData: any
  handleCheckedData: (e: any) => void
}
const groupByFirstLetter = (data: any) => {
  const groupedData = {} as any

  Object.keys(data).forEach(key => {
    const firstLetter = data[key].name.charAt(0).toUpperCase()
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = []
    }
    groupedData[firstLetter].push(data[key])
  })

  return groupedData
}
function ModalZone({
  showDropdown,
  setShowDropdown,
  multiple = true,
  checkedData,
  handleCheckedData
}: ModalProps) {
  const [listChecked, setListChecked] = useState<any>(checkedData)
  const groupedData = groupByFirstLetter(province)
  let listTemp = [...listChecked] as any

  const sortedKeys = Object.keys(groupedData).sort()
  const handleChecked = (value: any) => {
    if (multiple) {
      if (
        !listTemp.some(
          (city: any) =>
            city.name === value.name &&
            city.slug === value.slug &&
            city.type === value.type &&
            city.name_with_type === value.name_with_type &&
            city.code === value.code
        )
      ) {
        listTemp.push(value)
        setListChecked(listTemp)
      } else {
        const index = listTemp.findIndex(
          (city: any) =>
            city.name === value.name &&
            city.slug === value.slug &&
            city.type === value.type &&
            city.name_with_type === value.name_with_type &&
            city.code === value.code
        )

        if (index !== -1) {
          listTemp.splice(index, 1)
          setListChecked(listTemp)
        }
      }
    }
  }
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <Modal
        opened={showDropdown}
        onClose={setShowDropdown}
        title="Chọn tỉnh/thành phố"
        size={'2xl'}
      >
        <Box>
          {sortedKeys.map(letter => (
            <Box key={letter} mb="sm" className="pb-2 border-b-2">
              <Text className="text-lg font-semibold">{letter}</Text>
              <Grid className="flex gap-10 py-5">
                {groupedData[letter].map((item: any, index: number) => (
                  <Grid.Col
                    span={isMobile ? 6 : 2}
                    key={index}
                    pl="md"
                    className="py-2"
                  >
                    <Checkbox
                      label={<p className="whitespace-nowrap">item.name</p>}
                      //@ts-ignore
                      checked={listChecked.some(
                        (city: any) =>
                          city.name === item.name &&
                          city.slug === item.slug &&
                          city.type === item.type &&
                          city.name_with_type === item.name_with_type &&
                          city.code === item.code
                      )}
                      onChange={() => handleChecked(item)}
                      color="#52BAE6"
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              setShowDropdown()
            }}
            className="rounded-[10px] w-32 bg-white text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            // variant="gradient"
            // gradient={{ from: "black", to: "red", deg: 90 }}
          >
            Huỷ bỏ
          </Button>

          <Button
            onClick={() => {
              setShowDropdown()
              handleCheckedData(listChecked)
            }}
            className=" bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-[10px] border border-[white] w-32"
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ModalZone

'use client'

import { getCategory } from '@/apis/detail'
import { Box, Skeleton, Table, Text } from '@mantine/core'
import { IconPointFilled } from '@tabler/icons-react'
import { Fragment, useEffect, useState } from 'react'

interface parameters {
  name: string
  class?: string // Thuong hieu
  // images?: string[];
  origin?: string
  // videos: string[];
  weight?: string //Kích thước lốp
  key_rim?: string //lazang
  key_size?: string //kich co
  pressure?: string //ap xuat
  key_brand?: string // Thuong hieu
  speedLoad?: string
  description?: string
  key_vehicle?: string[] // tuong thich
  manufacture?: number //nam sx
  key_code: string // ma ac_quy
  key_type: string // loai
  key_capacity: string // dung luong
  key_voltage: string // dien ap
  size: string //kich thuoc binh
  key_tread?: string // ma gai
}

interface Props {
  parameters: parameters
  sellInfo: SellInfo
  carKey: any
}
interface SellInfo {
  price: number
  stock: string
  dateGuarantee: number
  typeGuarantee: string
}

function Parameters({ parameters, sellInfo, carKey }: Props) {
  const [carCompatible, setCarCompatible] = useState('')

  function findValueByKey(key: string | undefined): any | null {
    if (!key || !carKey) return null
    for (const item of carKey) {
      if (item.key === key) {
        return item.name
      }
    }
    return null
  }

  useEffect(() => {
    let combinedText = ''
    if (!parameters.key_vehicle) return
    for (let index = 0; index < parameters.key_vehicle.length; index++) {
      const element = parameters.key_vehicle[index]
      combinedText += findValueByKey(element) + ' '
    }
    setCarCompatible(combinedText.trim())
  }, [carKey])

  const productDetails = [
    {
      key: 'Thương hiệu',
      value: findValueByKey(parameters.key_brand)
    },
    {
      key: 'La-zăng',
      value: findValueByKey(parameters.key_rim) || parameters.key_rim
    },
    {
      key: 'Mã gai',
      value: findValueByKey(parameters.key_tread) || parameters.key_tread
    },
    {
      key: 'Kích cỡ',
      value: findValueByKey(parameters.key_size) || parameters.key_size
    },
    {
      key: 'Loại ắc quy',
      value: findValueByKey(parameters.key_type) || parameters.key_type
    },
    {
      key: 'Mã bình ắc quy',
      value: findValueByKey(parameters.key_code)
    },
    {
      key: 'Dung lượng',
      value: parameters.key_capacity
    },
    {
      key: 'Điện áp',
      value: parameters.key_voltage
    },
    {
      key: 'Kích thước bình',
      value: parameters.size
    },
    {
      key: 'Chỉ số tải trọng/tốc độ',
      value: parameters.speedLoad
    },
    {
      key: 'Áp suất khuyến nghị',
      value: parameters.pressure
    },
    {
      key: 'Kích thước lốp',
      value: parameters.weight
    },
    {
      key: 'Nhà sản xuất bảo hành',
      value:
        ((sellInfo?.dateGuarantee && sellInfo?.dateGuarantee) ?? '--') +
        ' tháng'
    },
    {
      key: 'Xuất xứ',
      value: findValueByKey(parameters.origin) || parameters.origin
    },
    {
      key: 'Năm sản xuất',
      value: parameters.manufacture
    },

    {
      key: 'Dòng xe tương thích',
      value: carCompatible
    }
  ]
  const rows = productDetails.map((element, index) => (
    <>
      {/* {element.value && (
        <Table.Tr key={element.key}>
          <Table.Td className="flex items-center gap-2">
            <IconPointFilled size="12px" />
            <Text size="18px">{element.key}</Text>
          </Table.Td>
          <Table.Td className="text-end">
            <Text size="18px" className="font-medium">
              {element.value}
            </Text>
          </Table.Td>
        </Table.Tr>
      )} */}
      {element.value && (
        <div
          key={index}
          className="flex items-center justify-between md:mb-2 mb-1"
        >
          <div className="flex items-center gap-x-2">
            <IconPointFilled size="12px" />
            <div className="text-sm md:text-lg ">{element.key}</div>
          </div>
          <div>
            <div className="text-base md:text-xl">{element.value}</div>
          </div>
        </div>
      )}
    </>
  ))

  return <Box className="mt-4">{rows} </Box>
}

export default Parameters

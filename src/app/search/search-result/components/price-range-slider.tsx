import { Box, RangeSlider, Text } from '@mantine/core'
import { IconChevronDown, IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

export const formatCurrency = (value: any) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value)
}

const PriceRange = ({ setData, valuePick, title }: any) => {
  const [values, setValues] = useState<[number, number]>([0, 100])
  const [showCategory, setShowCategory] = useState(true)
  const [dragTimeout, setDragTimeout] = useState<any>(null)
  useEffect(() => {
    if (valuePick?.length === 0) return
    if (!valuePick[0] && !valuePick[0]) {
      setValues([0, 100])
    } else {
      const newValues = valuePick?.map((item: string) =>
        reverseRenderValue(+item)
      )
      setValues(newValues)
    }
  }, [valuePick])

  const handleSliderChange = (newValues: [number, number]) => {
    setValues(newValues)
    if (dragTimeout) {
      clearTimeout(dragTimeout)
    }
    setDragTimeout(
      setTimeout(() => {
        setData(newValues)
      }, 2000)
    )
  }
  const reverseRenderValue = (largeValue: number) => {
    if (largeValue <= 500000) {
      return (largeValue / 500000) * 15 // 0 to 15
    }
    if (largeValue > 500000 && largeValue <= 1000000) {
      return 15 + ((largeValue - 500000) / 500000) * 15 // 15 to 30
    }
    if (largeValue > 1000000 && largeValue <= 2000000) {
      return 30 + ((largeValue - 1000000) / 1000000) * 20 // 30 to 50
    }
    if (largeValue > 2000000 && largeValue <= 5000000) {
      return 50 + ((largeValue - 2000000) / 3000000) * 20 // 50 to 70
    }
    if (largeValue > 5000000 && largeValue <= 10000000) {
      return 70 + ((largeValue - 5000000) / 5000000) * 20 // 70 to 90
    }
    if (largeValue > 10000000) {
      return 90 + ((largeValue - 10000000) / 10000000) * 10 // 90 to 100
    }
  }

  const renderValue = (value: any) => {
    if (value <= 15) {
      return Math.floor((value * 500000) / 15) // 0 to 500K
    }
    if (value > 15 && value <= 30) {
      return Math.floor(500000 + ((value - 15) * 500000) / 15) // 500K to 1M
    }
    if (value > 30 && value <= 50) {
      return Math.floor(1000000 + ((value - 30) * 1000000) / 20) // 1M to 2M
    }
    if (value > 50 && value <= 70) {
      return Math.floor(2000000 + ((value - 50) * 3000000) / 20) // 2M to 5M
    }
    if (value > 70 && value <= 90) {
      return Math.floor(5000000 + ((value - 70) * 5000000) / 20) // 5M to 10M
    }
    if (value > 90) {
      return Math.floor(10000000 + ((value - 90) * 10000000) / 10) // 10M to 20M
    }
  }

  return (
    <Box
      style={{
        maxWidth: 600,
        margin: 'auto',
        paddingBottom: !showCategory ? 0 : 40
      }}
    >
      <Box
        className={`flex w-full justify-between items-center gap-2 `}
        onClick={() => {
          setShowCategory(!showCategory)
        }}
      >
        {title ? (
          <Text className="font-medium text-[18px]">{title}</Text>
        ) : (
          <></>
        )}
        {!title ? (
          ''
        ) : !showCategory ? (
          <IconPlus size={18} />
        ) : (
          <IconChevronDown size={18} />
        )}
      </Box>
      {showCategory && (
        <RangeSlider
          value={values}
          onChange={handleSliderChange}
          min={0}
          max={100}
          label={value => renderValue(value)}
          size={'sm'}
          // step={0.1}
          styles={{
            bar: {
              background: 'linear-gradient(to right, #52BAE6, #67F2D1, #51C2A7)' // Gradient for the filled area
            },
            thumb: {
              borderColor: '#67F2D1', // Make the thumb border transparent
              backgroundColor: 'white' // Color of the thumb background
            },
            track: {
              background: 'linear-gradient(to right, lightgray, gray)' // Gradient for the unfilled area
            },
            mark: {
              background: 'linear-gradient(to right, #52BAE6, #67F2D1, #51C2A7)' // Gradient for the dots
            }
          }}
          className="pt-2"
          marks={[
            { value: 15, label: '500K' },
            { value: 30, label: '1Tr' },
            { value: 50, label: '2Tr' },
            { value: 70, label: '5Tr' },
            { value: 90, label: '10Tr' }
          ]}
        />
      )}
    </Box>
  )
}

export default PriceRange

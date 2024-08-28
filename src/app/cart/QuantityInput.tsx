import { Button, Flex, NumberInput, NumberInputHandlers } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { useRef } from 'react'

interface PropsType {
  record: Record<string, any>
  handleUpdateCart: (arg0: Record<string, any>, arg1: string) => void
  handleDeleteCart: (arg0: string[]) => void
}

const QuantityInput: React.FC<PropsType> = ({
  record,
  handleUpdateCart,
  handleDeleteCart
}) => {
  const handlersRef = useRef<NumberInputHandlers>(null)

  const handleChange = useDebouncedCallback(async (value: string | number) => {
    if (value === 0) {
      handleDeleteCart([record.id])
    } else {
      handleUpdateCart({ count: value }, record.id)
    }
  }, 500)

  return (
    <div className="flex items-center">
      <Button
        variant="white"
        color="black"
        className="md:h-[48px] md:w-[48px] md:text-lg h-[30px] w-[30px] text-md font-medium p-0"
        onClick={() => handlersRef.current?.decrement()}
      >
        -
      </Button>
      <NumberInput
        handlersRef={handlersRef}
        radius="xs"
        hideControls
        className="min-w-12 text-center bg-[#f8f8f8] h-[35px] max-w-[40px] text-lg flex items-center justify-center"
        // styles={{
        //   input: {
        //     padding: 0,
        //     textAlign: "center",
        //     background: "#F8F8F8",
        //     height: 48,
        //     fontSize: 20,
        //     fontWeight: 500,
        //   },
        // }}
        defaultValue={record.count}
        min={0}
        onChange={handleChange}
      />
      <Button
        variant="white"
        color="black"
        className="md:h-[48px] md:w-[48px] md:text-lg h-[30px] w-[30px] text-md font-medium p-0"
        onClick={() => handlersRef.current?.increment()}
      >
        +
      </Button>
    </div>
  )
}

export default QuantityInput

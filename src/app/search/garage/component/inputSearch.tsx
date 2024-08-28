import { Box, Paper, Text, TextInput } from '@mantine/core'
import { IconChevronDown, IconSearch, IconX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

function InputSearch({ query, setQuery, placeholder, handleRoleSearch }: any) {
  const [key, setKey] = useState('')
  const [typingTimeout, setTypingTimeout] = useState<any>(null)
  const [opened, setOpened] = useState(false)
  const [selectType, setSelectType] = useState<string>('shop')
  useEffect(() => {
    setKey(query)
  }, [query])

  const handleInputChange = (event: any) => {
    const newValue = event.target.value

    setKey(newValue)

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(
      setTimeout(() => {
        setQuery(newValue, selectType)
      }, 1000)
    )
  }
  const handleClearInput = () => {
    setKey('')

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(
      setTimeout(() => {
        setQuery('', selectType)
      }, 1000)
    )
  }
  return (
    <div className="relative w-full">
      <TextInput
        placeholder={placeholder}
        value={key}
        onChange={handleInputChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        classNames={{
          input:
            'border border-transparent h-14 rounded-lg mb-2 pl-14 pr-12 outline-none bg-white'
        }}
      />
      <button className="absolute left-2 bottom-[30%]">
        <IconSearch size={32} color="#58CFAE" />
      </button>
      <div className="absolute right-2 bottom-[20%] p-1 flex justify-between">
        {key && (
          <button
            className="flex p-2 rounded-md bottom-[20%] items-center"
            onClick={() => {
              handleClearInput()
            }}
          >
            <IconX />
          </button>
        )}
        <button
          className="hidden lg:flex relative  p-2 rounded-md  items-center "
          onClick={() => {
            setOpened(true)
          }}
        >
          {selectType === 'shop' ? (
            <Text className="text-sm font-medium">Tìm trong gara này</Text>
          ) : (
            <Text className="text-sm font-medium">Tìm trong toàn bộ gara</Text>
          )}
          <IconChevronDown size={14} />
        </button>
        {opened && (
          <Paper
            //   ref={ref}
            shadow="md"
            className="absolute z-10 w-[200px] right-[-8px] top-10  rounded mt-2 shadow-md p-2 cursor-pointer"
          >
            <div className="gap-y-2">
              <Box
                onClick={() => {
                  setSelectType('shop')
                  // handleRoleSearch("shop");
                  if (typingTimeout) {
                    clearTimeout(typingTimeout)
                  }
                  setTypingTimeout(
                    setTimeout(() => {
                      setQuery(query, 'shop')
                    }, 1000)
                  )
                  setOpened(false)
                }}
                className="py-2 px-2 my-2 rounded-md"
              >
                <Text className="text-sm font-medium">Tìm trong gara này</Text>
              </Box>
              <Box
                onClick={() => {
                  setSelectType('all')
                  // handleRoleSearch("all");
                  if (typingTimeout) {
                    clearTimeout(typingTimeout)
                  }
                  setTypingTimeout(
                    setTimeout(() => {
                      setQuery(query, 'all')
                    }, 1000)
                  )
                  setOpened(false)
                }}
                className="py-2 px-2 rounded-md"
              >
                <Text className="text-sm font-medium">
                  Tìm trong toàn bộ gara
                </Text>
              </Box>
            </div>
          </Paper>
        )}
      </div>
    </div>
  )
}

export default InputSearch

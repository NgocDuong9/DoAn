import { IconMicrophone, IconSearch, IconX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { TextInput } from '@mantine/core'

function InputSearchh({ query, setQuery, widthZ = '50%' }: any) {
  const [key, setKey] = useState('')
  const [typingTimeout, setTypingTimeout] = useState<any>(null)
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
        setQuery(newValue)
      }, 1000)
    )
  }
  const handleClearInput = (event: any) => {
    setKey('')

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(
      setTimeout(() => {
        setQuery('')
      }, 1000)
    )
  }
  return (
    <div className={`relative w-[90%]`}>
      <TextInput
        placeholder="Kho sản phẩm, dịch vụ"
        value={key}
        onChange={handleInputChange}
        // onFocus={handleFocus}
        // onBlur={handleBlur}

        classNames={{
          input:
            'border border-transparent md:h-14 h-12 rounded-lg pl-14 pr-10 outline-none bg-[#F8F8F8]'
        }}
      />
      <button
        className="absolute left-2"
        style={{
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        <IconSearch size={32} color="#58CFAE" />
      </button>

      {key && (
        <button
          className="absolute right-12 p-1 rounded-sm px-4"
          onClick={handleClearInput}
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            right: 0
          }}
        >
          <IconX size={18} />
        </button>
      )}
    </div>
  )
}

export default InputSearchh

'use client'

import { Button } from '@mantine/core'
import { IconCircleX } from '@tabler/icons-react'
import { useEffect } from 'react'

interface IData {
  title?: string
  message?: string
  type?: string
  onCancel: () => void
  onSubmit: () => void
  onOpen: boolean
  loading?: boolean
  children: React.ReactNode
}
function ModalContent({
  title,
  message,
  type,
  onCancel,
  onSubmit,
  onOpen,
  loading,
  children
}: IData) {
  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
  }, [onCancel])
  if (!onOpen) return null
  return (
    <>
      <div className="fixed inset-0 w-[100vw] h-[100vh] z-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center transition-opacity duration-300 ">
        <div className="p-5 border-2 rounded-xl bg-white shadow-lg w-[100%] max-h-[80vh] md:max-w-[60vw] mx-auto transition-transform duration-300 max-w-[90vw] transform-gpu flex-col">
          <div className="flex justify-between">
            <div></div>
            <button onClick={onCancel}>
              <IconCircleX />
            </button>
          </div>

          <h1 className="text-3xl text-center font-bold">
            {title ? title : ''}
          </h1>

          <p className="text-sm pb-4 font-normal max-h-[60vh] overflow-x-auto">
            {message ? message : ''}
          </p>

          {/* <Button
            className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none"
            onClick={onCancel}
          >
            Đóng
          </Button> */}
        </div>
      </div>
    </>
  )
}

export default ModalContent

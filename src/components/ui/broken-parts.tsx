'use client'
import { nanoid } from '@/libs/utils'
import { Button } from '@mantine/core'
import { useActions, useUIState } from 'ai/rsc'
import { UserMessage } from './bot-message'
import { useState } from 'react'

const BrokenParts = ({ errorParts }: { errorParts: string[] }) => {
  const { submitUserMessage, getListOfGara } = useActions()
  const [messages, setMessages] = useUIState()
  const [isSubmit, setIsSubmit] = useState(false)

  return (
    <div className="px-3 py-2 bg-[#f4fafc] rounded-xl text-sm text-main">
      Dựa trên các triệu chứng bạn cung cấp, có thể bạn đăng gặp vấn đề: <span className="font-semibold">{errorParts.join(', ')}</span>
      <div className="mt-2">
        Bạn có muốn tìm danh sách gara để giải quyết vấn đề trên không:
      </div>
      <div className="grid grid-cols-3 mt-3 gap-x-1">
        <Button
          variant="filled"
          color="linear-gradient(91deg, #cbcccd 1.26%, #bfd3d4 66.99%, #b0d5c5 126.97%)"
          radius="xs"
          className="md:rounded-lg rounded-md h-8 w-full border-none col-span-1"
          onClick={async () => {
            if (isSubmit) return
            setMessages((prev: any[]) => [
              ...prev,
              {
                id: nanoid(),
                display: <UserMessage content={`Dừng cuộc trò chuyện.`} />
              }
            ])

            const responseMessage = await submitUserMessage(
              `Dừng cuộc trò chuyện.`
            )

            setMessages((prev: any[]) => [...prev, responseMessage])
            setIsSubmit(true)
          }}
          disabled={isSubmit}
        >
          <div className="font-semibold text-sm">Dừng</div>
        </Button>

        <Button
          variant="filled"
          color="linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%)"
          radius="xs"
          className="md:rounded-lg rounded-md h-8 w-full border-none col-span-2"
          onClick={async () => {
            if (isSubmit) return
            setMessages((prev: any[]) => [
              ...prev,
              {
                id: nanoid(),
                display: (
                  <UserMessage
                    content={`Tôi muốn tìm danh sách gara để giải quyết vấn đề về: ${errorParts.join(', ')}`}
                  />
                )
              }
            ])

            const responseMessage = await getListOfGara(
              `Tôi muốn tìm danh sách gara để giải quyết vấn đề về: ${errorParts.join(', ')}`
            )

            setMessages((prev: any[]) => [...prev, responseMessage])
            setIsSubmit(true)
          }}
          disabled={isSubmit}
        >
          <div className="font-semibold  text-sm">Danh sách gara</div>
        </Button>
      </div>
    </div>
  )
}

export default BrokenParts

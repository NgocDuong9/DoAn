'use client'
import { UserMessage } from '@/components/ui/bot-message'
import useDebounce from '@/hooks/useDebounce'
import { useEnterSubmit } from '@/libs/hooks/use-enter-submit'
import { useScrollAnchor } from '@/libs/hooks/use-scroll-anchor'
import { nanoid } from '@/libs/utils'
import { Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import { Fragment, useEffect, useState } from 'react'
import { LuMinus } from 'react-icons/lu'
import Textarea from 'react-textarea-autosize'

const MOCK_GARA = [
  {
    id: '1',
    services: 'Battery repair, tire replacement, headlight replacement',
    name: 'Gara 1',
    rating: 5
  },
  {
    id: '2',
    services: 'tire replacement, headlight replacement',
    name: 'Gara 2',
    rating: 3
  },
  {
    id: '3',
    services: 'headlight replacement',
    name: 'Gara 3',
    rating: 2
  }
]

const ChatWithAI = ({
  handleClose,
  isOpenChatModel
}: {
  isOpenChatModel: boolean
  handleClose: () => void
}) => {
  const [input, setInput] = useState('')
  const { submitUserMessage } = useActions()

  // const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [messages, setMessages] = useUIState()

  const debounceMessages = useDebounce(messages, 500)

  const isMobile = useMediaQuery('(max-width: 768px)')
  const { formRef, onKeyDown } = useEnterSubmit()

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  const [aiState] = useAIState()

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({
  //     behavior: 'instant'
  //   })
  // }

  // useEffect(() => {
  //   if (messages.length === 0) return

  //   scrollToBottom()
  // }, [debounceMessages])

  useEffect(() => {
    scrollToBottom()
  }, [input, debounceMessages])

  const handleSubmit = async (e: any) => {
    e?.preventDefault()
    setInput('')

    setMessages((prev: any[]) => [
      ...prev,
      {
        id: nanoid(),
        display: <UserMessage content={input} />
      }
    ])

    const responseMessage = await submitUserMessage(input)

    setMessages((prev: any[]) => [...prev, responseMessage])
  }

  if (!isOpenChatModel) return <Fragment />

  return (
    <div
      id="chatBoxRef"
      className="fixed bottom-2 right-2 bg-[#fcfcfc] rounded-2xl h-[450px] w-[350px] z-50 text-main chat-scroll overflow-hidden shadow-lg"
      style={{
        ...(isMobile && {
          left: '0.5rem',
          width: 'calc(100% - 1rem)'
        })
      }}
    >
      <div
        className="flex justify-between items-center p-3 bg-white fixed rounded-2xl w-[350px]"
        style={{
          ...(isMobile && {
            width: 'calc(100% - 1rem)'
          })
        }}
      >
        <div className="flex items-center gap-x-2">
          <img src="/logo/ai.png" alt="" className="w-[40px] h-[40px]" />
          <div className="text-base font-semibold">Trợ lý ô tô</div>
        </div>

        <div
          className="text-main text-2xl cursor-pointer hover:bg-[#e1e1e1] h-[30px] w-[30px] flex justify-center items-center rounded-full"
          onClick={handleClose}
        >
          <LuMinus />
        </div>
      </div>

      <div className="h-full pt-[64px]">
        <div
          className="px-3 overflow-y-auto"
          style={{
            height: '300px'
          }}
          ref={scrollRef}
        >
          {/* hereeeee */}
          {messages.length ? (
            <div ref={messagesRef}>
              {' '}
              {messages.map((message: any, index: number) => (
                <div key={message.id}>
                  {message.display}
                  {index < messages.length - 1 && <div className="my-4" />}
                </div>
              ))}
              <div ref={visibilityRef} />
            </div>
          ) : (
            <div className="flex flex-col items-center w-full mt-4 px-3 pt-5">
              <div className="text-base font-semibold">Xin chào bạn!</div>

              <div className="p-3 bg-ai w-full rounded-lg mt-2">
                <div className="p-3 rounded-md bg-white">
                  <div className="flex gap-x-2">
                    <div className="w-[30px]"></div>
                    <div className="opacity-50 text-sm">Trợ lý ô tô</div>
                  </div>

                  <div className="flex gap-x-2 mt-1">
                    <img
                      src="/logo/ai.png"
                      alt=""
                      className="w-[30px] h-[30px]"
                    />
                    <div className="text-sm">
                      Tôi là Trợ Lý AI sẵn sàng giải đáp thông tin và hỗ trợ vấn
                      đề về ô tô.
                      <div>Hãy để tôi giúp bạn ngay!</div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="filled"
                  color="linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%)"
                  radius="xs"
                  className="md:rounded-lg rounded-md h-8 w-full mt-2 border-none"
                  onClick={async () => {
                    setMessages((prev: any[]) => [
                      ...prev,
                      {
                        id: nanoid(),
                        display: <UserMessage content={'Xin chào'} />
                      }
                    ])

                    const responseMessage = await submitUserMessage('Xin chào')
                    setMessages((prev: any[]) => [...prev, responseMessage])
                  }}
                >
                  <div className="font-semibold  text-sm md:text-base">
                    Chat ngay
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div
            className="flex items-center z-1 min-h-[80px] py-2 px-3 gap-x-2 bg-white fixed bottom-[8px] md:w-[350px] rounded-2xl"
            style={{
              display: 'none',
              ...(isMobile && {
                width: 'calc(100% - 1rem)'
              }),
              ...(messages.length !== 0 && {
                display: 'flex'
              })
            }}
          >
            {/* <div className="flex items-center gap-x-1">
              <img src="/svg/picture.svg" alt="" />
              <img src="/svg/camera.svg" alt="" />
            </div> */}

            <div className="bg-[#f5f6fa] rounded-2xl w-full flex-1 h-auto py-2 max-h-60 flex px-2">
              <Textarea
                className="outline-none text-sm resize-none bg-transparent overflow-hidden flex-1"
                style={{
                  lineHeight: '1.1'
                }}
                placeholder="Aa"
                onChange={e => {
                  setInput(e.target.value)
                }}
                value={input}
                onKeyDown={onKeyDown}
              />

              <div
                className="w-[34px] h-[34px] bg-white rounded-md p-2 shadow-lg cursor-pointer"
                onClick={handleSubmit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
                </svg>
              </div>
            </div>

            {/* <div>
              <img src="/svg/u_more.svg" alt="" />
            </div> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatWithAI

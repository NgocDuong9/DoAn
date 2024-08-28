'use client'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import ChatWithAI from '../header/_components/ChatWithAI'
import { usePathname } from 'next/navigation'
import AuthButton from '../custom/button/auth-button'

interface AiChatContextProps {
  isOpenChatModel: boolean
  handleToggleChatModel: () => void
}

const AiChatContext = createContext<AiChatContextProps | null>(null)

export const AiChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenChatModel, setIsOpenChatModel] = useState(false)

  const pathname = usePathname()

  const handleToggleChatModel = () => {
    setIsOpenChatModel(!isOpenChatModel)
  }

  const contextValue = {
    isOpenChatModel,
    handleToggleChatModel
  }

  useEffect(() => {
    setIsOpenChatModel(false)
  }, [pathname])

  return (
    <AiChatContext.Provider value={contextValue}>
      {children}

      <ChatWithAI
        isOpenChatModel={isOpenChatModel}
        handleClose={handleToggleChatModel}
      />

      {!isOpenChatModel && !pathname.includes('login') && (
        <AuthButton onClick={() => setIsOpenChatModel(true)}>
          <div className="fixed bottom-4 right-4 cursor-pointer p-1 bg-white rounded-full shadow-lg z-[100]">
            <div
              className="flex items-center gap-x-2 rounded-full px-2 py-2"
              style={{
                background:
                  'linear-gradient(116.71deg, #52BAE6 16.74%, #A0F6FF 43.34%, #67F2D1 80.72%, #51C2A7 143.43%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))'
              }}
            >
              <img
                src="/svg/ai-logo.svg"
                alt=""
                className="w-[36px] h-[36px]"
              />
            </div>
          </div>
        </AuthButton>
      )}
    </AiChatContext.Provider>
  )
}

export const useAiChatContext = () => {
  const context = useContext(AiChatContext)

  if (!context) {
    throw Error('Forgot wrap children by AiChatProvider')
  }

  return context
}

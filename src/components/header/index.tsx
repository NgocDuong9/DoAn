'use client'

import { Box, Image, Stack } from '@mantine/core'
import { useState } from 'react'
import { IconChat, IconSearch, IconVoice } from '../icon'

import InputSearch from '@/app/search/input-search/InputSearch'
import { useAuth } from '../context/auth.context'
import BoxChat from './boxChat'
import HeaderBar from './header'
import classes from './header.module.css'
import ChatWithAI from './_components/ChatWithAI'
import { nanoid } from '@/libs/utils'
import { useAiChatContext } from '../context/ai.chat.context'
import AuthButton from '../custom/button/auth-button'
import Link from 'next/link'

const Header = () => {
  const [opened, setOpened] = useState(false)
  const { user } = useAuth()
  const { handleToggleChatModel } = useAiChatContext()
  // const [isOpenChatModel, setIsOpenChatModel] = useState(false);

  const handleFocus = () => {
    setOpened(true)
  }

  const handleBlur = (e: any) => {
    setOpened(true)
  }

  return (
    <>
      <HeaderBar type="landing-page" />

      {/* home */}
      <div className="pt-[80px] md:pt-[120px]">
        <Stack>
          <div className="flex-col mx-auto items-center justify-center gap-x-5 md:flex md:flex-row">
            <div className="text-[45px] md:text-[80px] font-bold text-white">
              TRỢ LÝ Ô TÔ
            </div>
            <div className="text-[34px] md:text-[40px] font-bold text-white">
              luôn bên bạn !
            </div>
          </div>
        </Stack>

        <div className="flex gap-y-2 w-full max-w-[1000px] mx-auto flex-col md:flex-row">
          <div
            className=" cursor-text w-full"
            onClick={() => {
              setOpened(true)
            }}
          >
            <div
              className="h-[60px] flex-1  p-2 md:px-3 md:py-5 md:h-[90px] mt-4 md:mt-0 gap-3 rounded-2xl flex items-center mx-auto"
              style={{
                backgroundImage: 'linear-gradient(90deg, #FFFFFF34, #FFFFFF49)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <IconSearch />
              <div className="text-white text-lg">Kho sản phẩm, dịch vụ...</div>
            </div>
          </div>
          <Link href={'/search?limit=9&page=1&sort=&type=GARAGE'}>
            <div
              className="h-[60px]  p-2 md:px-3 text-white px-4 text-lg md:py-5 md:h-[90px] md:mt-0 gap-3 rounded-2xl flex items-center text-nowrap  mx-4"
              style={{
                backgroundImage: 'linear-gradient(90deg, #FFFFFF34, #FFFFFF49)',
                backdropFilter: 'blur(10px)'
              }}
            >
              Danh sách gara
            </div>
          </Link>
        </div>
        {opened && (
          <InputSearch
            setShowDropdown={() => {
              setOpened(!opened)
            }}
            showDropdown={opened}
            user_id={user?.id}
          />
        )}
      </div>

      <div className="mt-[10px] md:mt-[80px]">
        <Box
          mx="auto"
          className="max-w-[382px] w-full h-[260px] relative flex items-center justify-center"
        >
          <div className="hidden md:block">
            <Box
              pos="absolute"
              top={0}
              left={-51}
              className={classes.iconWrapper}
            >
              <Box className={classes.iconChat}>
                <IconChat />
              </Box>
            </Box>
            <Box pos="absolute" top={0} left={0}>
              <BoxChat />
              {/* <Image src={'/background/boxchat.png'} alt="" /> */}
            </Box>
          </div>

          <div
            className="ml-0 md:ml-[50px] relative z-10 flex-col bg-[#ffffff4a] px-4 py-3 rounded-lg md:bg-transparent"
            // style={{
            //   backgroundImage: 'linear-gradient(90deg, #FFFFFF34, #FFFFFF49)',
            //   backdropFilter: 'blur(10px)'
            // }}
          >
            <div className="flex items-center gap-x-2">
              <div className="flex items-center gap-x-2 md:hidden">
                <img src="/logo/ai.png" alt="" className="w-[40px] h-[40px]" />
              </div>
              <div className="text-xl md:text-3xl text-white font-bold">
                Chat để giao việc
              </div>
            </div>
            <div className="text-sm md:text-base text-white max-w-[220px] mt-4 md:mt-8">
              Tạo yêu cầu công việc ngay cho chúng tôi
            </div>

            <AuthButton onClick={handleToggleChatModel}>
              <button className={classes.btnChat}>Chat ngay</button>
            </AuthButton>
          </div>
        </Box>
      </div>
    </>
  )
}

export default Header

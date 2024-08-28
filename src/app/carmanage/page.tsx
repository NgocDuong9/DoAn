'use client'
import FooterHome from '@/components/footer'
import HeaderBar from '@/components/header/header'
import { Box, Flex, Text } from '@mantine/core'
import CarManageBox from './CarManageBox'
import FormSellBody from './form/form-shell-body'
import FormEngine from './form/form-engine'
import FormOther from './form/form-other'
import Content from './Content'
import ModalEvalute from '@/components/custom/modal/modal-evalute'
import { useState } from 'react'

const CarManage = () => {
  const [run, setRun] = useState(false)

  return (
    <Box>
      {!run && <HeaderBar type="landing-page" />}
      <CarManageBox run={run} setRun={setRun} />
      {/* <div className="pt-[50px] md:pt-[100px]">
        <Box className="flex justify-center items-center flex-col">
          <Text className="lg:text-[48px] text-[26px] font-bold">
            Báo giá theo yêu cầu{' '}
          </Text>
          <Text className="lg:text-lg text-sm font-semibold">
            Vấn đề của bạn được lắng nghe và phản hồi tức thì
          </Text>
        </Box>
        <Flex className="lg:max-w-main flex-col lg:flex-row mx-auto gap-4 mt-12 md:px-6 px-3">
          <Box className="lg:flex-1 ">
            <FormSellBody />
          </Box>
          <Box className="flex-1">
            <FormEngine />
          </Box>
          <Box className="flex-1">
            <FormOther />
          </Box>
        </Flex>
      </div> */}
      <Content />

      <FooterHome />
    </Box>
  )
}

export default CarManage

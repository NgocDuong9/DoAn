'use client'
import { IconVoice } from '@/components/icon'
import {
  Box,
  Button,
  FileInput,
  Flex,
  Select,
  Text,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconMicrophone, IconPhotoPlus } from '@tabler/icons-react'
import React from 'react'

const customStyles = {
  input: {
    backgroundColor: '#F9F9FA' // Màu nền tùy chỉnh
  }
}

const FormEngine = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {}
  })
  return (
    <Box className="relative">
      <Box
        className="absolute inset-0 bg-white bg-opacity-80 flex justify-center  z-10"
        style={{
          borderRadius: '20px',
          backdropFilter: 'blur(5px)'
        }}
      >
        <Text className="text-3xl font-medium text-gray-700 mt-36">
          Sắp ra mắt
        </Text>
      </Box>
      <Box
        className="bg-white p-6 rounded-[20px] "
        style={{
          boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.10)'
        }}
      >
        <Text className="lg:text-[32px] text-2xl font-medium mb-2">
          Tạo yêu cầu máy động cơ
        </Text>
        <form>
          <Flex gap={12} direction={'column'}>
            <Select
              label="Chọn xe"
              placeholder="Chọn xe"
              data={['Toyota Camry 2.2', 'BMW X3']}
              size="md"
              variant="filled"
              key={form.key('car')}
              style={customStyles}
              radius="md"
              {...form.getInputProps('car')}
            />
            <Box className="relative">
              <TextInput
                label="Nhập yêu cầu chi tiết"
                placeholder="Nhập"
                size="md"
                variant="filled"
                radius="md"
                key={form.key('License plate')}
                {...form.getInputProps('License plate')}
              />
              <Box className="absolute right-4 top-9">
                <IconMicrophone size={20} color="#666666" />
              </Box>
            </Box>
            <Button
              w={'100%'}
              style={{
                background:
                  'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
              }}
              size="lg"
              radius={'md'}
              onClick={() => console.log(form.getValues())}
            >
              Gửi ngay
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  )
}

export default FormEngine

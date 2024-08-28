'use client'
import { changePasswordUser, validateOldPassword } from '@/apis/client/auth'
import { Box, Button, Flex, PasswordInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },

    validateInputOnBlur: true,

    validate: {
      oldPassword: value => {
        if (value.trim() === '') {
          return 'Vui lòng nhập mật khẩu cũ'
        }
        return null
      },
      newPassword: value => {
        if (value.length < 6) {
          return 'Mật khẩu mới phải có ít nhất 6 ký tự'
        }
        return null
      },
      confirmPassword: (value, values) => {
        if (value !== values.newPassword) {
          return 'Nhập lại mật khẩu không khớp'
        }
        return null
      }
    }
  })

  const handleSubmit = async (values: typeof form.values) => {
    if (loading) return
    if (form.isValid()) {
      setLoading(true)
      const isOldPasswordValid = await validateOldPassword(values.oldPassword)
      if (isOldPasswordValid) {
        const data = await changePasswordUser(values.newPassword)
        if (!data.error && data.data?.id) {
          notifications.show({ message: 'Đổi mật khẩu thành công' })
          form.reset()
        }
      } else {
        form.setFieldError('oldPassword', 'Mật khẩu cũ không chính xác')
      }
      setLoading(false)
    }
  }

  return (
    <Box className="bg-white md:p-6 p-2 rounded-[20px] md:max-w-[480px] mt-4 md:mt-0">
      <Text className="text-lg md:text-2xl font-medium text-[#333] mb-4">
        Đổi mật khẩu
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex gap={12} direction={'column'}>
          <PasswordInput
            label="Mật khẩu cũ"
            placeholder="Nhập mật khẩu cũ"
            size="md"
            variant="filled"
            radius="md"
            color={'#333'}
            labelProps={{
              className: 'text-md text-[#333]'
            }}
            {...form.getInputProps('oldPassword')}
          />

          <PasswordInput
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            size="md"
            variant="filled"
            radius="md"
            color={'#333'}
            labelProps={{
              className: 'text-md text-[#333]'
            }}
            {...form.getInputProps('newPassword')}
          />
          <PasswordInput
            label="Nhập lại mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            size="md"
            variant="filled"
            radius="md"
            color={'#333'}
            labelProps={{
              className: 'text-md text-[#333]'
            }}
            {...form.getInputProps('confirmPassword')}
          />

          <Button
            loading={loading}
            type="submit"
            w={'100%'}
            style={{
              background:
                'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
            }}
            size="sm"
            radius={'md'}
            className="border-none"
          >
            Lưu
          </Button>
        </Flex>
      </form>
    </Box>
  )
}

export default ChangePasswordForm

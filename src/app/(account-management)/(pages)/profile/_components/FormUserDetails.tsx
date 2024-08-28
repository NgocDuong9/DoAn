import { updateInfoUser } from '@/apis/client/users'
import { uploadFile } from '@/apis/storage'
import DateSelect from '@/app/(account-management)/(pages)/profile/_components/DateSelect'
import { filterObject } from '@/utils/objects'
import { Button, Flex, Image, Radio, Text, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import type { User } from '@supabase/supabase-js'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import 'dayjs/locale/vi'

interface ExtendedUser extends User {
  name?: string
  sex?: 'MALE' | 'FEMALE'
  birthday?: string
}

interface FormUserDetailsProps {
  user: ExtendedUser | null
  refetch: () => void
  isLoading?: boolean
  setEditMode: Dispatch<SetStateAction<boolean>>
  reviewImages: never[]
  setReview: Dispatch<SetStateAction<never[]>>
}

// Datepicker
function FormUserDetails({
  user,
  refetch,
  isLoading,
  setEditMode,
  reviewImages,
  setReview
}: FormUserDetailsProps) {
  const [loading, setLoading] = useState(false)
  const userName = user?.name ?? ''
  const gender = user?.sex ?? 'MALE'
  // const birthday = user?.birthday ?? new Date().toISOString()
  const initialValues = {
    name: userName,
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    sex: gender,
    birthday: user?.birthday ? new Date(user?.birthday) : ''
  }

  const form = useForm({
    initialValues: initialValues,
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      name: value => (!value.trim().length ? 'Tên không được để trống' : null),
      // email: value =>
      //   !/^\S+@\S+\.\S+$/.test(value) ? 'Email không hợp lệ' : null,
      phone: value =>
        !/^\d{10}$/.test(value) ? 'Số điện thoại không hợp lệ' : null
    }
  })

  useEffect(() => {
    if (user) {
      form.setInitialValues(initialValues)
      form.setValues(initialValues)
    }
  }, [user])

  async function handleSubmit(values: typeof form.values) {
    if (loading || !user?.id) return
    setLoading(true)
    try {
      const images = await Promise.all(
        reviewImages.map(image => uploadFile(image))
      )

      const dataPushed = {
        ...initialValues,
        ...values,
        birthday: values.birthday
          ? values.birthday
          : initialValues.birthday
            ? initialValues.birthday
            : null,
        //@ts-ignore
        avatar: images.length > 0 ? images[0]?.path : user.avatar
      }
      // console.log(dataPushed, values, initialValues)

      const update = await updateInfoUser({
        id: user.id,
        //@ts-ignore
        body: dataPushed
      }).then()

      // console.log(dataPushed, initialValues, values.birthday, 'update')

      if (update?.data) {
        setReview([])
        setEditMode(false)
        notifications.show({ message: 'Thay đổi thông tin thành công!' })
        refetch()
      }
    } finally {
      setLoading(false)
    }
  }

  function handleChangeGender(value: 'MALE' | 'FEMALE') {
    form.setFieldValue('sex', value)
    form.setValues(prev => ({ ...prev, sex: value }))
  }

  function handleChangeBirthday(value: Date) {
    const date = value?.toISOString() || initialValues.birthday
    if (date === initialValues.birthday) return
    form.setFieldValue('birthday', date)
    form.setValues(prev => ({ ...prev, birthday: date }))
  }

  return (
    <form className={'w-full'} onSubmit={form.onSubmit(handleSubmit)}>
      <Flex gap={12} direction={'column'}>
        <TextInput
          disabled={loading}
          label="Họ tên"
          placeholder="Nhập họ tên"
          size="md"
          variant="filled"
          radius="md"
          color={'#333'}
          labelProps={{
            className: 'text-md text-[#333]'
          }}
          {...form.getInputProps('name')}
        />

        {/* <TextInput
          disabled={loading}
          label="Email"
          placeholder="Nhập email"
          size="md"
          variant="filled"
          radius="md"
          color={'#333'}
          labelProps={{
            className: 'text-md text-[#333]'
          }}
          {...form.getInputProps('email')}
        /> */}
        <TextInput
          disabled={loading}
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          size="md"
          variant="filled"
          radius="md"
          color={'#333'}
          labelProps={{
            className: 'text-md text-[#333]'
          }}
          {...form.getInputProps('phone')}
        />
        <div className={'flex flex-col gap-2'}>
          <Text className={'text-md text-[#333] font-medium'}>Giới tính</Text>
          <div className={'flex gap-2'}>
            <Radio
              disabled={loading}
              name={'sex'}
              label="Nam"
              value={'MALE'}
              checked={form.getValues().sex === 'MALE'}
              className={'text-md text-[#333]'}
              {...form.getInputProps('sex')}
              onChange={e => handleChangeGender(e.target.value as 'MALE')}
            />
            <Radio
              disabled={loading}
              name={'sex'}
              label="Nữ"
              value={'FEMALE'}
              checked={form.getValues().sex === 'FEMALE'}
              className={'text-md text-[#333]'}
              {...form.getInputProps('sex')}
              onChange={e => handleChangeGender(e.target.value as 'FEMALE')}
            />
          </div>
        </div>
        {/* <p className="text-md text-[#333] font-medium">Ngày/tháng/năm sinh: </p> */}
        {/* <DateSelect
          loading={isLoading}
          disable={loading}
          value={initialValues.birthday}
          defaultDate={initialValues.birthday}
          onChange={handleChangeBirthday}
        /> */}
        <DateInput
          label={'  Ngày/tháng/năm sinh:'}
          disabled={loading}
          locale="vi"
          placeholder="Nhập ngày"
          valueFormat="DD/MM/YYYY"
          rightSection={<Image src={'/svg/calendar.svg'} />}
          className="w-full flex-1"
          size="md"
          variant="filled"
          radius="md"
          key={form.key('birthday')}
          {...form.getInputProps('birthday')}
        />
        <div className="flex gap-3">
          <Button
            type="submit"
            w={140}
            variant="outline"
            color="red"
            onClick={() => setEditMode(false)}
            size="sm"
            radius={'md'}
          >
            Huỷ
          </Button>
          <Button
            loading={loading}
            className="border-none"
            type="submit"
            w={'100%'}
            style={{
              background:
                'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
            }}
            size="sm"
            radius={'md'}
          >
            Lưu
          </Button>
        </div>
      </Flex>
    </form>
  )
}

export default FormUserDetails

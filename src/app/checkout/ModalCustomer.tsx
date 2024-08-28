import { getInfoUser, updateUserInfoBooking } from '@/apis/client/users'
import { useAuth } from '@/components/context/auth.context'
import {
  Button,
  Flex,
  Grid,
  Image,
  LoadingOverlay,
  Modal,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { phoneRegex } from '../forgot-password/confirm-pw/Validation'

interface PropsType {
  opened: boolean
  close: () => void
  selectedProds: string[]
  selectedInfo: Record<string, any>
  setSelectedInfo: Dispatch<SetStateAction<Record<string, any>>>
}

const ModalCustomer: React.FC<PropsType> = ({
  opened,
  close,
  selectedProds,
  selectedInfo,
  setSelectedInfo
}) => {
  const { userId } = useAuth()
  const [user, setUser] = useState<Record<string, any>>({})
  const [selected, setSelected] = useState<Record<string, any>>({})
  const [editIndex, setEditIndex] = useState<number | undefined>()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {},
    validate: {
      name: (value: string) => {
        if (!value || value.split(" ").length === 1) {
          return 'Họ và tên không hợp lệ'
        }
      },
      phone: (value: string) => {
        if (!phoneRegex.test(value)) {
          return 'Sai định dạng số điện thoại'
        }
      }
    }
  })

  useEffect(() => {
    selectedProds[0] && handleFetchInfo()
  }, [])

  // useEffect(() => {
  //   selectedInfo && setSelected(selectedInfo)
  // }, [selectedInfo])

  const handleFetchInfo = async (skipDefault?: boolean) => {
    try {
      const { data }: any = await getInfoUser()
      if (data) {
        const indexedData = {
          ...data,
          info_booking: data.info_booking.map((item: any, index: number) => ({
            ...item,
            index
          }))
        }

        setUser(indexedData)
        if (skipDefault) {
          setLoading(false)
          const newInfo = indexedData.info_booking.find(
            (_: any, idx: number) => idx === editIndex
          )
          editIndex === selectedInfo.index && setSelectedInfo(newInfo)
          editIndex === selected.index && setSelected(newInfo)
        } else {
          const defaultInfo =
            indexedData.info_booking.find((i: any) => i.default) ||
            indexedData.info_booking?.[0]
          setSelected(defaultInfo)
          setSelectedInfo(defaultInfo)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleShowForm = (record?: any) => {
    setShowForm(true)
    if (record) {
      setEditIndex(record.index)
      form.setValues({ name: record.name, phone: record.phone })
    } else {
      setEditIndex(undefined)
      form.reset()
    }
  }

  const handlePressCancel = () => {
    setEditIndex(undefined)
    setShowForm(false)
    form.reset()
  }

  const handleSaveEdit = async () => {
    const { hasErrors } = form.validate()
    if (!userId) return

    if (!hasErrors) {
      setLoading(true)
      const formData = form.getValues()
      const info_booking =
        editIndex! >= 0
          ? user.info_booking.map((i: any, idx: number) =>
              idx === editIndex ? { ...i, ...formData } : i
            )
          : [
              ...(user?.info_booking ?? []),
              {
                ...formData,
                index:
                  user?.info_booking?.[user?.info_booking?.length - 1]?.index +
                  1
              }
            ]
      try {
        const res = await updateUserInfoBooking({
          user_id: user?.id,
          info_booking
        })

        if (res?.data) {
          handleFetchInfo(true).then(handlePressCancel)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
  }

  const updateBookingInfoDefault = async (selectedIndex: number) => {
    try {
      setLoading(true)
      const newBookingInfo = user.info_booking.map((item: any, idx: number) => {
        if (selectedIndex !== item.index) {
          return {
            ...item,
            default: false
          }
        }

        return {
          ...item,
          default: true
        }
      })

      const res = await updateUserInfoBooking({
        user_id: user?.id,
        info_booking: newBookingInfo
      })

      if (res?.data) {
        handleFetchInfo(true).then(handlePressCancel)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleClose = (isSave?: boolean) => {
    close()
    isSave ? setSelectedInfo(selected) : setSelected(selectedInfo)
    setEditIndex(undefined)
    form.reset()
    setShowForm(false)
  }
  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      radius={20}
      size="auto"
      centered
    >
      <Flex
        gap="xs"
        direction="column"
        justify="center"
        className="md:p-[8px] p-1 relative"
      >
        <h1 className="md:text-2xl text-xl font-medium">
          Thông tin người đặt lịch
        </h1>

        {user?.info_booking?.length > 0 && (
          <div className="py-[5px] md:px-[20px] px-[10px] md:rounded-[20px] rounded-[10px] bg-[#F9F9FA] md:min-w-[699px] f-full">
            {user?.info_booking?.map((item: any, index: number) => (
              <Flex
                justify="space-between"
                align="center"
                className="md:my-[10px] my-1 md:gap-x-3 gap-x-1"
                key={index}
              >
                <div className="flex items-center gap-x-1 md:gap-x-2">
                  {selected.index === index && (
                    <Image src="/svg/gradient_check.svg" />
                  )}
                  <span
                    className={`${
                      selected.index === index ? 'gradientText' : 'ml-[34px]'
                    } md:text-base text-sm font-medium cursor-pointer`}
                    onClick={() => setSelected(item)}
                  >
                    {item.name} | {item.phone}
                  </span>
                  {item.default && (
                    <div className="h-[29px] text-[12px] bg-[#F1B44C] flex justify-center items-center px-[12px] rounded-[7px] text-white">
                      Mặc định
                    </div>
                  )}

                  {selected.index === index && !item.default && (
                    <div
                      className="ml-4 cursor-pointer"
                      onClick={() => {
                        updateBookingInfoDefault(selected.index)
                      }}
                    >
                      Chọn làm mặc định
                    </div>
                  )}
                </div>
                <div>
                  <Button
                    variant="transparent"
                    size="xs"
                    className="p-[0px]"
                    onClick={() => handleShowForm(item)}
                  >
                    <span className="gradientUnderline text-[16px] font-medium leading-[23px]">
                      Cập nhật
                    </span>
                  </Button>
                </div>
              </Flex>
            ))}
          </div>
        )}

        {showForm && (
          <form>
            <div className="mt-[8px] grid grid-cols-10 items-start gap-x-2">
              <div className="col-span-4">
                <TextInput
                  size="md"
                  variant="filled"
                  placeholder="Họ và tên"
                  radius="md"
                  key={form.key('name')}
                  {...form.getInputProps('name')}
                />
              </div>
              <div className="col-span-4">
                <TextInput
                  size="md"
                  variant="filled"
                  placeholder="Số điện thoại"
                  // hideControls
                  radius="md"
                  key={form.key('phone')}
                  {...form.getInputProps('phone')}
                />
              </div>

              <div className="col-span-2 -mt-2">
                <Flex direction="column">
                  <Button
                    variant="transparent"
                    size="xs"
                    className="p-[0px]"
                    onClick={handleSaveEdit}
                  >
                    <span className="gradientText md:text-base text-sm">
                      Lưu
                    </span>
                  </Button>
                  <Button
                    variant="transparent"
                    size="xs"
                    color="#FA4D4D"
                    className="p-[0px] md:text-base text-sm"
                    onClick={handlePressCancel}
                  >
                    Hủy
                  </Button>
                </Flex>
              </div>
            </div>
          </form>
        )}

        <Button
          leftSection={<Image src="/svg/gradient_add.svg" />}
          variant="transparent"
          className="p-[0px] w-fit"
          onClick={() => handleShowForm()}
        >
          <span className="gradientText text-[14px] leading-[18px]">
            Thêm mới người đặt lịch
          </span>
        </Button>

        <Grid>
          <Grid.Col span={3}>
            <Button
              variant="outline"
              color="#E52121"
              className="md:h-[48px] h-[38px] rounded-[10px]  md:text-base text-sm"
              fullWidth
              onClick={() => handleClose()}
            >
              Hủy
            </Button>
          </Grid.Col>
          <Grid.Col span={9}>
            <Button
              style={{
                background:
                  'linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)'
              }}
              className="md:h-[48px] h-[38px] rounded-[10px]  md:text-base text-sm w-full"
              radius="md"
              onClick={() => handleClose(true)}
            >
              Chọn
            </Button>
          </Grid.Col>
        </Grid>

        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
        />
      </Flex>
    </Modal>
  )
}

export default ModalCustomer

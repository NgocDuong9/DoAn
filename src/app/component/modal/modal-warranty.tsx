import { ProductType } from '@/apis/client/interface'
import { userDeleteWarranty, userGetWarranty } from '@/apis/client/warranty'
import { formatDate } from '@/utils/formatDate'
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Loader,
  Modal,
  Table,
  Text
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons-react'
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react'

interface Props {
  opened: boolean
  close: () => void
  open: () => void
  car: any
  type: ProductType
  refetch: () => Promise<void>
  // setRefetch: Dispatch<SetStateAction<boolean>>;
}

const ModalWarranty = ({
  opened,
  close,
  car,
  type,
  open,
  // setRefetch,
  refetch
}: Props) => {
  const [datas, setDatas] = useState<any>()
  const [idDelete, setIdDelete] = useState<any>()
  const [opendDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)

  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      const { data } = await userDeleteWarranty({ id: idDelete })
      closeDelete()
      refetch()
      notifications.show({ message: 'Xoá bảo hành thành công' })
    } catch (error) {
    } finally {
    }
  }

  const rows = useMemo(() => {
    const data = datas?.data?.map((item: any) => (
      <Table.Tr key={item.name}>
        <Table.Td>{item.code}</Table.Td>
        <Table.Td>{item.product_name}</Table.Td>
        <Table.Td>{item.count}</Table.Td>
        <Table.Td>{item.garage_name}</Table.Td>
        <Table.Td>{item.address}</Table.Td>
        <Table.Td>{formatDate(item.buy_date).fullTime}</Table.Td>
        <Table.Td>{item.duration}</Table.Td>
        <Table.Td>{formatDate(item?.expried_at).fullTime}</Table.Td>
        <Table.Td>{item.phone}</Table.Td>
        <Table.Td>
          <IconTrash
            color="red"
            onClick={() => {
              setIdDelete(item.id)
              openDelete()
            }}
          />
        </Table.Td>
      </Table.Tr>
    ))
    return data
    //   {
    //     name: "Mã bảo hành",
    //     span: 1,
    //     value: "code",
    //     data: datas?.data?.map((item: any) => item.code) || [],
    //   },
    //   {
    //     name: "Sản phẩm/Dịch vụ đi kèm",
    //     span: 2,
    //     value: "product_name",
    //     data: datas?.data?.map((item: any) => item.product_name) || [],
    //   },
    //   {
    //     name: "Số lượng",
    //     span: 1,
    //     value: "count",
    //     data: datas?.data?.map((item: any) => item.count) || [],
    //   },

    //   {
    //     name: "Địa chỉ",
    //     span: 2,
    //     value: "address",
    //     data: datas?.data?.map((item: any) => item.address) || [],
    //   },
    //   {
    //     name: "Ngày mua",
    //     span: 1,
    //     value: "buy_date",
    //     data: datas?.data?.map((item: any) => item.buy_date) || [],
    //   },
    //   {
    //     name: "Thời hạn bảo hành",
    //     span: 1,
    //     value: "duration",
    //     data: datas?.data?.map((item: any) => item.duration) || [],
    //   },
    //   {
    //     name: "Ngày hết hạn",
    //     span: 1,
    //     value: "expried_at",
    //     data: datas?.data?.map((item: any) => item.expried_at) || [],
    //   },
    //   {
    //     name: "Số điện thoại",
    //     span: 1,
    //     value: "phone",
    //     data: datas?.data?.map((item: any) => item.phone) || [],
    //   },

    //   {
    //     name: "",
    //     span: 1,
    //     value: "delete",
    //   },
    // ];
  }, [datas])

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const data = await userGetWarranty({ car_id: car.id, type: type })
        if (data) {
          setDatas(data)
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [car, refetch])

  const renderTitle = useMemo(() => {
    if (type === ProductType.LOP) return 'lốp'
    if (type === ProductType.AC_QUY) return 'ắc quy'
    if (type === ProductType.CUU_HO) return 'cứu hộ'
    if (type === ProductType.DO_XE) return 'độ xe'
    if (type === ProductType.PHU_TUNG) return 'phụ tùng'
  }, [type])

  return (
    <Modal
      withCloseButton={false}
      size={'100%'}
      opened={opened}
      onClose={close}
      radius={20}
      zIndex={100}
      className={'overflow-x-auto'}
      centered
    >
      <Text className="lg:text-[32px] text-[20px] font-medium text-center">
        Bảo hành {renderTitle}
      </Text>
      {!rows?.length ? (
        <Flex justify={'center'} align={'center'} mt={40}>
          <Text size="20px">Chưa có bảo hành</Text>
        </Flex>
      ) : !loading ? (
        <Table.ScrollContainer minWidth={400}>
          <Table className="">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="whitespace-nowrap">Mã bảo hành</Table.Th>
                <Table.Th className="whitespace-nowrap">
                  Sản phẩm/Dịch vụ
                </Table.Th>
                <Table.Th className="whitespace-nowrap">Số lượng</Table.Th>
                <Table.Th className="whitespace-nowrap">
                  Đơn vị bảo hành
                </Table.Th>
                <Table.Th className="whitespace-nowrap">Địa chỉ</Table.Th>
                <Table.Th className="whitespace-nowrap">Ngày mua</Table.Th>
                <Table.Th className="whitespace-nowrap">
                  Thời hạn bảo hành
                </Table.Th>
                <Table.Th className="whitespace-nowrap">Ngày hết hạn</Table.Th>
                <Table.Th className="whitespace-nowrap">Số điện thoại</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : (
        <Flex mih={200} justify={'center'} align={'center'}>
          <Loader />
        </Flex>
      )}
      <Button
        radius={10}
        className=" h-[42px] md:w-[200px] text-[16px] float-right my-6 border-none"
        style={{
          background:
            'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
        }}
        onClick={close}
      >
        Đóng
      </Button>
      <Modal opened={opendDelete} onClose={closeDelete} withCloseButton={false}>
        <Flex gap={24} direction={'column'}>
          <Text className="md:text-[36px] text-2xl font-medium">
            Xoá bảo hành
          </Text>
          <Text>
            Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xoá bảo
            hành?
          </Text>
          <Flex gap={12} className="justify-end">
            <Button
              w={'100%'}
              radius={10}
              variant="outline"
              color="#52BAE6"
              className="md:h-[48px]"
              onClick={closeDelete}
            >
              <Text className="text-[16px] text-[#52BAE6] font-medium">
                Quay lại
              </Text>
            </Button>
            <Button
              w={'100%'}
              className="md:h-[48px] border-none"
              variant="filled"
              color="red"
              radius={10}
              onClick={() => handleDelete()}
            >
              <Text className="text-[16px] text-white font-medium">Xoá</Text>
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </Modal>
  )
}

export default ModalWarranty

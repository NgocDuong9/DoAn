import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Loader,
  Modal,
  Text
} from '@mantine/core'
import { Car, InfoCar } from '../CarManageBox'
import { Dispatch, SetStateAction, useState } from 'react'

import ModalEdit from '../modal/modal-edit'
import { deleteCar } from '@/apis/managecar'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/navigation'
import { IconEye } from '@tabler/icons-react'
import Link from 'next/link'
import { getFileUrl, onErrorHandler, onErrorHandlerCar } from '@/utils/images'
import { notifications } from '@mantine/notifications'

interface Props {
  car: Car
  infoCar: InfoCar[]
  refech: () => Promise<void>
  setPerPage: Dispatch<SetStateAction<number>>
}

const BoxCar = ({ car, infoCar, refech, setPerPage }: Props) => {
  const info = infoCar.find(item => item.name === car.name)
  const [opendDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)
  const [edit, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      const { data } = await deleteCar(id)
      closeDelete()
    } catch (error) {
    } finally {
      notifications.show({ message: 'Xoá xe thành công' })
      setLoading(false)
      setPerPage(0)
      refech()
    }
  }

  console.log({ info })

  // const router = useRouter()
  return (
    <>
      <Flex
        direction={'column'}
        gap={15}
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.17) 100%)',
          borderRadius: 27,
          backdropFilter: 'blur(19px)'
        }}
        className="min-w-[200px] h-full md:w-[380px] py-2 md:py-6 px-2 md:px-6 justify-evenly"
      >
        <div className="flex justify-between flex-col md:flex-row items-center md:items-end">
          <div className="flex flex-col items-center md:items-stretch h-full">
            <Image
              src={info ? getFileUrl(info.image) : '/background/gt3.png'}
              onError={onErrorHandlerCar}
              className="md:max-w-[270px] md:w-[240px] md:max-h-[70px] max-h-[50px] max-w-[128px] object-contain"
            />
            <Flex gap={12} className="items-center mt-2">
              <div className="max-w-10">
                {car?.carType?.brand?.image && (
                  <Image
                    src={
                      car?.carType?.brand?.image
                        ? getFileUrl(car?.carType?.brand?.image)
                        : '/background/bmw.png'
                    }
                    onError={onErrorHandler}
                    className="h-[20px] md:h-[40px] object-contain"
                  />
                )}
              </div>
              <Text className="text-sm md:text-lg font-medium text-white whitespace-pre-wrap line-clamp-1">
                {car.name}
              </Text>
            </Flex>
          </div>
          <div className="flex flex-row md:flex-col gap-2 md:gap-1 justify-center mt-2 mb:mt-0">
            <Link
              href={`/carmanage/detail?id=${car.id}`}
              // className="hidden md:block"
            >
              <Box
                className="cursor-pointer  flex justify-center items-center w-9 h-9  top-5 right-5 rounded-[10px] bg-[#cfcfcf42] "
                style={{
                  // backgroundColor:
                  //   'linear-gradient(180deg, rgba(4, 4, 4, 0.56) 0%, rgba(26, 26, 26, 0.42) 100%)',
                  backdropFilter: ' blur(2px)'
                }}
              >
                <IconEye color="#fff" />
              </Box>
            </Link>
            <Box
              className=" cursor-pointer  flex justify-center items-center w-9 h-9  top-5 right-5 rounded-[10px] bg-[#cfcfcf42]"
              style={{
                // backgroundColor:
                //   'linear-gradient(180deg, rgba(4, 4, 4, 0.56) 0%, rgba(26, 26, 26, 0.42) 100%)',
                backdropFilter: ' blur(2px)'
              }}
              onClick={openDelete}
            >
              <Image src={'/svg/delete.svg'} />
            </Box>
            <Box
              className=" cursor-pointer flex justify-center items-center w-9 h-9  top-5 right-5 rounded-[10px] bg-[#cfcfcf42]"
              style={{
                // backgroundColor:
                //   'linear-gradient(180deg, rgba(4, 4, 4, 0.56) 0%, rgba(26, 26, 26, 0.42) 100%)',
                backdropFilter: ' blur(2px)'
              }}
              onClick={open}
            >
              <Image src={'/svg/edit.svg'} />
            </Box>
          </div>
        </div>

        <Modal
          opened={opendDelete}
          onClose={closeDelete}
          withCloseButton={false}
        >
          <Flex gap={24} direction={'column'}>
            <Text className="md:text-[32px] text-[24px] text-center font-medium">
              Xoá xe
            </Text>
            <Text>
              Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xoá xe?
            </Text>
            <Divider />
            <Flex gap={12} className="justify-end" pt={12}>
              <Button
                w={'100%'}
                radius={10}
                variant="outline"
                color="#52BAE6"
                h={42}
                onClick={closeDelete}
              >
                <Text className="text-[16px] text-[#52BAE6] font-medium">
                  Quay lại
                </Text>
              </Button>
              <Button
                w={'100%'}
                h={42}
                variant="filled"
                color="red"
                onClick={() => handleDelete(car.id)}
              >
                {!loading ? (
                  <Text className="text-[16px] text-white font-medium">
                    Xoá
                  </Text>
                ) : (
                  <Loader color="white" />
                )}
              </Button>
            </Flex>
          </Flex>
        </Modal>

        <ModalEdit close={close} opened={edit} refech={refech} car={car} />
      </Flex>
    </>
  )
}

export default BoxCar

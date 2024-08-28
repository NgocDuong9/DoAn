import { navigate } from '@/apis/auth'
import { deleteCar } from '@/apis/managecar'
import { Button, Flex, Loader, Modal, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import React, { useState } from 'react'

interface Props {
  opendDelete: boolean
  closeDelete: () => void
  refetch: () => Promise<void>
  id: string
}

const ModalDeleteCar = ({ opendDelete, closeDelete, id }: Props) => {
  const [loading, setLoading] = useState(false)
  const handleDelete = async () => {
    try {
      const { data } = await deleteCar(id)
      closeDelete()
      navigate('/carmanage')
    } catch (error) {
    } finally {
      notifications.show({ message: 'Xoá xe thành công' })
      setLoading(false)
    }
  }
  return (
    <Modal opened={opendDelete} onClose={closeDelete} withCloseButton={false}>
      <Flex gap={12} direction={'column'}>
        <Text className="md:text-[32px] text-[24px] text-center font-medium">
          Xoá xe
        </Text>
        <Text>
          Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xoá xe?
        </Text>
        <Flex gap={12} className="justify-end">
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
            radius={10}
            onClick={() => handleDelete()}
          >
            {!loading ? (
              <Text className="text-[16px] text-white font-medium">Xoá</Text>
            ) : (
              <Loader color="white" />
            )}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default ModalDeleteCar

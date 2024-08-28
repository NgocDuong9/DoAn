import { Button, Flex, Image, Modal, rem } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

interface PropsType {
  opened: boolean
  close: () => void
  refetch: () => Promise<void>
  // setRefetch: Dispatch<SetStateAction<boolean>>;
}

const ModalSuccess: React.FC<PropsType> = ({ opened, close, refetch }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      radius={20}
      size="532px"
      centered
      closeOnClickOutside={false}
    >
      <Flex
        gap="xs"
        direction="column"
        align="center"
        justify="center"
        className="p-[20px]"
      >
        <Image src="/svg/checkout_success.svg" w={272} />
        <h3 className="md:text-[36px] text-[20px] font-medium">
          Tạo bảo hành thành công
        </h3>

        <Flex gap={24} className="mt-[5px] w-full">
          <Button
            radius={10}
            className="h-[48px] w-full text-[16px] float-right"
            style={{
              background:
                'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
            }}
            onClick={() => {
              close()
              refetch()
            }}
          >
            Đóng
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default ModalSuccess

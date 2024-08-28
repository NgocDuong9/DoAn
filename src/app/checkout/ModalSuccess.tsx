import { Button, Flex, Image, Modal, rem } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PropsType {
  opened: boolean
  close: () => void
  code: string
}

const ModalSuccess: React.FC<PropsType> = ({ opened, close, code }) => {
  const router = useRouter()

  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      radius={20}
      size="auto"
      centered
      closeOnClickOutside={false}
    >
      <Flex
        gap="xs"
        direction="column"
        align="center"
        justify="center"
        className="p-[8px]"
      >
        <Image src="/svg/checkout_success.svg" w={272} />
        <h3 className="md:text-2xl text-lg font-medium">Đặt lịch thành công</h3>
        <p className="text-[#5F6C72] text-base md:text-sm text-center">
          Chúc mừng bạn đã đặt lịch thành công. Mã đặt lịch của bạn:{' '}
          <span className="gradientText font-medium">{code}</span>
        </p>
        <Flex gap="xs" className="mt-[5px]">
          <Link href={'/'}>
            <Button
              radius={10}
              className="md:h-[48px] h-[38px] md:min-w-[241px] min-w-[100px] md:text-base text-sm float-right"
              styles={{
                root: {
                  padding: rem(2),
                  border: 0,
                  backgroundImage:
                    'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)'
                },
                inner: {
                  background: 'var(--mantine-color-body)',
                  color: 'var(--mantine-color-text)',
                  borderRadius: 9,
                  paddingLeft: 'var(--mantine-spacing-md)',
                  paddingRight: 'var(--mantine-spacing-md)'
                },
                label: {
                  backgroundImage:
                    'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }
              }}
            >
              Quay về trang chủ
            </Button>
          </Link>
          <Link href={`/orders/${code}`}>
            <Button
              style={{
                background:
                  'linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)'
              }}
              className="md:h-[48px] h-[38px] md:min-w-[241px] min-w-[100px] md:text-base text-sm border-none"
              radius="md"
            >
              Xem lịch đã đặt
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default ModalSuccess

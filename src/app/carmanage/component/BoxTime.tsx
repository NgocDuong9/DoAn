import { Flex, Text } from '@mantine/core'

interface Props {
  title: string
  time: string
  wfull?: boolean
}

const BoxTime = ({ title, time, wfull }: Props) => {
  function daysRemaining(targetDateStr: string): number {
    const today = new Date()
    const targetDate = new Date(targetDateStr)
    const diffInMs = targetDate.getTime() - today.getTime()
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays < 1) {
      return 0
    }
    return diffInDays
  }

  return (
    <>
      <Flex
        direction={'column'}
        gap={15}
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.17) 100%)',
          borderRadius: 27,
          padding: 24,
          backdropFilter: 'blur(19px)',
          boxShadow: '0px 4px 50px 0px rgba(0, 0, 0, 0.05)'
        }}
        className={`min-w-[156px] min-h-[156px] justify-center items-center hidden lg:block ${
          wfull && 'w-full'
        }`}
      >
        <Text
          size="20px"
          className={`${!wfull && 'text-white'} text-center font-semibold`}
        >
          {title}
        </Text>
        <Flex className="items-end mt-6 justify-center">
          <Text
            size="48px"
            className="text-transparent rounded-lg font-extrabold"
            style={{
              background:
                'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color:': 'transparent'
            }}
          >
            {daysRemaining(time)}
          </Text>
          <Text className={`${!wfull && 'text-white'} -mt-4`}>Ngày</Text>
        </Flex>
      </Flex>
      <Flex
        direction={'column'}
        gap={15}
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.17) 100%)',
          borderRadius: 15,
          padding: 24,
          backdropFilter: 'blur(19px)',
          boxShadow: '0px 4px 50px 0px rgba(0, 0, 0, 0.05)'
        }}
        className={`min-w-[121px] h-[74px] justify-center lg:hidden items-center `}
      >
        <Text size="12px" className={`${!wfull && 'text-white'} font-semibold`}>
          {title}
        </Text>
        <Flex className="items-end" gap={6}>
          <Text
            size="20px"
            className="text-transparent rounded-lg font-extrabold"
            style={{
              background:
                'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color:': 'transparent'
            }}
          >
            {daysRemaining(time)}
          </Text>
          <Text className={`${!wfull && 'text-white'} text-[14px] -mt-4`}>
            Ngày
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

export default BoxTime

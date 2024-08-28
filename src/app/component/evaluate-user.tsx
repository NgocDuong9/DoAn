import { getFileUrl } from '@/utils/images'
import { Avatar, Box, Image, Rating, Text } from '@mantine/core'
import dayjs from 'dayjs'

const EvaluateUser = ({ data }: { data: any }) => {
  // const [like, setLike] = useState(false)

  const getRatingAverage = () => {
    // neu la lop
    if (data.type === 'LOP') {
      return (
        Object.entries(data?.detail).reduce(
          (acc: number, [key, value]: any) => {
            return (acc += value)
          },
          0
        ) / (Object.entries(data?.detail).length ?? 1)
      )
    }

    return data.rating
  }

  return (
    <Box className="flex flex-col gap-2">
      <Box className="flex items-center gap-2 justify-between">
        <Box className="flex gap-3">
          <Avatar
            src={getFileUrl(data?.users?.avatar)}
            alt="avatar"
            size="42px"
          />
          <Box>
            <Text className="font-medium">{data?.users?.name}</Text>
            <Text size="12px" className="text-[#3D3D3D]">
              {dayjs(data?.created_at).format('DD/MM/YYYY')}
            </Text>
          </Box>
        </Box>
        <Rating fractions={4} value={getRatingAverage() ?? 5} readOnly />
      </Box>

      <Box className=" flex gap-4">
        {data?.image?.map((item: string) => {
          return (
            <Image
              radius="md"
              src={getFileUrl(item) ?? ''}
              className="w-[100px] h-[100px] min-w-[100px] object-cover"
            />
          )
        })}
      </Box>
      {data.type === 'LOP' && (
        <Box className="flex flex-col gap-2">
          <Box className="flex justify-between w-[180px] items-center">
            <Text size="14px">Độ êm</Text>
            <Rating
              fractions={4}
              value={data?.detail?.smoothness ?? 5}
              readOnly
            />
          </Box>
          <Box className="flex justify-between w-[180px] items-center">
            <Text size="14px">Độ ồn</Text>
            <Rating fractions={4} value={data?.detail?.noise ?? 5} readOnly />
          </Box>
          <Box className="flex justify-between w-[180px] items-center">
            <Text size="14px">Độ bền</Text>
            <Rating
              fractions={4}
              value={data?.detail?.reliability ?? 5}
              readOnly
            />
          </Box>
        </Box>
      )}
      <Text size="14px" className="leading-5">
        {data?.content}
      </Text>
      {/* {like ? (
        <div className="flex gap-2">
          <IconThumbUpFilled
            onClick={() => setLike(false)}
            className="cursor-pointer"
          />{' '}
          2
        </div>
      ) : (
        <div className="flex gap-2">
          {' '}
          <IconThumbUp
            onClick={() => setLike(true)}
            className="cursor-pointer"
          />{' '}
          1
        </div>
      )} */}
    </Box>
  )
}

export default EvaluateUser

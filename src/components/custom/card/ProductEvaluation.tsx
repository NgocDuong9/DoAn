import { getFileUrl } from '@/utils/images'
import { Box, Flex, Grid, Image, Rating, Text, Textarea } from '@mantine/core'
import dayjs from 'dayjs'

interface ProductEvaluationProps {
  item: any
  index: number
  evaluation: any
  renderContent: (value: number) => string | undefined
  handleEvaluationChange: (index: number, key: string, value: any) => void
}

const ProductEvaluation: React.FC<ProductEvaluationProps> = ({
  item,
  index,
  evaluation,
  renderContent,
  handleEvaluationChange
}) => {
  return (
    <Flex direction={'column'} gap={24} key={index}>
      <Flex gap={26} w={'100%'} className="">
        <Image
          src={getFileUrl(item?.product?.detail_info?.images?.[0])}
          alt="Product Image"
          className="w-[100px] h-[100px] rounded-md"
        />
        <Box>
          <Text className="md:text-[18px] text-[16px] font-medium text-gray-700">
            {item?.product?.detail_info?.name}
          </Text>
          {item?.product?.sell_info?.classifies?.[0]?.manufacture && (
            <Text className="text-sm text-[#333]">
              Năm sản xuất:{' '}
              {item?.product?.sell_info?.classifies?.[0]?.manufacture}
            </Text>
          )}
          {item?.order?.time.order_time_without_format && (
            <Text className="text-sm text-[#333]">
              Ngày mua:{' '}
              {dayjs(item?.order?.time.order_time_without_format).format(
                'DD/MM/YYYY'
              )}
            </Text>
          )}
        </Box>
      </Flex>
      <Box>
        <Grid align={'center'} className="md:w-[60%] w-[90%]">
          <Grid.Col span={3}>
            <Text className="text-[#333] flex-2">Độ êm</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Rating
              value={evaluation.reliability || 0}
              onChange={value =>
                handleEvaluationChange(index, 'reliability', value)
              }
              className="flex-1"
            />
          </Grid.Col>
          <Grid.Col span={5}>
            <Text className="flex-3 text-[#FAB007]">
              {renderContent(evaluation.reliability || 0)}
            </Text>
          </Grid.Col>
        </Grid>
        <Grid align={'center'} className="md:w-[60%] w-[90%]">
          <Grid.Col span={3}>
            <Text className="text-[#333] flex-2">Độ bền</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Rating
              value={evaluation.smoothness || 0}
              onChange={value =>
                handleEvaluationChange(index, 'smoothness', value)
              }
              className="flex-1"
            />
          </Grid.Col>
          <Grid.Col span={5}>
            <Text className="flex-3 text-[#FAB007]">
              {renderContent(evaluation.smoothness || 0)}
            </Text>
          </Grid.Col>
        </Grid>
        <Grid align={'center'} className="md:w-[60%] w-[90%]">
          <Grid.Col span={3}>
            <Text className="text-[#333] flex-2">Độ ồn</Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Rating
              value={evaluation.noise || 0}
              onChange={value => handleEvaluationChange(index, 'noise', value)}
              className="flex-1"
            />
          </Grid.Col>
          <Grid.Col span={5}>
            <Text className="flex-3 text-[#FAB007]">
              {renderContent(evaluation.noise || 0)}
            </Text>
          </Grid.Col>
        </Grid>
      </Box>
      <Box>
        <Textarea
          size="md"
          placeholder="Hãy chia sẻ cảm nghĩ của bạn về sản phẩm này"
          value={evaluation.content || ''}
          onChange={event =>
            handleEvaluationChange(index, 'content', event.currentTarget.value)
          }
        />
      </Box>
    </Flex>
  )
}

export default ProductEvaluation

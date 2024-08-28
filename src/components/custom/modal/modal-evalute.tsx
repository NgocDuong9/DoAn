'use client'
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Modal,
  Rating,
  Text,
  Textarea
} from '@mantine/core'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import ProductEvaluation from '../card/ProductEvaluation'
import MutipleUploadImage from '@/components/image/MutipleUploadImage'
import { uploadFile } from '@/apis/storage'
import { postNewReview } from '@/apis/client/review'
import { ObjectTypeReview } from '@/apis/client/interface'
import { notifications } from '@mantine/notifications'
import { userCancelReviewProduct } from '@/apis/client/order'

interface PropsType {
  opened: boolean
  close: () => void
  data: any[]
}

const ModalEvalute: React.FC<PropsType> = ({ opened, close, data }) => {
  const renderContent = (value: number) => {
    if (value === 1) return 'Tệ'
    if (value === 2) return 'Không hài lòng'
    if (value === 3) return 'Bình thường'
    if (value === 4) return 'Tuyệt vời'
    if (value === 5) return 'Rất tuyệt vời'
    return
  }

  const [reviewImages, setReviewImages] = useState([])
  const [reviewAudios, setReviewAudios] = useState([])

  const [evaluations, setEvaluations] = useState<any[]>([])

  useEffect(() => {
    if (data) {
      const initialEvaluations = data.map(item => ({
        reliability: 5,
        smoothness: 5,
        noise: 5,
        content: '',
        order_id: item?.order.id,
        garage_id: item?.order.garage.id,
        user_id: item?.order.user_id,
        product_id: item.product_id,
        productadmin_id: item.product.product_id
      }))
      setEvaluations(initialEvaluations)
    }
  }, [data])

  function countRatings(ratings: number[]): { [key: string]: number } {
    const result: { [key: string]: number } = {}
    ratings.forEach(rating => {
      const key = `count_rating_${rating}`
      if (result[key]) {
        result[key]++
      } else {
        result[key] = 1
      }
    })

    return result
  }

  const handleEvaluationChange = (index: number, key: string, value: any) => {
    const newEvaluations = [...evaluations]
    newEvaluations[index][key] = value
    setEvaluations(newEvaluations)
  }
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    // console.log('Evaluations:', evaluations)
    // Handle submit logic here
    setLoading(true)
    try {
      const images = await Promise.all(
        reviewImages.map(image => uploadFile(image))
      )
      const audios = await Promise.all(
        reviewAudios.map(video => uploadFile(video))
      )

      const ratings = countRatings([
        evaluations[0].reliability,
        evaluations[0].smoothness,
        evaluations[0].noise
      ])

      const newValue = {
        order_id: evaluations[0].order_id,
        garage_id: evaluations[0].garage_id,
        user_id: evaluations[0].user_id,
        content: evaluations[0].content,
        detail: {
          reliability: evaluations[0].reliability,
          smoothness: evaluations[0].smoothness,
          noise: evaluations[0].noise
        },
        image: images.map(item => item?.path),
        video: audios.map(item => item?.path)?.[0] ?? '',
        type: ObjectTypeReview.LOP,
        product_id: evaluations[0].product_id,
        productadmin_id: evaluations[0].productadmin_id,
        ...ratings
      }

      // @ts-ignore
      const post = await postNewReview({ body: [newValue] })
      if (post.data) {
        notifications.show({ message: 'Đánh giá thành công' })
        close()
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleClose = async () => {
    try {
      await userCancelReviewProduct({ orderItemIds: data.map(item => item.id) })
    } catch (error) {
    } finally {
      close()
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={() => handleClose()}
      withCloseButton={false}
      radius={20}
      size="600px"
      centered
      closeOnClickOutside={false}
    >
      <Flex gap="xs" direction="column" align="center" justify="center">
        <Text className="md:text-[26px] text-[16px] mb-2 font-medium text-center">
          Bạn có hài lòng với sản phẩm này không?
        </Text>
        {data?.map((item: any, index: number) => (
          <ProductEvaluation
            key={index}
            item={item}
            index={index}
            evaluation={evaluations[index] || {}}
            renderContent={renderContent}
            handleEvaluationChange={handleEvaluationChange}
          />
        ))}
      </Flex>

      <div className="mt-5 md:mx-7 flex gap-x-2">
        <MutipleUploadImage
          files={reviewImages}
          setFiles={(newFiles: any) => {
            setReviewImages(newFiles)
          }}
          icon="/svg/image-icon.svg"
          acceptType="image"
        />
        <MutipleUploadImage
          files={reviewAudios}
          setFiles={(newFiles: any) => {
            setReviewAudios(newFiles)
          }}
          placeholder="Thêm video"
          size={1}
          icon="/svg/video.svg"
          acceptType="video"
        />
      </div>

      <Box className="gap-2.5 flex md:mt-4 mt-5 flex-wrap content-start justify-end">
        <Button
          variant="outline"
          color="#52BAE6"
          onClick={() => handleClose()}
          className="md:w-[190px] flex-1 md:flex-none md:rounded-lg rounded-md md:h-12 h-8"
        >
          <Text className="font-semibold text-sm md:text-base">Quay lại</Text>
        </Button>
        <Button
          variant="filled"
          color="linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%)"
          radius="xs"
          loading={loading}
          className="md:w-[190px] flex-1 md:flex-none md:rounded-lg border-none rounded-md md:h-12 h-8"
          onClick={handleSubmit}
        >
          <Text className="font-semibold text-sm md:text-base">Hoàn thành</Text>
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalEvalute

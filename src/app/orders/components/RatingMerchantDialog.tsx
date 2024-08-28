'use client'
import { ObjectTypeReview } from '@/apis/client/interface'
import { getReviewOrderItem, postNewReview } from '@/apis/client/review'
import { uploadFile } from '@/apis/storage'
import MutipleUploadImage from '@/components/image/MutipleUploadImage'
import { IOrder } from '@/types/order'
import { getFileUrl } from '@/utils/images'
import { Button, Modal, Rating } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const RatingMerchantDialog = ({
  open,
  orderSelected,
  onClose,
  onSuccess,
  view = false
}: {
  open: boolean
  onClose?: () => void
  orderSelected: IOrder | null
  onSuccess?: () => void
  view?: boolean
}) => {
  const [reviewImages, setReviewImages] = useState([])
  const [reviewAudios, setReviewAudios] = useState([])
  const [reviewText, setReviewText] = useState<string>('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)

  const isMobile = useMediaQuery('(max-width: 768px)')

  const renderType = (s: string[]) => {
    if (s.includes('SAN_PHAM')) {
      return ObjectTypeReview.LOP
    }
    return ObjectTypeReview.DICH_VU
  }

  const handleRating = async () => {
    try {
      setLoading(true)
      const images = await Promise.all(
        reviewImages.map(image => uploadFile(image))
      )
      const audios = await Promise.all(
        reviewAudios.map(video => uploadFile(video))
      )
      const reviewDV = orderSelected?.orderItem
        .map(item => {
          const type = renderType(item.product.array_fields)
          if (type === ObjectTypeReview.DICH_VU) {
            return {
              content: reviewText,
              image: images.map(item => item?.path),
              video: audios.map(item => item?.path)?.[0] ?? '',
              rating: rating,
              [`count_rating_${rating}`]: 1,
              type: ObjectTypeReview.DICH_VU,
              user_id: orderSelected?.user_id,
              order_id: orderSelected?.id,
              product_id: item.product_id,
              productadmin_id: item.product.product_id,
              garage_id: orderSelected?.garage.id
            }
          }
        })
        .filter(Boolean)

      const reviewGR = [
        {
          content: reviewText,
          image: images.map(item => item?.path),
          video: audios.map(item => item?.path)?.[0] ?? '',
          rating: rating,
          [`count_rating_${rating}`]: 1,
          type: ObjectTypeReview.GARAGE,
          user_id: orderSelected?.user_id,
          order_id: orderSelected?.id,
          garage_id: orderSelected?.garage.id
        }
      ]

      //@ts-ignore
      const newData = [...reviewGR, ...reviewDV]
      console.log(newData, 'orrdrrrr')

      const post = await postNewReview({ body: newData })
      if (!post) return
      notifications.show({ message: 'Đánh giá thành công' })
      onSuccess && onSuccess()
      onClose && onClose()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  function getHighestRating(review: any): number {
    const ratings = [
      review.count_rating_1,
      review.count_rating_2,
      review.count_rating_3,
      review.count_rating_4,
      review.count_rating_5
    ]

    for (let i = ratings.length - 1; i >= 0; i--) {
      if (ratings[i] > 0) {
        return i + 1
      }
    }

    return 0
  }

  useEffect(() => {
    if (!open || !view) {
      return
    }

    setReviewText(orderSelected?.review[0].content)
    setRating(getHighestRating(orderSelected?.review[0]))
  }, [open])

  const handleClose = () => {
    onClose && onClose()
    setRating(5)
    setReviewText('')
    setReviewImages([])
    setReviewAudios([])
  }
  const renderContent = (value: number) => {
    if (value === 1) return 'Tệ'
    if (value === 2) return 'Không hài lòng'
    if (value === 3) return 'Bình thường'
    if (value === 4) return 'Tuyệt vời'
    if (value === 5) return 'Rất tuyệt vời'
    return
  }

  return (
    <Modal
      opened={open}
      onClose={handleClose}
      centered
      withCloseButton={false}
      radius={20}
      size={isMobile ? 'xl' : 'auto'}
    >
      <div className="text-2xl text-main font-semibold md:min-w-[500px] mb-2">
        Đánh giá gara
      </div>

      <div className="flex items-center gap-x-5">
        <Image
          src={
            getFileUrl(orderSelected?.garage.avatar) ?? '/background/carbg.png'
          }
          // src={"https://zhxqbnaoeohcryrbemqx.supabase.co/storage/v1/object/public/images/medoh7cycxq8ah2g"}
          // src={getFileUrl("medoh7cycxq8ah2g")}
          alt="logo-main"
          width={100}
          height={100}
          className="object-cover rounded-full aspect-square"
        />

        {/* <div>
          <div className="text-main text-lg font-semibold">
            {orderSelected?.garage.name}
          </div>
          <div className="mt-2 px-3 py-1 rounded-md bg-[#F1B44C] flex justify-center items-center text-white text-sm font-semibold w-fit">
            Top 1 doanh thu
          </div>
        </div> */}
      </div>
      <div className="flex gap-4 items-center">
        <Rating
          defaultValue={5}
          readOnly={view}
          value={rating}
          onChange={value => setRating(value)}
          size={'lg'}
          className="mt-4"
        />
        <p className="mt-4">{renderContent(rating)}</p>
      </div>
      <div>
        <textarea
          className={classNames(
            'w-full bg-[#F9F9FA] mt-4 h-[100px] px-3 py-2 resize-none',
            view && 'outline-none'
          )}
          placeholder={view ? '' : 'Hãy chia sẻ cảm nghĩ của bạn về gara này.'}
          value={reviewText}
          readOnly={view}
          onChange={e => {
            if (e.target.value.length > 1000) return
            setReviewText(e.target.value)
          }}
        />
      </div>

      {!view && (
        <div className="mt-5 flex gap-x-2">
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
      )}

      {view && orderSelected?.review[0]?.image.length > 0 && (
        <div className="mt-5 flex gap-x-2">
          {orderSelected?.review[0]?.image.map((img: string) => {
            return (
              <>
                <Image
                  src={getFileUrl(img) ?? '/background/carbg.png'}
                  alt=""
                  width={90}
                  height={90}
                  className="object-cover aspect-square rounded-lg outline-none"
                />
              </>
            )
          })}
        </div>
      )}

      <div className="flex gap-x-2 mt-5 justify-end">
        <div
          className="border-2 border-[#269bc1] px-4 py-2 flex items-center justify-center cursor-pointer text-[#269bc1] font-bold rounded-lg md:min-w-[200px] text-center"
          onClick={handleClose}
        >
          Quay lại
        </div>
        {!view && (
          <Button
            onClick={handleRating}
            className="bg-gradient-order px-4 py-2 flex items-center justify-center cursor-pointer text-white min-h-11 font-bold rounded-lg md:min-w-[200px] text-center border-none"
            loading={loading}
          >
            <p className="text-[16px]">Hoàn thành</p>
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default RatingMerchantDialog

'use client'
import { userCreateFeedback } from '@/apis/admin/feedback'
import { ObjectTypeReview } from '@/apis/client/interface'
import { postNewReview } from '@/apis/client/review'
import { uploadFile } from '@/apis/storage'
import MutipleUploadImage from '@/components/image/MutipleUploadImage'
import { IOrder } from '@/types/order'
import { getFileUrl } from '@/utils/images'
import { Button, Modal, Rating, Select } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '../context/auth.context'

const ModalFeedback = ({
  open,
  onClose
}: {
  open: boolean
  onClose?: () => void
}) => {
  const [reviewImages, setReviewImages] = useState([])
  const [reviewAudios, setReviewAudios] = useState([])
  const [reviewText, setReviewText] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<string | null>()
  const [errorMessage, setErrMessage] = useState<string | null>(null)

  const { user } = useAuth()

  const handleOnFinish = async () => {
    if (!title) {
      setErrMessage('Vui lòng chọn vấn đề')
      return
    }

    try {
      setLoading(true)
      const images = await Promise.all(
        reviewImages.map(image => uploadFile(image))
      )
      const audios = await Promise.all(
        reviewAudios.map(video => uploadFile(video))
      )

      const newValue = {
        title: title,
        content: reviewText,
        image: [...images.map(item => item?.path)],
        video: audios.map(item => item?.path)?.[0] ?? '',
        user_id: user?.id,
        object: 'USER',
        //@ts-ignore
        username: user?.username
      }

      //@ts-ignore
      const feedback = await userCreateFeedback({ body: newValue })

      if (feedback.data) {
        notifications.show({ message: 'Gửi báo cáo thành công' })
        handCLose()
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handCLose = () => {
    setTitle(null)
    setErrMessage(null)
    setReviewText('')
    setReviewImages([])
    setReviewAudios([])
    onClose && onClose()
  }

  return (
    <Modal
      opened={open}
      onClose={() => {
        handCLose()
      }}
      centered
      withCloseButton={false}
      radius={20}
      size="auto"
    >
      <div className="text-2xl text-main font-semibold md:min-w-[500px] mt-2 min-w-[340px]">
        Báo cáo lỗi
      </div>
      <Select
        label=""
        placeholder="Chọn vấn đề"
        data={[
          {
            label: 'Gặp sự cố khi thao tác',
            value: 'Gặp sự cố khi thao tác'
          },
          {
            label: 'Khác',
            value: 'Khác'
          }
        ]}
        className="flex-1"
        size="md"
        variant="filled"
        value={title}
        onChange={e => {
          setErrMessage(null)
          setTitle(e)
        }}
      />
      {errorMessage && (
        <p className="text-sm text-red-500">Vui lòng chọn vấn đề</p>
      )}
      <div className="py-2">
        <textarea
          className="w-full bg-[#F9F9FA] h-[100px] px-3 py-2 resize-none"
          placeholder="Nhập mô tả vấn đề"
          value={reviewText}
          onChange={e => {
            if (e.target.value.length > 1000) return
            setReviewText(e.target.value)
          }}
        />
      </div>

      <div className="flex gap-x-2">
        <MutipleUploadImage
          files={reviewImages}
          setFiles={(newFiles: any) => {
            setReviewImages(newFiles)
          }}
          sub="(Tối đa 2MB)"
          icon="/svg/image-icon.svg"
          acceptType="image"
        />
        <MutipleUploadImage
          files={reviewAudios}
          setFiles={(newFiles: any) => {
            setReviewAudios(newFiles)
          }}
          placeholder={`Thêm video`}
          sub="(Tối đa 5MB)"
          size={1}
          icon="/svg/video.svg"
          acceptType="video"
        />
      </div>

      <div className="flex gap-x-2 mt-5 justify-end">
        <div
          className="border-2 border-[#269bc1] px-4 py-2 flex items-center justify-center cursor-pointer text-[#269bc1] font-bold rounded-lg md:min-w-[150px] text-center"
          onClick={handCLose}
        >
          Quay lại
        </div>
        <Button
          onClick={handleOnFinish}
          className="bg-gradient-order px-4 py-2 flex items-center justify-center cursor-pointer text-white min-h-11 font-bold rounded-lg md:min-w-[150px] text-center border-none"
          loading={loading}
        >
          <p className="text-[16px]">Hoàn thành</p>
        </Button>
      </div>
    </Modal>
  )
}

export default ModalFeedback

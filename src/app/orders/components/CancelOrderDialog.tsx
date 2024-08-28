import { updateOrderStatus } from '@/apis/client/order'
import { IOrder, OrderStatus } from '@/types/order'
import { ComboboxItem, Modal, Select } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import classes from './custome-select.module.css'

const options = [
  {
    label: 'Lý do khác',
    value: 'other'
  },
  {
    label: 'Không muốn mua nữa',
    value: '1'
  },
  {
    label: 'Cửa hàng không trả lời thắc mắc',
    value: '2'
  }
]
const CancelOrderDialog = ({
  open,
  orderSelected,
  onClose,
  onSuccess
}: {
  open: boolean
  onClose?: () => void
  orderSelected: IOrder | null
  onSuccess?: (data?: any) => void
}) => {
  const [value, setValue] = useState<ComboboxItem | null>(null)
  const [reviewText, setReviewText] = useState<string>('')
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setValue(null)
  }, [open])

  console.log('value:::', value)

  return (
    <Modal
      opened={open}
      onClose={() => {
        onClose && onClose()
      }}
      centered
      withCloseButton={false}
      radius={20}
      size={isMobile ? 'xl' : 'auto'}
    >
      <div className="text-2xl text-main font-semibold md:min-w-[500px] mb-3">
        Hủy lịch
      </div>
      {/* Modal content */}
      <div className="mb-4">
        Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn huỷ lịch?
      </div>

      <Select
        // label="Chọn lí do hủy"
        placeholder="Chọn lý do hủy"
        data={options}
        onChange={(_value, option) => setValue(option)}
        className="mt-2"
        classNames={{
          input: classes.input
        }}
        checkIconPosition="right"
      />
      {/* @ts-ignore */}
      {value && value.value == 'other' && (
        <div>
          <textarea
            className={classNames(
              'w-full bg-[#F9F9FA] mt-4 h-[100px] px-3 py-2 resize-none',
              'outline-none'
            )}
            placeholder="Nhập mô tả"
            value={reviewText}
            onChange={e => {
              if (e.target.value.length > 500) return
              setReviewText(e.target.value)
            }}
          />
        </div>
      )}

      <div className="mt-10 flex justify-end gap-x-2 text-white">
        <div
          className="border-2 border-[#52c2e5] md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-[#52c2e5] font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center"
          onClick={onClose}
        >
          Quay lại
        </div>
        <div
          className="border-2 border-[#EB5757] md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-white bg-[#EB5757] font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center"
          onClick={() => {
            if (!orderSelected?.id || !value) return

            updateOrderStatus({
              id: orderSelected?.id,
              status: OrderStatus.CANCELED,
              note: reviewText,
              logs: {
                data: [
                  {
                    created_at: new Date(),
                    created_by: 'Khách hàng',
                    desc: value,
                    status: OrderStatus.CANCELED
                  },
                  ...(orderSelected?.logs?.data ?? [])
                ]
              }
            }).then(() => {
              onSuccess &&
                onSuccess({
                  order: orderSelected,
                  resason: value.label
                })
            })
          }}
        >
          Hủy lịch
        </div>
      </div>
    </Modal>
  )
}

export default CancelOrderDialog

import {
  IDiscountType,
  MapAccompaniesLabel,
  type OrderItemDetail
} from '@/types/order'
import { formatPrice, getProductPriceWithDiscount } from '@/utils/formatPrice'
import { getFileUrl } from '@/utils/images'
import { Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Fragment } from 'react'

function TableOrderItems({ orderList }: { orderList: OrderItemDetail[] }) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (!orderList) return
  return (
    <div className="">
      <div className=" grid-cols-6 px-4 py-4 bg-[#F8F8F8] mb-5 hidden md:grid">
        <div className="col-span-6 flex justify-between">
          <div>Sản phẩm/dịch vụ</div>
          <div>Đơn giá</div>
        </div>
        {/* <div></div> */}
        {/* <div className="ml-4">Bảo hành</div> */}
      </div>
      {orderList?.map((orderItem, index) => {
        const { product } = orderItem

        const { discount_type, originPrice, promotePrice, discount_number } =
          getProductPriceWithDiscount(orderItem?.detail?.classifies)

        return (
          <div key={index} className="grid grid-cols-6 border-b-2 pt-3 pb-1">
            <div className="md:col-span-6 col-span-6 flex items-start md:gap-x-4 gap-x-1 text-main mb-3">
              <img
                src={getFileUrl(product.detail_info.images[0])}
                alt=""
                className="md:w-[100px] w-[40px] aspect-square object-cover rounded-lg mt-2 md:mt-0"
              />
              <div className="mt-2 md:text-base text-sm flex-1">
                <div className="flex justify-between">
                  <div className="font-bold ">{product.name}</div>

                  <div className="text-end items-center gap-x-2 whitespace-nowrap hidden md:flex">
                    <span className="font-semibold text-main">
                      {orderItem.count} x
                    </span>{' '}
                    <span className="bg-clip-text text-transparent bg-text-gradient font-bold text-lg">
                      {formatPrice(promotePrice)}
                    </span>{' '}
                    {discount_number && (
                      <Fragment>
                        <span className="font-semibold line-through text-main opacity-70">
                          {formatPrice(orderItem?.detail?.classifies?.price)}
                        </span>
                      </Fragment>
                    )}
                  </div>
                </div>
                {orderItem.detail.classifies?.manufacture && (
                  // <div className="text-sm">Năm sản xuất: --Chưa có</div>
                  <div className="manufacture-year text-base md:text-sm">
                    Năm sản xuất: {orderItem?.detail?.classifies?.manufacture}
                  </div>
                )}
                <div className="flex items-center gap-x-2 md:hidden">
                  <div className="font-semibold">Giá tiền: </div>
                  <span className="font-semibold text-main">
                    {orderItem.count} x
                  </span>{' '}
                  <span className="bg-clip-text text-transparent bg-text-gradient font-bold text-lg">
                    {formatPrice(promotePrice)}
                  </span>{' '}
                  {discount_number && (
                    <Fragment>
                      <span className="font-semibold line-through text-main opacity-70">
                        {formatPrice(orderItem?.detail?.classifies?.price)}
                      </span>
                    </Fragment>
                  )}
                </div>

                {orderItem?.detail?.accompanies?.map(
                  (_accompaniesItem, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mt-2"
                    >
                      <div className="flex items-center gap-x-2">
                        <div
                          className="px-2 py-1 rounded-md md:border-2 border-1 border-[#67f2d1] font-semibold text-xs"
                          style={{
                            color:
                              MapAccompaniesLabel?.[_accompaniesItem.type]
                                ?.color,
                            borderColor:
                              MapAccompaniesLabel?.[_accompaniesItem.type]
                                ?.color
                          }}
                        >
                          {MapAccompaniesLabel?.[_accompaniesItem.type]?.label}
                        </div>
                        <div className="text-main">{_accompaniesItem.name}</div>{' '}
                        <div className="ml-4">
                          {formatPrice(_accompaniesItem.price)}
                        </div>
                      </div>
                      <div className="hidden md:block">
                        {formatPrice(_accompaniesItem.price)}
                      </div>
                    </div>
                  )
                )}

                {/* <div className="text-start block md:hidden">
                  <Button
                    style={{
                      background:
                        'linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)'
                    }}
                    className="h-[36px] rounded-[10px] text-sm border-0 py-1 px-5 mt-2"
                    radius="md"
                  >
                    Xem bảo hành
                  </Button>
                </div> */}
              </div>
            </div>
            <div></div>
            {/* <div className="text-start hidden md:block">
              <Button
                style={{
                  background:
                    'linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)'
                }}
                className="h-[36px] w-[133px] rounded-[10px] text-base border-0 py-1 px-5"
                radius="md"
              >
                Bảo hành
              </Button>
            </div> */}
          </div>
        )
      })}
    </div>
  )
}

export default TableOrderItems

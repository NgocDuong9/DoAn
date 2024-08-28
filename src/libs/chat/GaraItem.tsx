import { useAiChatContext } from '@/components/context/ai.chat.context'
import { getFileUrl } from '@/utils/images'
import { Button } from '@mantine/core'
import Link from 'next/link'

interface Gara {
  id: string
  services: string[]
  name: string
  rating: number
  location: string
  information: any
  avatar: string
  garage_sold: {
    rating: number
    count_rating: number
  }
}

const GaraItem = ({ gara }: { gara: Gara }) => {
  return (
    <div className="bg-[#ecf6fa] p-2 rounded-lg text-main flex flex-col justify-between">
      <div className="flex gap-x-2 items-start ">
        <img
          src={getFileUrl(gara?.avatar)}
          alt=""
          className="size-[50px] object-scale-down rounded-lg"
        />

        <div>
          <div className="font-semibold text-base">
            {gara.name}{' '}
            {gara.information.hotlin && (
              <span className="font-normal text-sm">
                ({gara.information.hotline})
              </span>
            )}
          </div>
          <div className="text-sm text-[#666666] font-semibold">
            {gara.information.address}
          </div>

          {gara.garage_sold.count_rating !== 0 && (
            <div className="flex gap-x-2 mt-1">
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.9185 11.82C15.6595 12.071 15.5405 12.434 15.5995 12.79L16.4885 17.71C16.5635 18.127 16.3875 18.549 16.0385 18.79C15.6965 19.04 15.2415 19.07 14.8685 18.87L10.4395 16.56C10.2855 16.478 10.1145 16.434 9.93951 16.429H9.66851C9.57451 16.443 9.48251 16.473 9.39851 16.519L4.96851 18.84C4.74951 18.95 4.50151 18.989 4.25851 18.95C3.66651 18.838 3.27151 18.274 3.36851 17.679L4.25851 12.759C4.31751 12.4 4.19851 12.035 3.93951 11.78L0.32851 8.28C0.0265096 7.987 -0.0784904 7.547 0.0595096 7.15C0.19351 6.754 0.53551 6.465 0.94851 6.4L5.91851 5.679C6.29651 5.64 6.62851 5.41 6.79851 5.07L8.98851 0.58C9.04051 0.48 9.10751 0.388 9.18851 0.31L9.27851 0.24C9.32551 0.188 9.37951 0.145 9.43951 0.11L9.54851 0.07L9.71851 0H10.1395C10.5155 0.039 10.8465 0.264 11.0195 0.6L13.2385 5.07C13.3985 5.397 13.7095 5.624 14.0685 5.679L19.0385 6.4C19.4585 6.46 19.8095 6.75 19.9485 7.15C20.0795 7.551 19.9665 7.991 19.6585 8.28L15.9185 11.82Z"
                  fill="#58CEAD"
                />
              </svg>
              <div className="font-semibold text-sm">
                {gara.garage_sold.rating} ({gara.garage_sold.count_rating})
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Link href={`/search/garage/${gara.id}`}>
          <Button
            variant="filled"
            color="linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%)"
            radius="xs"
            className="rounded-md h-8 w-fit border-none"
          >
            <div className="font-semibold text-sm md:text-base">
              Xem chi tiết
            </div>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default GaraItem

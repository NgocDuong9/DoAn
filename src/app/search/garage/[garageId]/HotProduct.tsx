import FooterHome from '@/components/footer'
import GarageIntro from '../component/garageIntro'
import { Image } from '@mantine/core'
import ListProduct from '../component/listProduct'
import { getFileUrl } from '@/utils/images'

function HotProduct({ data, categoryTopSell, listCategoryGarage }: any) {
  const listCategoryFilter = listCategoryGarage.filter(
    (item: any) => !item?.parent_id
  )

  return (
    <div className="flex flex-col">
      <div>
        {data?.banner_image ? (
          <Image
            src={getFileUrl(data?.banner_image)}
            alt={'alt'}
            className="w-full h-96"
            fit="cover"
          />
        ) : (
          <img src="/box/banner_ads.png" className="w-full h-full" />
        )}
      </div>
      <div className="flex mx-auto py-4 md:mt-10 px-4 md:px-5 w-full max-w-main">
        <ListProduct
          title="Sản phẩm, dịch vụ bán chạy"
          data={categoryTopSell}
        />
      </div>
      <div className="flex w-full h-full">
        <GarageIntro data={data} />
      </div>
      <div className="mt-5">
        {listCategoryFilter.map((item: any, idx: number) => (
          <div
            key={idx}
            className="flex mx-auto w-full px-4 md:px-5 max-w-main"
          >
            {item?.product?.length > 0 && (
              <ListProduct
                title={item?.title || 'Đang cập nhật '}
                size="normal"
                data={item?.product}
              />
            )}
          </div>
        ))}
      </div>
      <FooterHome />
    </div>
  )
}

export default HotProduct

'use client'

import { getFileUrl, onErrorHandler } from '@/utils/images'
import { IconPlayerPlay } from '@tabler/icons-react'
import classNames from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Navigation, Thumbs } from 'swiper/modules'
import { Image } from '@mantine/core'

interface Props {
  urlImage: string[]
  video?: string
}

function ImageView({ urlImage, video }: Props) {
  const newUrl = useMemo(() => {
    if (!video) return urlImage
    return [video, ...urlImage]
  }, [video, urlImage])

  const [idx, setIdx] = useState(0)

  // const prevRef = useRef<HTMLDivElement>(null)
  // const nextRef = useRef<HTMLDivElement>(null)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [swiper, setSwiper] = useState<any>(null)

  const slideTo = (index: number) => {
    if (swiper?.slideTo) {
      swiper.slideTo(index)
    }
  }

  // console.log(thumbsSwiper, 'thumbsSwiper', swiper, 'sw')

  // useEffect(() => {
  //   slideTo(urlImage?.length - 1)
  // }, [urlImage])

  return (
    // <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
    <div className="w-full gap-2 ExampleComponent">
      <div className="relative">
        {newUrl && (
          <Swiper
            id="productGallery"
            // loop={true}
            spaceBetween={10}
            // navigation={true}
            onSwiper={setSwiper}
            thumbs={{ swiper: thumbsSwiper }}
            mousewheel={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="flex-1"
            onActiveIndexChange={({ activeIndex }) => {
              console.log('prev:::::', activeIndex)
              setIdx(activeIndex)
            }}
            navigation={true}
          >
            {newUrl?.map((image, index) => {
              if (video && index === 0) {
                return (
                  <SwiperSlide
                    key={index}
                    // onClick={() => setIdx(index)}
                    className="w-full aspect-square rounded-2xl object-contain"
                  >
                    <video
                      preload="metadata"
                      controls
                      // autoPlay
                      className="w-full aspect-square object-scale-down mt-[3px] ml-[3px]"
                    >
                      <source
                        src={`${getFileUrl(video)}#t=0.1`}
                        type="video/mp4"
                      />
                    </video>
                  </SwiperSlide>
                )
              }
              return (
                <SwiperSlide key={index}>
                  <Image
                    src={getFileUrl(image)}
                    // onClick={() => setIdx(index)}
                    className="w-full rounded-2xl aspect-square object-contain"
                    style={{
                      backgroundImage:
                        'radial-gradient(496.37% 143.51% at 101.05% 3.36%, rgba(139, 246, 200, 0.62) 0%, #B9E1EC 51.56%, #FFF 100%)'
                    }}
                    alt="product-image"
                    width={100}
                    height={100}
                    onError={onErrorHandler}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
        {/* <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
          <div
            ref={prevRef}
            className="w-7 swiper-button-prev-custom h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center cursor-pointer justify-center rounded-full bg-skin-fill transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
          >
            prev
          </div>
          <div
            ref={nextRef}
            className="w-7 h-7 md:w-8 swiper-button-next-custom md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center justify-center cursor-pointer rounded-full bg-skin-fill transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
          >
            next
          </div>
        </div> */}
      </div>
      <div className={`mt-2 flex-shrink-0`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          watchSlidesProgress={true}
          freeMode={true}
          modules={[FreeMode, Navigation, Thumbs]}
          // effect={'slide'}
          breakpoints={{
            600: {
              slidesPerView: 5,
              direction: 'horizontal'
            },
            0: {
              slidesPerView: 4.1,
              direction: 'horizontal'
            }
          }}
        >
          {newUrl?.map((image, index) => {
            if (video && index === 0) {
              return (
                <SwiperSlide
                  key={`product-thumb-gallery-${index}`}
                  onClick={() => setIdx(index)}
                  className={classNames(
                    'object-cover aspect-square rounded cursor-pointer relative flex justify-center w-[80px] h-[80px]',
                    index === idx ? 'border-1 border-[#2592bd]' : ''
                  )}
                  style={{
                    marginRight: '5px'
                  }}
                >
                  <video
                    preload="metadata"
                    className="w-[80px] h-full object-scale-down "
                  >
                    <source
                      src={`${getFileUrl(video)}#t=0.1`}
                      type="video/mp4"
                    />
                  </video>
                  <div className="absolute rounded inset-0 flex items-center justify-center bg-black bg-opacity-10">
                    <IconPlayerPlay className="text-white" />
                  </div>
                </SwiperSlide>
              )
            }
            return (
              <SwiperSlide
                key={`product-thumb-gallery-${index}`}
                className="h-[80px] max-w-[80px] aspect-square"
                style={{
                  marginRight: '5px'
                }}
              >
                <Image
                  src={getFileUrl(image)}
                  onClick={() => setIdx(index)}
                  className={classNames(
                    'object-contain aspect-square rounded cursor-pointer w-[80px] h-[80px] overflow-hidden',
                    index === idx ? 'border-1 border-[#2592bd]' : ''
                  )}
                  style={{
                    backgroundImage:
                      'radial-gradient(496.37% 143.51% at 101.05% 3.36%, rgba(139, 246, 200, 0.62) 0%, #B9E1EC 51.56%, #FFF 100%)'
                  }}
                  alt="product-image"
                  width={100}
                  height={100}
                  onError={onErrorHandler}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default ImageView

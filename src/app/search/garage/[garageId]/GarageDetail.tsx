'use client'

import { Box, Text } from '@mantine/core'
import { Fragment, Suspense, useEffect, useState } from 'react'
import {
  checkUserLikeGarage,
  countLikeGarage,
  userLikeGarage
} from '@/apis/client/like-garage'
import {
  getAlwayArrayOfString,
  objectToQueryString,
  removeEmptyProperties
} from '@/utils'
import {
  getCategoryGarage,
  getCategoryTopInGarage,
  getDataBrandGarage,
  getDataOriginGarage,
  getDetailGarage,
  getProductTopSellGarage
} from '@/apis/client/garage'
import { useRouter, useSearchParams } from 'next/navigation'

import AllProduct from './AllProduct'
import DetailSkeleton from '../component/DetailSkeleton'
import DetailSkeletonFull from '../component/DetailSkeletonFull'
import HeaderGarage from './HeaderGarage'
import HotProduct from './HotProduct'
import InputSearch from '../component/inputSearch'
import RatingModal from '../component/RatingModal'
import SearchProduct from './SearchProduct'
import { getCategoryAdmin } from '@/apis/client/auth'
import { getReviewGarage } from '@/apis/client/review'
import { getUserId } from '@/apis/managecar'
import { navigate } from '@/apis/auth'
import useGetSearchParams from '@/hooks/useGetParams'
import classNames from 'classnames'

const initOverview = [
  {
    icon: 'heart',
    content: 'Số lượt yêu thích',
    value: '345'
  },
  {
    icon: 'cart',
    content: 'Lượt bán',
    value: '3k'
  },
  {
    icon: 'star',
    content: 'Đánh giá',
    value: '4.9'
  },
  {
    icon: 'calender',
    content: 'Năm hoạt động',
    value: '2021'
  }
]

const initCategory = [
  {
    type: 'CUU_HO'
  },
  {
    type: 'DIEU_HOA'
  },
  {
    type: 'THAN_VO'
  },
  {
    type: 'DO_XE'
  },
  {
    type: 'DIEN'
  },
  {
    type: 'GAM'
  },
  {
    type: 'KHAC'
  },
  {
    type: 'PHU_TUNG_PHU_KIEN_NOI_NGOAI_THAT'
  },
  {
    type: 'LOP'
  },
  {
    type: 'MAY'
  },
  {
    type: 'AC_QUY'
  },
  {
    type: 'DICH_VU'
  },
  {
    type: 'BAO_DUONG_SUA_CHUA'
  },
  {
    type: 'SAN_PHAM'
  }
]

const initGarage = {
  id: '',
  name: '',
  status: true,
  hotline: null,
  avatar: null,
  merchant_id: '',
  updated_at: '2024-06-04T09:54:51.479823+00:00',
  created_at: '2024-06-04T09:54:51.479823+00:00',
  auth_id: '',
  payment: {
    money: true
    // "elect-wallet": [""],
  },
  information: {
    tag: '',
    name: '',
    ward: '',
    address: '',
    hotline: '',
    service: [''],
    district: '',
    province: ''
  },
  description: {
    fee: true,
    size: 1,
    year: 5,
    times: [],
    device: '',
    acreage: 4,
    between: ['']
  }
}
const initFilter = {
  key: '',
  category: [],
  price_from: null,
  price_to: null,
  origin: [],
  key_brand: [],
  order_price: undefined,
  category_id: [],
  limit: 9,
  page: 1
}

function GarageDetail({ params }: any) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { paramsObj, paramsString } = useGetSearchParams({ searchParams })
  const [categoryAdmin, setCategoryAdmin] = useState<any | null>(null)
  const [currentTab, setCurrentTab] = useState<any>('HOT_PRODUCT')
  const [keySearch, setKeySearch] = useState<any>(paramsObj?.key)
  const [dataGarageDetail, setDataGarageDetail] = useState<any>(initGarage)
  const [filterSearch, setFilterSearch] = useState<any>(initFilter)
  const [filterSearchWKey, setFilterSearchWkey] = useState<any>(initFilter)
  const [likedCount, setLikedCount] = useState<any>(0)
  const [soldCount, setSoldCount] = useState<any>(0)
  const [rating, setRating] = useState<any>(0)
  const [startYear, setStartYear] = useState<any>('2024')
  const [userLikedGarage, setUserLikedGarage] = useState<any>(false)
  const [userIdd, setUserIdd] = useState<any>('')
  const [categoryTopSell, setCategoryTopSell] = useState<any>([])
  const [listCategoryGarage, setListCategoryGarage] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [category, setCategory] = useState<any | null>(null)
  const [brand, setBrand] = useState<any>(null)
  const [origin, setOrigin] = useState<any>(null)
  const [loadingIcon, setLoadingIcon] = useState<boolean>(false)
  const [openModalRating, setOpenModalRating] = useState<boolean>(false)
  const [rateCount, setRateCount] = useState(0)
  const [dataRating, setDataRating] = useState<any>([])
  const [pageR, setPageR] = useState(1)
  const [pageSizeR, setPageSizeR] = useState(2)
  const [loadingR, setLoadingR] = useState(false)

  const getCategory = async () => {
    const category = await getCategoryAdmin()
    setCategoryAdmin(category?.data)
  }

  const getGarageInformation = async () => {
    const garageDetail = await getDetailGarage(params?.garageId)
    console.log(garageDetail, 'wtf')
    setLoading(false)
    //@ts-ignore
    setSoldCount(garageDetail?.garage_sold?.product_sold)
    //@ts-ignore
    setRating(garageDetail?.garage_sold?.rating)
    setDataGarageDetail(garageDetail)
  }
  // So luot yeu thich
  const getTotalLike = async () => {
    const count = await countLikeGarage({ garage_id: params?.garageId })
    setLikedCount(count?.data)
  }
  // check like
  const checkUserGarageLike = async (user_id?: any) => {
    const userLiked = await checkUserLikeGarage({
      user_id,
      garage_id: params?.garageId
    })
    //@ts-ignore
    if (!userLiked?.error) {
      setUserLikedGarage(userLiked)
    }
  }
  // click like btn
  const handleLikedGarage = async (user_id?: any) => {
    setLoadingIcon(true)
    const dataaaaa = await userLikeGarage({
      user_id,
      garage_id: params?.garageId
    })

    //@ts-ignore
    if (!dataaaaa?.error) {
      await checkUserGarageLike(user_id).then(getTotalLike)
      setLoadingIcon(false)
    }
  }
  const getRatingReview = async () => {
    setLoadingR(true)
    const result = await getReviewGarage(params?.garageId, {
      page: pageR,
      limit: pageSizeR
    })
    setDataRating(result?.data)
    //@ts-ignore
    setRateCount(result?.total)

    setLoadingR(false)
  }

  const getUserIdd = async () => {
    const result = await getUserId()

    setUserIdd(result)
  }
  const getProductTopSell = async () => {
    const result = await getProductTopSellGarage({
      garage_id: params?.garageId
    })
    setCategoryTopSell(result?.data)
  }
  const getProductTopCategory = async () => {
    const result = await getCategoryTopInGarage({
      garage_id: params?.garageId
    })
    setListCategoryGarage(result?.data)
    console.log(result, 'xxxaaa')
  }

  const handleChangeFilterAndUpdateToUrl = (newFilter: any) => {
    const filterData = removeEmptyProperties(newFilter)
    router.push(`?${objectToQueryString(filterData)}`, { scroll: false })
  }

  const getCategoryProduct = async () => {
    const category = await getCategoryGarage(params?.garageId)

    setCategory(category)
  }
  const getBrandProduct = async () => {
    const brand = await getDataBrandGarage(params?.garageId)
    setBrand(brand)
  }
  const getOriginProduct = async () => {
    const origin = await getDataOriginGarage(params?.garageId)
    setOrigin(origin)
  }

  useEffect(() => {
    getUserIdd().then()
  }, [])

  useEffect(() => {
    checkUserGarageLike(userIdd).then()
  }, [userIdd])

  useEffect(() => {
    Promise.all([
      getCategory(),
      getGarageInformation(),
      getTotalLike(),
      getCategoryProduct(),
      getBrandProduct(),
      getOriginProduct(),
      getProductTopSell(),
      getProductTopCategory()
    ])
      .then(() => {})
      .catch(error => {
        console.error('Error loading data:', error)
      })
  }, [params])
  useEffect(() => {
    getRatingReview()
  }, [pageR])

  useEffect(() => {
    if (!paramsObj?.key) {
      setFilterSearch({
        ...initFilter,
        ...paramsObj,
        //@ts-ignore
        key: paramsObj.key,
        category: getAlwayArrayOfString(paramsObj.category),
        key_brand: getAlwayArrayOfString(paramsObj.key_brand),
        category_id: getAlwayArrayOfString(paramsObj?.category_id),
        origin: getAlwayArrayOfString(paramsObj.origin),
        page: paramsObj.page ? Number(paramsObj.page) : 1,
        limit: paramsObj.limit ? Number(paramsObj.limit) : 9,
        //@ts-ignore
        order_price:
          paramsObj.order_price === 'true'
            ? true
            : paramsObj.order_price === 'false'
              ? false
              : paramsObj.order_price
      })
      setFilterSearchWkey(initFilter)
    } else {
      setFilterSearchWkey({
        ...initFilter,
        ...paramsObj,
        //@ts-ignore
        key: paramsObj.key,
        category: getAlwayArrayOfString(paramsObj.category),
        key_brand: getAlwayArrayOfString(paramsObj.key_brand),
        category_id: getAlwayArrayOfString(paramsObj?.category_id),
        origin: getAlwayArrayOfString(paramsObj.origin),
        page: paramsObj.page ? Number(paramsObj.page) : 1,
        limit: paramsObj.limit ? Number(paramsObj.limit) : 9,
        //@ts-ignore
        order_price:
          paramsObj.order_price === 'true'
            ? true
            : paramsObj.order_price === 'false'
              ? false
              : paramsObj.order_price
      })
      setFilterSearch(initFilter)
    }

    if (
      (paramsObj?.category && paramsObj?.category?.length > 0) ||
      (paramsObj?.key_brand && paramsObj?.key_brand?.length > 0) ||
      (paramsObj?.key_brand && paramsObj?.key_brand?.length > 0) ||
      (paramsObj?.category_id && paramsObj?.category_id?.length > 0) ||
      (paramsObj?.origin && paramsObj?.origin?.length > 0) ||
      paramsObj?.order_price ||
      paramsObj?.price_from ||
      paramsObj?.price_to
    ) {
      setCurrentTab('ALL_PRODUCT')
    }
  }, [paramsString])

  return (
    <Suspense>
      <div className="flex-col w-[100vw] h-[100vh] justify-center">
        <div className="h-16 md:h-0"></div>
        {loading && (
          <Fragment>
            <div className="hidden md:block">
              <DetailSkeleton />
            </div>
            <div className="block md:hidden">
              <DetailSkeletonFull />
            </div>
          </Fragment>
        )}
        {!loading && (
          <div className="flex md:pt-[90px] h-full w-full">
            <div className="w-full h-full">
              <div className="w-full bg-gradient-to-l from-[#8BF6C8] via-[#B9E1EC] to-[#FFFFFF] flex justify-center items-center md:p-10 p-5">
                <div className="flex w-[94%] lg:w-[50%] h-full justify-center z-50">
                  <InputSearch
                    setQuery={(e: any, selectType: any) => {
                      if (selectType === 'shop') {
                        if (e) {
                          handleChangeFilterAndUpdateToUrl({
                            ...filterSearchWKey,
                            category_id: [],
                            key: e
                          })
                        } else {
                          handleChangeFilterAndUpdateToUrl({
                            ...filterSearch,
                            key: e
                          })
                        }
                        setKeySearch(e)
                      } else {
                        if (e) {
                          navigate(`/search?${objectToQueryString({ key: e })}`)
                        }
                      }
                    }}
                    placeholder="Tìm kiếm"
                    query={paramsObj?.key}
                  />
                </div>
              </div>

              <div className="pb-2 border-b-2 mx-auto">
                <HeaderGarage
                  initCategory={initCategory}
                  initOverview={initOverview}
                  data={dataGarageDetail}
                  dataOverview={{
                    likedCount,
                    soldCount,
                    rating,
                    startYear
                  }}
                  userLikedGarage={userLikedGarage}
                  handleLikedGarage={() => {
                    handleLikedGarage(userIdd)
                  }}
                  loading={loadingIcon}
                  handleViewRating={(e: any) => {
                    setOpenModalRating(e)
                  }}
                  opened={openModalRating}
                />
              </div>
              <Box className="flex flex-col w-full h-full pt-2">
                <div className="max-w-main flex md:justify-start justify-center items-center w-full mx-auto px-2 md:px-5">
                  <div>
                    {!keySearch && (
                      <Box className="flex items-center w-full gap-4 mb-4 h-16">
                        <Box
                          onClick={() => {
                            setCurrentTab('HOT_PRODUCT')
                            handleChangeFilterAndUpdateToUrl({
                              ...initFilter,
                              page: null,
                              limit: null
                            })
                          }}
                          className={`cursor-pointer py-2  ${
                            currentTab === 'HOT_PRODUCT'
                              ? 'border-b-4 border-main'
                              : 'border-b-4 border-[#FFFFFF]'
                          }`}
                        >
                          <Text
                            className={classNames(
                              'text-sm md:text-base font-medium text-main',
                              currentTab === 'HOT_PRODUCT' ? '' : 'opacity-50'
                            )}
                          >
                            Sản phẩm, dịch vụ nổi bật
                          </Text>
                        </Box>
                        <Box
                          onClick={() => {
                            setCurrentTab('ALL_PRODUCT')
                            handleChangeFilterAndUpdateToUrl(initFilter)
                          }}
                          className={`cursor-pointer py-2 ${
                            currentTab === 'ALL_PRODUCT'
                              ? 'border-b-4 border-main'
                              : 'border-b-4 border-[#FFFFFF]'
                          }`}
                        >
                          <Text
                            className={classNames(
                              'text-sm md:text-base font-medium text-main',
                              currentTab === 'ALL_PRODUCT' ? '' : 'opacity-50'
                            )}
                          >
                            Tất cả sản phẩm, dịch vụ
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </div>
                </div>
                {!keySearch && currentTab === 'HOT_PRODUCT' && (
                  <HotProduct
                    data={dataGarageDetail}
                    categoryTopSell={categoryTopSell}
                    listCategoryGarage={listCategoryGarage}
                  />
                )}
                {!keySearch && currentTab === 'ALL_PRODUCT' && (
                  <AllProduct
                    categoryAdmin={categoryAdmin}
                    filters={filterSearch}
                    dataCount={() => {}}
                    handleChangeFilterAndUpdateToUrl={
                      handleChangeFilterAndUpdateToUrl
                    }
                    data={dataGarageDetail}
                    garageId={params?.garageId}
                    paramsObj={paramsObj}
                    dataBrand={brand}
                    dataOrigin={origin}
                    dataCategory={category}
                  />
                )}
                {keySearch && (
                  <SearchProduct
                    categoryAdmin={categoryAdmin}
                    filters={filterSearchWKey}
                    dataCount={() => {}}
                    handleChangeFilterAndUpdateToUrl={
                      handleChangeFilterAndUpdateToUrl
                    }
                    query={keySearch}
                    data={dataGarageDetail}
                    garageId={params?.garageId}
                    paramsObj={paramsObj}
                    dataBrand={brand}
                    dataOrigin={origin}
                  />
                )}
                <RatingModal
                  close={() => setOpenModalRating(false)}
                  opened={openModalRating}
                  data={dataRating}
                  rateCount={rateCount}
                  rating={rating}
                  productSold={soldCount}
                  pageR={pageR}
                  pageSizeR={pageSizeR}
                  setPageR={e => setPageR(e)}
                  setPageSizeR={e => setPageSizeR(e)}
                  loading={loadingR}
                />
              </Box>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  )
}

export default GarageDetail

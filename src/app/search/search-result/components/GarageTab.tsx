'use client'

import { Box, Grid, Text } from '@mantine/core'
import { IconChevronRight, IconFilter } from '@tabler/icons-react'
import { PRODUCT_CATEGORY, SERVICE_CATEGORY } from '@/constants/category'
import { mergeUniqueByCode, removeEmptyProperties } from '@/utils'
import { Fragment, useEffect, useState } from 'react'

import CorePagination from '@/components/custom/pagination/CorePagination'
import FilterModalGarage from './modal-filter-garage'
import Link from 'next/link'
import ModalZone from './modal-zone'
import { NestedCheckboxes } from './nested-checkbox'
import NotFound from './not-found'
import SearchSkeleton from './SearchSkeleton'
import TagAds from './tag-ads'
import TagStore from '@/components/custom/tag/tag-store'
import { searchGarage } from '@/apis/client/auth'
import { ProductType } from '@/apis/client/interface'

interface Props {
  filters: any
  category: any
  handleChangeFilterAndUpdateToUrl: (data: any) => void
  paramsObj: any
}

const initZoneChecked = [
  {
    name: 'Hà Nội',
    slug: 'ha-noi',
    type: 'thanh-pho',
    name_with_type: 'Thành phố Hà Nội',
    code: '01'
  },
  {
    name: 'TP Hồ Chí Minh',
    slug: 'ho-chi-minh',
    type: 'thanh-pho',
    name_with_type: 'Thành phố Hồ Chí Minh',
    code: '79'
  },
  {
    name: 'Đà Nẵng',
    slug: 'da-nang',
    type: 'thanh-pho',
    name_with_type: 'Thành phố Đà Nẵng',
    code: '48'
  },
  {
    name: 'Hải Phòng',
    slug: 'hai-phong',
    type: 'thanh-pho',
    name_with_type: 'Thành phố Hải Phòng',
    code: '31'
  },
  {
    name: 'Cần Thơ',
    slug: 'can-tho',
    type: 'thanh-pho',
    name_with_type: 'Thành phố Cần Thơ',
    code: '92'
  }
]
const initialTopRevenue = [
  { name: 'Top doanh thu', id: 1, value: 'top_revenue' },
  { name: 'Được yêu thích', id: 2, value: 'top_loved' },
  {
    name: 'Gara mới',
    id: 3,
    value: 'new_garage'
  }
]

const GarageTab = ({
  filters,
  category,
  handleChangeFilterAndUpdateToUrl,
  paramsObj
}: Props) => {
  const [brandField, setBrandField] = useState<any>({})
  const [openModalZone, setOpenModalZone] = useState(false)
  const [garageData, setGarageData] = useState<any>([])
  const [garageCount, setGarageCount] = useState<any>(0)
  const [loading, setLoading] = useState(true)
  const [reset, setReset] = useState(false)
  const [openFilterPopup, setOpenFilterPopup] = useState(false)
  const [zoneChecked, setZoneCheck] = useState(initZoneChecked)

  useEffect(() => {
    setBrandField({
      ...brandField,
      prodType: [
        ...PRODUCT_CATEGORY,
        {
          name: 'Nội -  ngoại thất',
          key: ProductType.NOI_NGOAI_THAT
        },
        ...SERVICE_CATEGORY
      ]
    })
  }, [])

  const handleSelectCheckboxItem = ({
    data: { item, isChecked },
    filterKey,
    itemKey,
    type = 'checkbox'
  }: {
    data: { item: any; isChecked: any }
    filterKey: 'category' | 'province' | 'title'
    itemKey: 'key' | 'slug' | 'value' | 'code'
    type?: 'checkbox' | 'radio'
  }) => {
    let updatedChecked

    if (type === 'checkbox') {
      if (isChecked) {
        updatedChecked = [...filters[filterKey], item[itemKey]]
      } else {
        updatedChecked = filters?.[filterKey]?.filter(
          (checkedItem: any) => checkedItem !== item[itemKey]
        )
      }
    } else {
      if (isChecked) {
        updatedChecked = [item[itemKey]]
      } else {
        updatedChecked = filters?.[filterKey]?.filter(
          (checkedItem: any) => checkedItem !== item[itemKey]
        )
      }
    }

    const newFilters = {
      ...filters,
      [filterKey]: updatedChecked,
      ...(!filters.category.includes('LOP') && {
        key_rim: [],
        key_treadCode: []
      }),
      ...(!filters.category.includes('AC_QUY') && {
        key_type: [],
        key_voltage: [],
        key_capacity: []
      })
    }

    handleChangeFilterAndUpdateToUrl(newFilters)
  }

  const handleGetGarage = async () => {
    setLoading(true)

    const params = removeEmptyProperties(filters)
    const { data: listGarage, count } = await searchGarage({
      ...params
    } as any)

    //@ts-ignore
    if (listGarage?.error) {
    } else {
      setGarageData(listGarage)
      setGarageCount(count)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!filters.is_init) return
    handleGetGarage()
  }, [JSON.stringify(filters)])

  console.log('garageData:::', garageData)

  return (
    <div className="flex-col">
      <div className="flex flex-col md:flex-row h-full mt-4">
        <div className="hidden md:block md:w-1/4 ">
          <div className="p-2">
            {/* !todo */}
            <NestedCheckboxes
              title={'Lĩnh vực'}
              data={brandField?.prodType ?? []}
              checkedItems={filters?.category ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'category',
                  itemKey: 'key',
                  type: 'radio'
                })
              }}
              filterKey="key"
              type="radio"
            />
          </div>

          <div className="p-2">
            <NestedCheckboxes
              title={'Khu vực'}
              data={zoneChecked}
              checkedItems={filters?.province ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'province',
                  itemKey: 'code'
                })
              }}
              filterKey="code"
            />
            <Box
              onClick={() => {
                setOpenModalZone(true)
              }}
              className="flex items-center cursor-pointer"
            >
              Khác <IconChevronRight size={14} />
            </Box>
            <ModalZone
              handleCheckedData={(e: any) => {
                const merged = mergeUniqueByCode(zoneChecked, e)
                setZoneCheck(merged)
                const checkedZone = e.map((item: any) => item.code)
                handleChangeFilterAndUpdateToUrl({
                  ...filters,
                  province: checkedZone
                })
              }}
              checkedData={filters?.province}
              showDropdown={openModalZone}
              setShowDropdown={() => setOpenModalZone(false)}
            />
          </div>
          {/* <div className="p-2">
            <NestedCheckboxes
              title={'Danh hiệu'}
              data={initialTopRevenue}
              checkedItems={filters?.title ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'title',
                  itemKey: 'value'
                })
              }}
              filterKey="value"
            />
          </div> */}
          <div className="p-2">
            <TagAds
              title="Depo White Headlight"
              url="https://images.unsplash.com/photo-1632260260864-caf7fde5ec36?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              content="Imported LED"
              price="$5000"
              btnAddToCart="Thêm vào giỏ hàng"
              btnDetail="Xem chi tiết"
            />
          </div>
        </div>
        <div className="flex justify-between py-3 px-3 ">
          <Text className="md:hidden">
            Kết quả tìm kiếm {`(${garageCount})`}
          </Text>

          <Box
            className="cursor-pointer md:hidden"
            onClick={() => {
              setOpenFilterPopup(!openFilterPopup)
            }}
          >
            <IconFilter />
          </Box>
          <FilterModalGarage
            handleCheckedData={(e: any) => {
              handleChangeFilterAndUpdateToUrl({
                ...e
              })
            }}
            checkedData={[]}
            showDropdown={openFilterPopup}
            setShowDropdown={() => setOpenFilterPopup(false)}
            prodField={brandField}
            filters={filters}
            zoneChecked={zoneChecked}
            setZoneCheck={setZoneCheck}
          />
        </div>
        <div className="w-full md:w-3/4 md:px-4 ">
          <div className="flex justify-between mb-4"></div>
          <Grid className="px-2">
            {loading ? (
              <div className="flex w-full justify-center items-center">
                <SearchSkeleton className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3" />
              </div>
            ) : garageCount === 0 ? (
              <div className="flex w-full justify-center items-center">
                <NotFound />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3 md:gap-y-4 mx-auto w-full">
                {garageData?.map((item: any, index: number) => {
                  const Store = (
                    <TagStore
                      url={
                        item?.avatar ??
                        'https://static.automotor.vn/w640/images/upload/2022/11/01/sua-xe-o-to-cong-nghe-cao-autonews4.jpg'
                      }
                      countRate={item?.garage_sold?.count_rating}
                      rate={(item?.garage_sold?.rating || 5)?.toFixed(2)}
                      price={item?.sell_info?.price}
                      sold={item?.garage_sold?.product_sold}
                      title={item?.name}
                      type={item?.type}
                      address={item?.information?.address}
                      workingTime={item?.description?.times}
                      breakTime={item?.description?.between}
                      tag={item?.information?.tag}
                      services={item?.information?.service}
                      timeGoogle={item?.description?.timeGoogle}
                      phone={item?.description?.phone}
                      categoryGoogle={item?.description?.categoryGoogle}
                      garaOrigin={item?.origin ?? 'INAPP'}
                      id={item.id}
                    />
                  )

                  return (
                    <div key={index} >
                      {item?.origin !== 'GOOGLE' ? (
                        <Link href={`search/garage/${item.id}`}>{Store}</Link>
                      ) : (
                        <Fragment>{Store}</Fragment>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </Grid>
          {loading ? (
            <div className="flex w-full justify-center items-center">
              {/* <Loader /> */}
            </div>
          ) : garageCount === 0 ? (
            <div className="flex w-full justify-center items-center">
              {/* <NotFound /> */}
            </div>
          ) : (
            <div className="flex justify-center items-center mt-10">
              <CorePagination
                onChange={(page: number, size: number) => {
                  handleChangeFilterAndUpdateToUrl({
                    ...filters,
                    page: page
                  })
                  setReset(false)
                }}
                pageSize={paramsObj?.limit ? Number(paramsObj?.limit) : 9}
                activePage={paramsObj?.page ? Number(paramsObj?.page) : 1}
                total={garageCount ?? 0}
                reset={reset}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GarageTab

'use client'

import { Box, Text } from '@mantine/core'
import { getAlwayArrayOfString, objectToQueryString } from '@/utils'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import FilterSort from './components/filter-sort'
import GarageTab from './components/GarageTab'
import HeaderBar from '@/components/header/header'
import InputSearchh from './components/input-search'
import ProductTab from './components/ProductTab'
import ServiceTab from './components/ServiceTab'
import classNames from 'classnames'
import { getCategoryAdmin } from '@/apis/client/auth'
import useGetSearchParams from '@/hooks/useGetParams'

enum Tab {
  BRAND_TYPE = 'GARAGE',
  PRODUCT_TYPE = 'SAN_PHAM',
  SERVICE_TYPE = 'DICH_VU'
}

const tabs = [
  {
    label: 'Sản phẩm',
    value: Tab.PRODUCT_TYPE
  },
  {
    label: 'Dịch vụ',
    value: Tab.SERVICE_TYPE
  },
  {
    label: 'Gara',
    value: Tab.BRAND_TYPE
  }
]
const initState = {
  field: [],
  province: [],
  price_from: null,
  price_to: null,
  key_brand: [],
  origin: [],
  key_rim: [],
  key_treadCode: [],
  key_capacity: [],
  type: Tab.PRODUCT_TYPE,
  key_type: [],
  key_voltage: [],
  order_price: false,
  title: [],
  key: '',
  category: [],
  page: 1,
  limit: 9,
  is_init: false
}

export default function SearchResult() {
  const [filters, setFilters] = useState(initState)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { paramsObj, paramsString } = useGetSearchParams({ searchParams })
  const [categoryAdmin, setCategoryAdmin] = useState<any | null>(null)
  const [searchCount, setSearchCount] = useState(null)

  const getCategory = async () => {
    const category = await getCategoryAdmin()
    setCategoryAdmin(category)
  }

  // fetch all adminCategory
  useEffect(() => {
    getCategory()
  }, [filters.type])

  const handleChangeFilterAndUpdateToUrl = (newFilter: any) => {
    router.push(`?${objectToQueryString(newFilter)}`, { scroll: false })
  }

  // update state when url change
  useEffect(() => {
    setFilters({
      ...initState,
      ...paramsObj,
      //@ts-ignore
      key: paramsObj.key ?? '',
      category: getAlwayArrayOfString(paramsObj.category),
      province: getAlwayArrayOfString(paramsObj.province),
      key_brand: getAlwayArrayOfString(paramsObj.key_brand),
      origin: getAlwayArrayOfString(paramsObj.origin),
      key_rim: getAlwayArrayOfString(paramsObj.key_rim),
      key_treadCode: getAlwayArrayOfString(paramsObj.key_treadCode),
      key_type: getAlwayArrayOfString(paramsObj.key_type),
      key_voltage: getAlwayArrayOfString(paramsObj.key_voltage),
      key_capacity: getAlwayArrayOfString(paramsObj.key_capacity),
      field: getAlwayArrayOfString(paramsObj.field),
      title: getAlwayArrayOfString(paramsObj.title),
      page: paramsObj.page ? Number(paramsObj.page) : 1,
      limit: paramsObj.limit ? Number(paramsObj.limit) : 9,
      //@ts-ignore
      order_price:
        paramsObj.order_price === 'true'
          ? true
          : paramsObj.order_price === 'false'
            ? false
            : paramsObj.order_price ?? false,
      is_init: true
    })
  }, [paramsString])

  return (
    <div>
      <HeaderBar />
      <div className="flex-col pt-[60px] md:pt-[90px]">
        <div className="flex relative  justify-center w-full md:pt-10 pt-6 md:pb-4 pb-5 bg-opacity-50 bg-header-search-gradient">
          <div className="flex w-[94%] md:w-[50%] h-full justify-center z-50">
            <InputSearchh
              setQuery={(e: any) => {
                handleChangeFilterAndUpdateToUrl({
                  ...filters,
                  key: e
                })
              }}
              query={paramsObj?.key}
              widthZ={'90%'}
            />
          </div>
          <div className="absolute w-full bg-white h-12 bottom-0 z-10"></div>
        </div>

        <div className="w-full md:p-5 px-2 h-full max-w-main mx-auto">
          <div className="flex bg-[#F8F8F8] p-4 justify-between items-center rounded-xl">
            <Text className="font-semibold hidden md:block">
              Kết quả tìm kiếm{' '}
              {`${
                searchCount && paramsObj.type !== 'GARAGE'
                  ? '(' + searchCount + ')'
                  : ''
              }`}
            </Text>
            <div className="flex w-full justify-between md:w-auto">
              {tabs.map(item => (
                <Box
                  key={item.value}
                  onClick={() => {
                    handleChangeFilterAndUpdateToUrl({
                      ...initState,
                      type: item.value
                    })
                  }}
                  className={classNames(
                    filters.type === item.value
                      ? 'bg-tab-gradient'
                      : 'bg-transparent',
                    ' cursor-pointer md:px-10 md:py-1 px-5 py-1 rounded-full'
                  )}
                >
                  <Text
                    className={classNames(
                      filters.type === item.value ? 'text-white' : 'text-black',
                      'md:font-bold font-semibold md:text-lg text-sm'
                    )}
                  >
                    {item.label}
                  </Text>
                </Box>
              ))}
            </div>
            <div className="hidden md:flex">
              <FilterSort
                title="Sắp xếp theo"
                onChangeFilter={e => {
                  handleChangeFilterAndUpdateToUrl({
                    ...filters,
                    order_price: e === 'true' ? true : e === 'false' ? false : e
                  })
                }}
              />
            </div>
          </div>
          <div className="md:hidden flex w-full justify-end pr-4 pt-4">
            <FilterSort
              title="Sắp xếp theo"
              onChangeFilter={e => {
                handleChangeFilterAndUpdateToUrl({
                  ...filters,
                  order_price: e === 'true' ? true : e === 'false' ? false : e
                })
              }}
            />
          </div>

          <Box className="h-full w-full">
            {filters.type === Tab.PRODUCT_TYPE && (
              <ProductTab
                filters={filters}
                category={categoryAdmin}
                handleChangeFilterAndUpdateToUrl={
                  handleChangeFilterAndUpdateToUrl
                }
                dataCount={e => setSearchCount(e)}
                paramsObj={paramsObj}
              />
            )}
            {filters.type === Tab.SERVICE_TYPE && (
              <ServiceTab
                filters={filters}
                category={categoryAdmin}
                handleChangeFilterAndUpdateToUrl={
                  handleChangeFilterAndUpdateToUrl
                }
                dataCount={e => setSearchCount(e)}
                paramsObj={paramsObj}
              />
            )}
            {filters.type === Tab.BRAND_TYPE && (
              <GarageTab
                filters={filters}
                category={categoryAdmin}
                handleChangeFilterAndUpdateToUrl={
                  handleChangeFilterAndUpdateToUrl
                }
                paramsObj={paramsObj}
              />
            )}
          </Box>
        </div>
      </div>
    </div>
  )
}

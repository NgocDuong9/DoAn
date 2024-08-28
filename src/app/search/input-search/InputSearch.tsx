'use client'

import {
  deleteSearchKey,
  searchProduct,
  setHistorySearch
} from '@/apis/client/auth'
import {
  createQueryStringDetail,
  objectToQueryString,
  removeDiacritics
} from '@/utils'
import {
  Box,
  Button,
  Grid,
  Loader,
  Paper,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import {
  IconHome,
  IconMicrophone,
  IconSearch,
  IconX
} from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'

import { navigate } from '@/apis/auth'
import { useMetaDataContext } from '@/components/context/metadata.context'
import TagLabel from '@/components/custom/tag/tag-label'
import Link from 'next/link'
import TagName from '../../../components/custom/tag/tag'
import TagProduct from '../../../components/custom/tag/tag-product'
import TagRemove from '../../../components/custom/tag/tag-remove'
import QuickTag from '../search-result/components/quick-tag'
import useClickOutside from '../search-result/components/useClickOutside'
import { useAuth } from '@/components/context/auth.context'
import useOnClickOutside from '@/hooks/useOnClickOutsideWithArray'
import { useMediaQuery } from '@mantine/hooks'
import classNames from 'classnames'
import ProductSkeleton from './product-skeleton'
import useDebounce from '@/hooks/useDebounce'
import useDisableHtmlScroll from '@/hooks/useDisableHtmlScroll'
import { useAiChatContext } from '@/components/context/ai.chat.context'
import { getProductPriceWithDiscount } from '@/utils/formatPrice'

function InputSearch({ showDropdown, setShowDropdown }: any) {
  const { user, authId } = useAuth()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const [currentTab, setCurrentTab] = useState('product')
  const [loading, setLoading] = useState(false)
  const [dataSearch, setDataSearch] = useState<any>([])
  const [dataCount, setDataCount] = useState<any>(null)
  const [dataSearchService, setDataSearchService] = useState<any>([])
  const [dataCountService, setDataCountService] = useState<any>(null)
  useDisableHtmlScroll(showDropdown)
  const { handleToggleChatModel } = useAiChatContext()

  const isMobile = useMediaQuery('(max-width: 768px)')

  const {
    popularSearch,
    newestSearches,
    handleUpdateSearchHistory,
    bateryTags,
    tireTags,
    serviceTags
  } = useMetaDataContext()

  const getSearchResult = async (value: any, type: any) => {
    let params = {
      key: value,
      type: 'SAN_PHAM'
    }
    let paramsS = {
      key: value,
      type: 'DICH_VU'
    }

    const tags = [...tireTags, ...bateryTags].filter(item =>
      removeDiacritics(value).includes(item.value)
    )

    const { data: listProduct, count } = await searchProduct({
      ...(params as any),
      tags
    })
    const { data: listService, count: countService } = await searchProduct({
      ...(paramsS as any),
      tags
    })
    setDataCount(count)
    setDataSearch(listProduct)
    setDataCountService(countService)
    setDataSearchService(listService)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const timeoutId = setTimeout(() => {
      if (query) {
        getSearchResult(query.trim(), currentTab)
        setHistorySearch(query.trim())
        handleUpdateSearchHistory(query.trim())
      } else {
        setDataSearch([])
        setDataCountService([])
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [query, currentTab])

  console.log(dataSearch, 'dataSearch::::')

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => {})

  const quickLinks = [
    {
      title: 'Sản phẩm',
      type: 'SAN_PHAM',
      content: 'giảm giá lên tới 60%',
      sale: '60%'
    },
    {
      title: 'Dịch vụ',
      content: 'giảm giá lên tới 50%',
      sale: '50%',
      type: 'DICH_VU'
    },
    { title: 'Gara gần bạn', content: '', type: 'GARAGE' }
  ]

  const handleDeleteKey = async (e: any) => {
    if (!authId) return

    const result = await deleteSearchKey(e.key, authId)
    if (result) {
      handleUpdateSearchHistory(e.key, true)
    }
  }

  useOnClickOutside([ref], () => {
    setQuery('')
    setShowDropdown(false)
  })

  useEffect(() => {
    if (query === '') {
      setDataCount(0)
      setDataSearch([])
      setDataCountService(0)
      setDataSearchService([])
      setLoading(false)
    }
  }, [query])

  return (
    <div className="fixed h-screen md:h-fit top-0 mx-auto w-full z-[200]">
      <div ref={inputRef} className="relative">
        {showDropdown && (
          <Paper
            ref={ref}
            withBorder
            shadow="md"
            className="absolute z-10 w-full border border-gray-300 rounded shadow-md h-screen md:h-fit overflow-y-auto"
          >
            <div className="flex justify-between items-center p-2 border-b gap-x-3 md:gap-x-0 fixed w-full bg-white">
              <Link href="/">
                <img
                  src="/logo/applogo.png"
                  alt="logo-main"
                  className="h-[60px] hidden md:block"
                />
              </Link>
              <div className="relative md:w-[50%] w-full mb-2">
                <TextInput
                  placeholder="Kho sản phẩm, dịch vụ..."
                  value={query}
                  onChange={event => {
                    setQuery(event.currentTarget.value)
                  }}
                  classNames={{
                    input:
                      'border border-transparent h-12 rounded-lg pl-14 pr-24 outline-none bg-[#F8F8F8]'
                  }}
                />
                <button
                  className="absolute left-4"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <IconSearch size={32} color="#58CFAE" />
                </button>
                {/* <button
                  className="absolute right-0 p-1 rounded-sm px-6"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                  onClick={() => {
                    console.log('trigger voice')
                  }}
                >
                  <IconMicrophone />
                </button> */}
                {query && (
                  <button
                    className="absolute -right-2 p-1 rounded-sm px-6"
                    style={{
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                    onClick={() => {
                      setQuery('')
                    }}
                  >
                    <IconX size={16} />
                  </button>
                )}
              </div>
              <button
                className="right-2 bottom-[16%] p-1 rounded-sm pl-6"
                onClick={() => {
                  setQuery('')
                  setShowDropdown(false)
                }}
              >
                <IconX size={30} />
              </button>
            </div>

            {query &&
            dataSearch?.length === 0 &&
            dataCountService?.length === 0 &&
            loading ? (
              <Box className="flex justify-center items-center mt-[73px] py-2">
                <Loader />
              </Box>
            ) : (
              <div className="mt-[73px]"></div>
            )}
            {query &&
              !loading &&
              dataSearch?.length === 0 &&
              dataSearchService?.length === 0 && (
                <div>
                  <div className="flex p-4 md:pt-10 justify-center items-center gap-2 border-b">
                    <img
                      className="w-10 h-10 object-cover rounded"
                      src={'/box/sad-emoji.png'}
                    />

                    <Text className="font-medium text-xl  text-main">
                      {`Không tìm thấy kết quả nào trùng với “${query}”. Tìm kiếm nâng
                         cao hơn với`}{' '}
                      <span
                        className="flex gap-x-2 font-medium cursor-pointer"
                        onClick={() => {
                          handleToggleChatModel()
                          setShowDropdown(false)
                          setQuery('')
                        }}
                      >
                        <span className="text-[#26D3E0]">AI</span>
                        <img
                          className="w-6 h-6 object-cover rounded"
                          src={'/box/AI-Icon.png'}
                        />
                      </span>
                    </Text>
                  </div>
                  <div className="flex p-2 justify-center border-b">
                    <Grid className="py-2">
                      {popularSearch.map((item: any, index: number) => (
                        <div key={index} className="m-1">
                          <TagName onClick={e => setQuery(e)}>
                            {item.key}
                          </TagName>
                        </div>
                      ))}
                    </Grid>
                  </div>
                </div>
              )}
            {!query && (
              <div className="flex p-4 justify-center border-b">
                <Grid className="">
                  {popularSearch.map((item: any, index: number) => (
                    <div key={index} className="m-1">
                      <TagName onClick={e => setQuery(e)}>{item.key}</TagName>
                    </div>
                  ))}
                </Grid>
              </div>
            )}
            {(query && dataSearch?.length > 0) ||
            (query && dataSearchService?.length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="col-span-2 py-2 px-4">
                  <Link
                    href={`/search?${objectToQueryString({
                      type: 'GARAGE',
                      key: query,
                      limit: 9,
                      page: 1
                    })}`}
                    className="flex items-center gap-2 py-4 px-4 bg-[#F8F8F8] rounded-lg cursor-pointer"
                  >
                    <IconHome />
                    <div className="font-normal text-base text-main">
                      Tìm gara
                    </div>
                  </Link>
                  <div className="md:text-sm text-base font-normal mb-1 md:py-4 pt-3 text-[#91929D]">
                    Từ khóa gợi ý
                  </div>
                  <div className="grid md:grid-cols-1 grid-cols-2 gap-1">
                    {popularSearch &&
                      popularSearch
                        ?.slice(0, isMobile ? 4 : 3)
                        .map((item: any, index: number) => (
                          <TagRemove
                            key={index}
                            handleClose={(e: any) => {}}
                            onMouseDown={() => {}}
                            onClick={e => {
                              setQuery(e.key)
                            }}
                            type="enter"
                            item={item}
                          >
                            {item.key}
                          </TagRemove>
                        ))}
                  </div>
                </div>
                <div className="col-span-7 p-2">
                  <Tabs defaultValue={'product'}>
                    {query && (
                      <div className="flex gap-2 justify-center md:justify-start">
                        <Box
                          className={classNames(
                            'cursor-pointer border-b-4 px-10 py-4 font-semibold text-center',
                            currentTab === 'product' ? 'border-[#26D3E0]' : '',
                            isMobile ? 'flex-1' : ''
                          )}
                          onClick={() => setCurrentTab('product')}
                        >
                          Sản phẩm
                        </Box>
                        <Box
                          className={classNames(
                            'cursor-pointer border-b-4 px-10 py-4 font-semibold text-center',
                            currentTab === 'service' ? 'border-[#26D3E0]' : '',
                            isMobile ? 'flex-1' : ''
                          )}
                          onClick={() => setCurrentTab('service')}
                        >
                          Dịch vụ
                        </Box>
                      </div>
                    )}
                    {currentTab === 'product' && (
                      <div className="flex-col py-4">
                        {loading ? (
                          <ProductSkeleton />
                        ) : (
                          <div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-0 gap-x-2">
                              {dataSearch
                                ?.slice(0, 4)
                                ?.map((item: any, index: number) => (
                                  <div key={index}>
                                    <Link
                                      href={`/detail/${item?.slug?.toLocaleLowerCase()}`}
                                    >
                                      <TagProduct
                                        url={item?.detail_info?.images[0]}
                                        countRate={item?.countRate}
                                        rate={item?.product_sold?.rating ?? 5}
                                        price={item.price}
                                        sold={item?.product_sold?.sold ?? 0}
                                        title={item?.name}
                                        type={item?.type}
                                      />
                                    </Link>
                                  </div>
                                ))}
                            </div>
                            <Button
                              className="md:mt-10 mt-2 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-[10px] h-[43px] border-2 border-white w-full md:w-fit"
                              onClick={() => {
                                navigate(
                                  `/search?${objectToQueryString({
                                    type: 'SAN_PHAM',
                                    key: query,
                                    limit: 9,
                                    page: 1
                                  })}`
                                )
                              }}
                            >
                              {`Xem tất cả (${dataCount})`}
                            </Button>
                            {dataCount === 0 && (
                              <div className="flex p-4 md:pt-10 justify-center items-center gap-2">
                                <img
                                  className="w-10 h-10 object-cover rounded"
                                  src={'/box/sad-emoji.png'}
                                />
                                <Text className="font-medium text-xl text-main">
                                  {`Không tìm thấy kết quả nào trùng với “${query}”. Tìm kiếm nâng cao hơn với1`}{' '}
                                  <span
                                    className="cursor-pointer flex gap-x-2"
                                    onClick={() => {
                                      handleToggleChatModel()
                                      setShowDropdown(false)
                                      setQuery('')
                                    }}
                                  >
                                    <span className="text-[#26D3E0]">AI</span>
                                    <img
                                      className="w-6 h-6 object-cover rounded"
                                      src={'/box/AI-Icon.png'}
                                    />
                                  </span>
                                </Text>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {currentTab === 'service' && (
                      <div className=" flex-col py-4">
                        {loading ? (
                          <ProductSkeleton />
                        ) : (
                          <div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-0 gap-x-2">
                              {dataSearchService
                                ?.slice(0, 4)
                                ?.map((item: any, index: number) => (
                                  <div key={index}>
                                    <TagProduct
                                      url={item?.detail_info?.images[0]}
                                      countRate={item?.countRate}
                                      rate={item?.product_sold?.rating ?? 5}
                                      price={item?.price}
                                      sold={item?.product_sold?.sold ?? 0}
                                      title={item?.name}
                                      type={item?.type}
                                      onClick={() => {
                                        navigate(
                                          `/detail/${createQueryStringDetail({
                                            id: item?.product[0]?.product_id,
                                            title: item?.name
                                          })}`
                                        )
                                      }}
                                    />
                                  </div>
                                ))}
                            </div>
                            {dataCountService > 4 && (
                              <Link
                                href={`/search?${objectToQueryString({
                                  type: 'DICH_VU',
                                  key: query,
                                  limit: 9,
                                  page: 1
                                })}`}
                                className="md:mt-10 mt-2 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-[10px] h-[43px] border-2 border-white w-full md:w-fit"
                              >
                                {`Xem tất cả (${dataCountService - 4})`}
                              </Link>
                            )}
                            {dataCountService === 0 && (
                              <div className="flex p-4 md:pt-10 justify-center items-center gap-2">
                                <img
                                  className="w-10 h-10 object-cover rounded"
                                  src={'/box/sad-emoji.png'}
                                />

                                <Text className="font-medium text-xl text-main">
                                  {`Không tìm thấy kết quả nào trùng với “${query}”. Tìm kiếm nâng cao hơn với`}{' '}
                                  <span
                                    className="cursor-pointer flex gap-x-2"
                                    onClick={() => {
                                      handleToggleChatModel()
                                      setShowDropdown(false)
                                      setQuery('')
                                    }}
                                  >
                                    <span className="text-[#26D3E0]">AI</span>
                                    <img
                                      className="w-6 h-6 object-cover rounded"
                                      src={'/box/AI-Icon.png'}
                                    />
                                  </span>
                                </Text>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </Tabs>
                </div>
                <div className="col-span-3 flex-col px-3">
                  <div className="pb-10 hidden">
                    <div className="flex items-center gap-2 pb-2 md:my-4">
                      <div className="text-base md:text-sm font-normal text-[#91929D]">
                        Tin tức
                      </div>
                    </div>
                    <TagLabel
                      url="/box/ficar-image.png"
                      label="Lốp ad tốt nhất cho xe SUV"
                      postedDate="Đăng tải vào T8/2023"
                    />
                    <TagLabel
                      url="/box/ficar-image.png"
                      label="Lốp ad tốt nhất cho xe SUV"
                      postedDate="Đăng tải vào T8/2023"
                    />
                    <TagLabel
                      url="/box/ficar-image.png"
                      label="Lốp ad tốt nhất cho xe SUV"
                      postedDate="Đăng tải vào T8/2023"
                    />
                    <Text className="font-bold">Xem tất cả (23)</Text>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-6 pb-6 pr-2">
                {/* {newestSearches.length > 0 && ( */}
                <div className="md:col-span-1 py-2 md:px-4 px-2">
                  <div className="text-base font-semibold mb-2 text-[#91929D]">
                    Tìm kiếm gần đây
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-x-2 gap-y-1">
                    {newestSearches
                      ?.slice(0, 4)
                      ?.map((item: any, index: any) => (
                        <TagRemove
                          key={index}
                          handleClose={(e: any) => {
                            handleDeleteKey(e)
                          }}
                          onMouseDown={() => {}}
                          type="remove"
                          onClick={e => {
                            setQuery(e.key)
                          }}
                          item={item}
                        >
                          {item}
                        </TagRemove>
                      ))}
                  </div>
                </div>
                {/* )} */}

                <div className="md:col-span-3 p-2">
                  <div className="text-base font-semibold mb-2 text-[#91929D]">
                    Truy cập nhanh
                  </div>

                  {dataSearch?.length === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-2">
                      {quickLinks.map((item, index) => (
                        <div key={index}>
                          <Link
                            href={`/search?${objectToQueryString({
                              type: item.type,
                              // key: query,
                              limit: 9,
                              page: 1,
                              sort: ''
                            })}`}
                          >
                            <QuickTag
                              title={item?.title}
                              content={item?.content}
                              sale={item.sale}
                              url="/box/ficar-image.png"
                            />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="md:col-span-2 flex-col p-2">
                  <Title
                    order={4}
                    className="text-base font-semibold mb-1 text-[#91929D]"
                  >
                    Trợ giúp
                  </Title>
                  <div className="flex flex-col h-full gap-4">
                    <p
                      className="font-semibold underline cursor-pointer"
                      onClick={() => {
                        handleToggleChatModel()
                        setShowDropdown(false)
                        setQuery('')
                      }}
                    >
                      Tìm kiếm nâng cao hơn với
                      <span className="text-[#26D3E0] underline"> AI</span>
                    </p>

                    <Text className="underline cursor-pointer font-semibold">
                      Câu hỏi thường gặp
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </Paper>
        )}
      </div>
    </div>
  )
}

export default InputSearch

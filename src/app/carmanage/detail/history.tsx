import { selectHistoryCare } from '@/apis/client/history-care'
import { getGarageLike } from '@/apis/client/like-garage'
import TagStore from '@/components/custom/tag/tag-store'
import {
  Box,
  CloseButton,
  Flex,
  Grid,
  GridCol,
  Image,
  Input,
  Loader,
  Text
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import BoxHistory from '../component/BoxHistory'
import { HistoryCareType } from '@/apis/client/interface'
import useDebounce from '@/hooks/useDebounce'

const tabs = [
  {
    title: 'Bảo dưỡng, sửa chữa',
    url: '/box/bduong.png',
    type: 'BAO_DUONG_SUA_CHUA'
  },
  {
    title: 'Lốp',
    url: '/box/lop-xe-hot-deal.png',
    type: 'LOP'
  },
  // {
  //   title: "Phụ tùng, phụ kiện",
  //   url: "/box/pkien.png",
  // },
  {
    title: 'Ắc quy',
    url: '/box/ac-quy-ps.png',
    type: 'AC_QUY'
  }
]

const History = ({ id }: { id: string }) => {
  const [history, setHistory] = useState()
  const [loading, setLoading] = useState(false)
  const [keysearch, setKeysearch] = useState<any>()
  const [activeTab, setActiveTab] = useState('')

  const [search, setSearch] = useState<string | undefined>(undefined)

  const debounceSearch = useDebounce(search, 500)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data, key } = await selectHistoryCare({
          car_id: id,
          key: debounceSearch ? debounceSearch : '',
          //@ts-ignore
          type: activeTab
        })

        if (data)
          //@ts-ignore
          setHistory(data)

        setKeysearch(key)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [debounceSearch, activeTab])

  return (
    <div className="flex flex-col mx-auto px-2 md:gap-4 gap-3">
      <Text className="text-2xl md:text-4xl text-main font-semibold">
        Lịch sử chăm sóc xe
      </Text>
      <Box>
        <Input
          variant="filled"
          leftSection={<IconSearch color="#24CCD9" />}
          size="md"
          radius={'lg'}
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              onClick={() => {
                setSearch('')
              }}
              style={{
                display: search ? undefined : 'none',
                cursor: 'pointer'
              }}
            />
          }
        />
      </Box>
      <div className="flex w-full justify-around md:gap-4 gap-2">
        {tabs.map((item, index) => {
          return (
            <Box
              key={index}
              style={{
                background:
                  activeTab === item.type
                    ? '#a7ffe7c7'
                    : 'var(--Gradient, linear-gradient(180deg, rgba(38, 173, 204, 0.20) 0%, rgba(75, 224, 216, 0.20) 100%))'
              }}
              className="rounded-[10px] cursor-pointer w-full md:p-6 p-3 md:h-[160px]"
              onClick={() => {
                if (activeTab === item.type) {
                  setActiveTab('')
                  return
                }
                setActiveTab(item.type)
              }}
            >
              <Image
                src={item.url}
                className="object-contain h-[50px] md:h-[80px]"
              />
              <Text className="text-sm md:text-lg text-center font-semibold mt-2">
                {item.title}
              </Text>
            </Box>
          )
        })}
      </div>
      {loading ? (
        <Flex mih={300} justify={'center'} align={'center'}>
          <Loader />
        </Flex>
      ) : (
        <div className="flex flex-col gap-3 pb-10">
          {history &&
            //@ts-ignore
            history?.length > 0 &&
            //@ts-ignore
            history.map((item, idx) => {
              return <BoxHistory item={item} key={idx} keysearch={keysearch} />
            })}

          {
            //@ts-ignore
            history?.length === 0 && (
              <Flex justify={'center'} align={'center'}>
                <Text className="lg:text-[28px] text-[16px] mt-4">
                  Xe chưa có lịch sử chăm sóc
                </Text>
              </Flex>
            )
          }
        </div>
      )}
    </div>
  )
}

export default History

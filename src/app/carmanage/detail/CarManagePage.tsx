'use client'

import { Box, Flex, Image, LoadingOverlay, Text } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'

import { Car } from '../CarManageBox'
import DetailCar from './detailcar'
import FooterHome from '@/components/footer'
import GaraLike from './garaLike'
import HeaderBar from '@/components/header/header'
import History from './history'
import { getDetailCar } from '@/apis/managecar'
import { useSearchParams } from 'next/navigation'
import { IconArrowLeft, IconChevronRight } from '@tabler/icons-react'
import ModalDeleteCar from '../modal/modal-delete-car'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'

const CarManagePage = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [idSelect, setIdSelect] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const detailRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)
  const favoriteGarageRef = useRef<HTMLDivElement>(null)

  const tabs = [
    {
      label: 'Chi tiết xe',
      value: 'detail',
      ref: detailRef
    },
    {
      label: 'Lịch sử chăm sóc xe',
      value: 'history',
      ref: historyRef
    },
    {
      label: 'Gara yêu thích',
      value: 'favoriteGarage',
      ref: favoriteGarageRef
    }
  ]

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const searchParams = useSearchParams()
  const [carUser, setCarUser] = useState<Car | null>(null)

  const [opendDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)

  const refech = async () => {
    setLoading(true)
    try {
      const { data } = await getDetailCar(idSelect)
      if (data) setCarUser(data[0])
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // if (!idSelect) return
    refech()
  }, [idSelect])

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      setIdSelect(id)
    }
  }, [])
  return (
    <Box className="">
      <HeaderBar />
      <>
        <Box mih={'100vh'} className=" pt-[64px] md:pt-[100px]">
          <Flex
            className="max-w-main mx-auto py-1 hidden md:flex"
            align={'center'}
          >
            <Link href={'/carmanage'}>
              {' '}
              <p>Quản lý xe</p>
            </Link>
            <IconChevronRight size={16} />
            <Text className="text-base rounded-lg ">Chi tiết xe</Text>
          </Flex>
          {!loading && carUser ? (
            <div className=" relative">
              <Flex
                p={12}
                gap={12}
                style={{
                  boxShadow: '0px 4px 40px 0px rgba(0, 0, 0, 0.05)',
                  background: 'white',
                  position: 'relative',
                  zIndex: 10
                }}
                justify={'center'}
              >
                {tabs.map((tab, i) => {
                  return (
                    <Flex
                      key={i}
                      justify={'center'}
                      align={'center'}
                      style={
                        activeTab === i
                          ? {
                              background:
                                'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
                            }
                          : {}
                      }
                      className="rounded-[10px] cursor-pointer px-4 text-center"
                      h={40}
                      // w={120}
                      onClick={() => {
                        scrollToSection(tab.ref)
                        setActiveTab(i)
                      }}
                    >
                      <Text
                        className={`text-sm md:text-base ${
                          activeTab === i && 'text-white'
                        }`}
                      >
                        {tab.label}
                      </Text>
                    </Flex>
                  )
                })}
              </Flex>
              {/* {activeTab === 0 && (
              <DetailCar
                car={carUser}
                refech={refech}
                setRefech={setRefech}
              />
              )}
              {activeTab === 1 && <History id={idSelect} />}
              {activeTab === 2 && <GaraLike />} */}
              <div
                onClick={openDelete}
                className="absolute top-[84px] right-[5%] z-20"
              >
                <Image sizes="24px" src="/svg/deletered.svg" />
              </div>
              <Box className="max-w-main mx-auto flex flex-col">
                <Box ref={detailRef}>
                  <DetailCar car={carUser} refech={refech} />
                </Box>
                <Box ref={historyRef}>
                  <History id={idSelect} />
                </Box>
                <Box ref={favoriteGarageRef}>
                  <GaraLike />
                </Box>
              </Box>
            </div>
          ) : (
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />
          )}
        </Box>
      </>
      <ModalDeleteCar
        opendDelete={opendDelete && Boolean(idSelect)}
        closeDelete={closeDelete}
        refetch={refech}
        id={idSelect}
      />
      <FooterHome />
    </Box>
  )
}

export default CarManagePage

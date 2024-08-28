import { navigate } from '@/apis/auth'
import { getGarageLike } from '@/apis/client/like-garage'
import TagStore from '@/components/custom/tag/tag-store'
import { Box, Flex, Grid, Loader, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useEffect, useState } from 'react'

interface PropsGaraLike {
  data: any[]
  count: number
}

const GaraLike = () => {
  const [dataLikes, setDataLikes] = useState<PropsGaraLike>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const getGaraLike = async () => {
      try {
        const data = await getGarageLike()

        //@ts-ignore
        setDataLikes(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getGaraLike()
  }, [])

  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <Flex
      className="flex flex-col mx-auto gap-4 md:gap-2 mt-2"
      px={isMobile ? 10 : 0}
    >
      <Text className="text-2xl md:text-4xl text-main font-semibold">
        Gara yêu thích
      </Text>
      {/* <Box>
        <Input
          variant="filled"
          leftSection={<IconSearch color="#24CCD9" />}
          size="md"
          radius={'lg'}
        />
      </Box> */}
      {loading ? (
        <Flex mih={300} justify={'center'} align={'center'}>
          <Loader />
        </Flex>
      ) : (
        <Box>
          {dataLikes && dataLikes?.data.length > 0 && (
            <Grid mih={300} pb={80} px={12}>
              {dataLikes?.data.map((item, index) => {
                return (
                  <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
                    <TagStore
                      // url={item.detail_info?.images[0]}
                      url={item?.garage.avatar}
                      title={item?.garage.name}
                      type={item?.type}
                      address={item.garage.information?.address}
                      price={'----123'}
                      rate={item.garage.garage_sold.rating}
                      countRate={item.garage.garage_sold.count_rating}
                      sold={1}
                      workingTime={item?.garage?.description?.times}
                      onClick={() => {
                        navigate(`/search/garage/${item?.garage.id}`)
                      }}
                      services={item?.garage.information?.service}
                    />
                  </Grid.Col>
                )
              })}
            </Grid>
          )}
          {
            //@ts-ignore
            dataLikes?.data.length === 0 && (
              <Flex justify={'center'} align={'center'}>
                <Text className="text-base md:text-[24px] my-4 mb-10">
                  Chưa có gara yêu thích
                </Text>
              </Flex>
            )
          }
        </Box>
      )}
    </Flex>
  )
}

export default GaraLike

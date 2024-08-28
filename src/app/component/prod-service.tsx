import { Box, Flex, Grid, Image, Text } from '@mantine/core'
import classes from './prod-service.module.css'
import Link from 'next/link'
import { IconArrowUpRight } from '@tabler/icons-react'
import classNames from 'classnames'

const ProdService = () => {
  return (
    <Box className={classNames(classes.main, 'md:pt-20 pt-16 pb-5')}>
      <Flex direction="column" align="center">
        <div className="text-main text-2xl md:text-5xl font-bold">
          Khám phá Sản phẩm - Dịch vụ
        </div>
        <div className="text-main text-md md:text-2xl font-semibold mt-3">
          Mạng lưới gara rộng và uy tín
        </div>
      </Flex>

      <Text
        className={classNames('md:block hidden')}
        style={{
          fontSize: '230px',
          fontWeight: 800,
          textTransform: 'uppercase',
          lineHeight: '120%',
          letterSpacing: '10px',
          background:
            'linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          // position: 'absolute',
          // top: '220px',
          // left: '50%',
          // transform: 'translateX(-50%)',
          zIndex: -1,
          textAlign: 'center'
        }}
      >
        Trolyoto
      </Text>

      <Flex
        justify="center"
        columnGap="10%"
        align="center"
        className="md:mt-0 mt-10 md:pr-12"
      >
        <Box className="relative flex-1">
          <Image src="/box/lop-xe-ps.png" alt="lop xe" />
          <Link
            href={
              '/search?is_init=true&key=Lốp&limit=9&order_price=false&page=1&sort=&type=SAN_PHAM'
            }
          >
            <Flex justify={'center'} align={'center'} className="mt-2">
              <p className="text-center md:hidden ">Lốp</p>
              {/* <IconArrowUpRight size={18} className="" /> */}
            </Flex>
          </Link>
          <Box className="absolute top-[35%] left-[40%] hidden md:block">
            <Image src="/background/subtract.png" className="min-w-[370px]" />
            <Image
              src="/background/dot.png"
              w={40}
              className="absolute top-9 -left-7"
            />
            <Box className="absolute top-8 left-16">
              <Text className="text-white text-[24px] font-semibold mb-3">
                Lốp
              </Text>
              <Text className="text-white text-[16px] w-[210px]">
                Discover more with a tire that needs less.
              </Text>
            </Box>
            <Link
              href={
                '/search?is_init=true&key=Lốp&limit=9&order_price=false&page=1&sort=&type=SAN_PHAM'
              }
            >
              <Box
                w={52}
                h={52}
                className="rounded-full bg-white absolute right-8 top-[70px] cursor-pointer"
              >
                <IconArrowUpRight size={36} className="absolute top-2 left-2" />
              </Box>
            </Link>
          </Box>
        </Box>

        <Box className="relative -mt-8 md:mt-0 flex-1">
          <Image src="/box/ac-quy-ps.png" alt="ac quy" />
          <Link
            href={
              '/search?is_init=true&key=Ác%20quy&limit=9&order_price=false&page=1&sort=&type=SAN_PHAM'
            }
          >
            <Flex justify={'center'} align={'center'}>
              <p className="text-center md:hidden -mb-5">Ắc quy</p>
              {/* <IconArrowUpRight size={18} className="" /> */}
            </Flex>
          </Link>
          <Box className="absolute top-[35%] left-[20%] hidden md:block">
            <Image src="/background/subAcquy.png" className="min-w-[370px]" />
            <Image
              src="/background/dot.png"
              w={40}
              className="absolute top-9 -left-7"
            />
            <Box className="absolute top-8 left-16">
              <Text className="text-white text-[24px] font-semibold mb-3">
                Ắc quy
              </Text>
              <Text className="text-white text-[16px] w-[210px]">
                Discover more with a tire that needs less.
              </Text>
            </Box>
            <Link
              href={
                '/search?is_init=true&key=Ác%20quy&limit=9&order_price=false&page=1&sort=&type=SAN_PHAM'
              }
            >
              <Box
                w={52}
                h={52}
                className="rounded-full bg-white absolute right-8 top-[70px]"
              >
                <IconArrowUpRight size={36} className="absolute top-2 left-2" />
              </Box>
            </Link>
          </Box>
        </Box>

        <Box className="relative flex-1 ">
          <Image
            src="/box/image-ps-1.png"
            alt="image-ps=1"
            className="w-[80%]"
          />
          <Link href={'search?key=&limit=9&page=1&sort=&type=DICH_VU'}>
            <Flex justify={'center'} align={'center'} className="mt-2">
              <p className="text-center md:hidden ">Bảo dưỡng Sửa chữa</p>
              {/* <IconArrowUpRight size={18} className="" /> */}
            </Flex>
          </Link>
          <Box className="absolute top-[30%] left-[12%] hidden md:block">
            <Image src="/background/sub3.png" className="min-w-[370px]" />
            <Image
              src="/background/dot.png"
              w={40}
              className="absolute top-9 -left-7"
            />
            <Box className="absolute top-4 left-20 ">
              <Text className="text-white text-[24px] font-semibold max-w-[180px]">
                Bảo dưỡng Sửa chữa
              </Text>
              <Text className="text-white text-[16px] max-w-[200px]">
                Discover more with a tire that needs less.
              </Text>
            </Box>
            <Link href={'/search?key=&limit=9&page=1&sort=&type=DICH_VU'}>
              <Box
                w={52}
                h={52}
                className="rounded-full bg-white absolute right-8 top-[70px]"
              >
                <IconArrowUpRight size={36} className="absolute top-2 left-2" />
              </Box>
            </Link>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
export default ProdService

'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/custom/card/card'
import { Box, Button, Image, Modal, Text } from '@mantine/core'

import Link from 'next/link'
import { useState } from 'react'
import Signup from '../signup/Signup'
import LoginForm from './LoginForm'
import { OAuthButtons } from './oauthSignin'

function LoginPage() {
  const [tabs, setTab] = useState('login')
  const [openToS, setOpenToS] = useState(false)
  const [openPrivacy, setOpenPrivacy] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  return (
    <div
      className="h-full min-h-[100vh] flex flex-col justify-center items-center"
      style={{
        backgroundImage: 'url(/logo/login_bg.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div
        className="fixed flex md:flex-row flex-row items-center top-0 md:px-10 pl-5
      w-full mt-2"
      >
        <Link href="/">
          <img
            src="/logo/applogo.png"
            className="relative md:absolute md:w-[120px] md:top-0 w-[100px] md:block"
          />
        </Link>
        <div className=" md:text-4xl text- font-black text-white md:py-6 py-2 mx-auto  md:block">
          TRỢ LÝ Ô TÔ luôn bên bạn!
        </div>
      </div>

      <div>
        <div>
          {!signupSuccess && (
            <Card className="md:mt-24 mt-12 md:w-[750px] px-3 py-2 md:rounded-[42px] rounded-3xl bg-white bg-opacity-25 backdrop-blur-xl mx-2 md:mx-auto overflow-y-auto">
              <div className="flex justify-center">
                <CardHeader
                  onClick={() => {
                    setTab('login')
                  }}
                >
                  <CardTitle
                    className={`md:text-3xl text-2xl text-center cursor-pointer ${
                      tabs === 'login'
                        ? 'text-white'
                        : 'text-white text-opacity-70'
                    } `}
                  >
                    Đăng nhập
                  </CardTitle>
                </CardHeader>
                <CardHeader
                  onClick={() => {
                    setTab('signup')
                  }}
                >
                  <CardTitle
                    className={`md:text-3xl text-2xl text-center cursor-pointer ${
                      tabs === 'signup'
                        ? 'text-white'
                        : 'text-white text-opacity-70'
                    } `}
                  >
                    Đăng ký
                  </CardTitle>
                </CardHeader>
              </div>
              {tabs === 'login' && (
                <CardContent className="flex flex-col md:gap-4 gap-2">
                  <LoginForm />
                  <label className="text-sm text-center text-white">
                    Hoặc đăng nhập bằng
                  </label>
                  <OAuthButtons />
                  <div className="border-t border-white border-opacity-30"></div>

                  <div className="flex justify-center text-center text-sm text-white gap-2">
                    Bạn chưa có tài khoản?
                    <Box
                      onClick={() => setTab('signup')}
                      className="gradientText font-bold cursor-pointer"
                    >
                      Đăng ký ngay
                    </Box>
                  </div>
                </CardContent>
              )}
              {tabs === 'signup' && (
                <CardContent className="flex flex-col md:gap-4 gap-2 px-1">
                  <Signup
                    setOpenService={() => {
                      setOpenToS(true)
                    }}
                    setOpenPolicy={() => {
                      setOpenPrivacy(true)
                    }}
                    setSignupSucceed={() => {
                      setSignupSuccess(true)
                    }}
                  />
                  <label className="text-sm text-center text-white">
                    Hoặc đăng ký bằng
                  </label>
                  <OAuthButtons />
                  <div className="border-t border-white border-opacity-30"></div>
                  <div className="flex justify-center text-center text-sm text-white gap-2">
                    Bạn đã có tài khoản?
                    <Box
                      onClick={() => setTab('login')}
                      className="gradientText font-bold cursor-pointer"
                    >
                      Đăng nhập
                    </Box>
                  </div>
                </CardContent>
              )}
            </Card>
          )}
          {signupSuccess && (
            <Card className="mx-auto mt-24 w-[90%] md:min-w-[500px] px-8 py-10 rounded-[42px] bg-white bg-opacity-25 backdrop-blur-xl">
              <div className="flex flex-col justify-center">
                <Box className="flex justify-center">
                  <Image src="/svg/checkout_success.svg" w={272} />
                </Box>
                <Box>
                  <Text className="text-3xl text-center font-bold text-white pt-10">
                    Đăng ký thành công
                  </Text>
                </Box>
                <Text className="text-sm text-center font-normal text-white py-6">
                  Cảm ơn bạn đã đăng ký tài khoản thành công tại Trợ lý ô tô
                  {/* <Link
                    className="text-blue-600 underline"
                    href={'https://ficar-fe-deploy.vercel.app/'}
                  >
                    trolyoto.com
                  </Link> */}
                </Text>
                <Button
                  onClick={() => {
                    setTab('login')
                    setSignupSuccess(false)
                  }}
                  className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none"
                >
                  Đóng
                </Button>
              </div>
            </Card>
          )}
          {/* {signupError && (
            <Card className="mx-auto mt-24 w-[90%] md:min-w-[800px] px-8 py-10 rounded-[42px] bg-white bg-opacity-25 backdrop-blur-xl">
              <div className="flex flex-col justify-center">
                <Box className="flex justify-center">
                  <IconCircleX color="#F8664F" size={60} />
                </Box>
                <Box>
                  <Text className="text-3xl text-center font-bold text-white pt-10">
                    Đăng ký không thành công
                  </Text>
                </Box>
                <Text className="text-sm text-center font-normal text-white py-6">
                  {message}
                </Text>
                <Button
                  onClick={() => setSignupError(false)}
                  className="w-full h-12 bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-xl border-none"
                >
                  Đóng
                </Button>
              </div>
            </Card>
          )} */}
        </div>
      </div>

      <Modal
        opened={openToS}
        onClose={() => setOpenToS(false)}
        title={
          <h1 className="text-3xl text-center font-bold">
            Điều khoản dịch vụ{' '}
          </h1>
        }
        size={'xl'}
        centered
      >
        {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}{' '}
      </Modal>

      <Modal
        opened={openPrivacy}
        onClose={() => setOpenPrivacy(false)}
        title={
          <h1 className="text-3xl text-center font-bold">Chính sách bảo mật</h1>
        }
        size={'xl'}
        centered
      >
        {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}{' '}
      </Modal>
    </div>
  )
}

export default LoginPage

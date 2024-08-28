'use client'
import FormUserDetails from '@/app/(account-management)/(pages)/profile/_components/FormUserDetails'
import { useAuth } from '@/components/context/auth.context'
import CustomUpload from '@/components/image/CustomUpload'
import { getFileUrl } from '@/utils/images'
import { Box, Image, Skeleton, Text } from '@mantine/core'
import dayjs from 'dayjs'
import { useState } from 'react'

function ProfilePage() {
  const { user: dataUser, loading, handleGetAuthInfo: refetch } = useAuth()

  const [editMode, setEditMode] = useState(false)
  const [reviewImages, setReviewImages] = useState([])

  const titleName =
    //  @ts-ignore
    (dataUser?.username ?? dataUser?.phone ?? dataUser?.email) || ''

  return (
    <div className={'user-details md:ml-6 px-2 md:px-0'}>
      <div className="flex justify-between">
        <h1 className={'text-xl text-[#222] hidden md:block'}>
          Hồ sơ tài khoản
        </h1>
        <Box className="">
          {dataUser && (
            <Text
              className=" border-[#24CCD9] cursor-pointer py-[8px] px-[16px] text-center border rounded-lg font-semibold flex gap-1"
              onClick={() => setEditMode(true)}
              style={{
                background:
                  'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              <Box>
                <Image src={'/svg/pencil.svg'} width={24} height={24} />
              </Box>
              Chỉnh sửa
            </Text>
          )}
        </Box>
      </div>
      <div
        className={
          'flex flex-col items-center md:items-start md:flex-row md:gap-14 mt-4'
        }
      >
        <aside className="mb-2 md:mb-0">
          <div
            className={'w-full flex flex-col items-start justify-center gap-2'}
          >
            {loading || !dataUser ? (
              <div className={'w-40 gap-2 flex flex-col items-center'}>
                <Skeleton className={'block w-32 h-32 rounded-full bg-main'} />
                <Skeleton
                  className={
                    'block w-full h-8 border-1 border-[#24CCD9] bg-transparent hover:bg-transparent'
                  }
                />
                <Skeleton className={'block w-5/6 h-6'} />
              </div>
            ) : (
              <div className={'w-40 gap-2 flex flex-col items-center'}>
                {!editMode && (
                  <Image
                    src={
                      //@ts-ignore
                      getFileUrl(dataUser.avatar)
                    }
                    width={140}
                    height={140}
                    className={
                      ' max-w-[140px] object-cover max-h-[140px] min-h-[140px] w-[140px]  h-[140px] rounded-full bg-main'
                    }
                    alt={titleName}
                  />
                )}
                {editMode && (
                  <>
                    <CustomUpload
                      files={reviewImages}
                      setFiles={(newFiles: any) => {
                        setReviewImages(newFiles)
                      }}
                      icon="/svg/image-icon.svg"
                      acceptType="image"
                      size={1}
                      placeholder="Chọn ảnh"
                      previewImgs={[
                        {
                          //@ts-ignore
                          url: dataUser.avatar
                        }
                      ]}
                    />
                    <Text
                      className={
                        'text-[10px] text-[#333] block w-full text-center'
                      }
                    >
                      Dung lượng file ảnh tối đa 1 MB Định dạng:.JPEG, .PNG
                    </Text>
                  </>
                )}
                {/* <Button
                  className={
                    'block w-full border-1 border-[#24CCD9] bg-transparent hover:bg-transparent'
                  }
                >
                  <TextGradiant>Chọn ảnh</TextGradiant>
                </Button> */}
              </div>
            )}
          </div>
        </aside>
        <div className="w-full">
          <Box className="bg-white md:p-6 pt-0 rounded-[20px] md:min-w-[480px]">
            <div className={'w-full flex gap-1 mb-2'}>
              <span className={'block min-w-[120px]'}>Tên đăng nhập:</span>
              {loading ? (
                <Skeleton className={'inline-block w-full min-w-[120px] h-6'} />
              ) : (
                <p className={''}> {titleName}</p>
              )}
            </div>
            {editMode ? (
              <FormUserDetails
                isLoading={loading}
                user={dataUser}
                refetch={refetch}
                setEditMode={setEditMode}
                reviewImages={reviewImages}
                setReview={setReviewImages}
              />
            ) : (
              <div>
                {loading || !dataUser ? (
                  <div className={'w-40 gap-2 flex flex-col items-center'}>
                    <Skeleton
                      className={'block w-32 h-32 rounded-full bg-main'}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <p>Họ và tên: </p>
                      <p className="">
                        {
                          //@ts-ignore
                          dataUser?.name
                        }
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p>Email: </p>
                      <p className="">{dataUser?.email}</p>
                    </div>
                    <div className="flex gap-1">
                      <p>Giới tính: </p>
                      <p className="">
                        {
                          //@ts-ignore
                          dataUser?.sex === 'MALE' ? 'Nam' : 'Nữ'
                        }
                      </p>
                    </div>
                    {
                      <div className="flex gap-1">
                        <p>Ngày/tháng/năm sinh: </p>
                        <p className="">
                          {
                            //@ts-ignore
                            dataUser?.birthday
                              ? //@ts-ignore
                                dayjs(dataUser?.birthday).format('DD/MM/YYYY')
                              : 'Chưa có dữ liệu'
                          }
                        </p>
                      </div>
                    }
                  </div>
                )}
              </div>
            )}
          </Box>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

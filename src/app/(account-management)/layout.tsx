import Footer from '@/components/footer'
import HeaderBar from '@/components/header/header'
import Aside from './_components/Aside'

function AccountManagementLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <HeaderBar type="app" />
      <div
        className={
          'relative w-full md:py-4 py-3 md:top-[100px] top-[60px] pl-3 bg-[#F8F8F8] md:text-[20px] text-xl mx-auto'
        }
      >
        <p className="max-w-main mx-auto md:pl-14">Quản lý tài khoản</p>
      </div>
      <div className="max-w-main mx-auto">
        <div
          className="md:px-12 md:py-4 p-2 w-full  flex flex-col md:flex-row gap-5 md:mt-[100px] mt-[60px] mx-auto"
          style={{ minHeight: 'calc(100vh - 90px - 242px)' }}
        >
          <Aside className={'md:border-r px-5 hidden md:block'} />
          <main className="w-full max-w-main flex-1">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AccountManagementLayout

import HotDeal from '@/app/component/hot-deal'
import ProdService from '@/app/component/prod-service'
import FooterHome from '@/components/footer'
import Header from '@/components/header'
import QuoteDocs from './component/quote-docs'
import ThematicPrice from './component/thematic-price'
import classes from './page.module.css'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export default async function HomePage() {
  return (
    <main className="">
      <section className={classes.mainSection}>
        <Header />
      </section>

      <section>
        <ProdService />
      </section>

      <section>
        <HotDeal />
      </section>

      {/* <section>
        <QuoteDocs />
      </section> */}

      <section>
        <ThematicPrice />
      </section>

      <section>
        <FooterHome />
      </section>
    </main>
  )
}

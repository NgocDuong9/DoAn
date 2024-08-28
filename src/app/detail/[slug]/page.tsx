import { Fragment } from 'react'
import ProductSubInfo from './ProductSubInfo'
import { getProductBySlug } from '@/apis/detail'

export default async function Page({ params }: { params: { slug: string } }) {
  const { data, key, relates } = await getProductBySlug(params.slug as string)

  return (
    <Fragment>
      <ProductSubInfo product={data} searchKey={key} relates={relates} />
    </Fragment>
  )
}

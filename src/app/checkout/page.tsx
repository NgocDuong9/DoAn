import { Suspense } from 'react'
import Checkout from './Checkout'

const CheckoutSuspense = () => {
  return (
    <Suspense>
      <Checkout />
    </Suspense>
  )
}

export default CheckoutSuspense

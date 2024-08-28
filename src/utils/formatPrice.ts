import { IDiscountType } from '@/types/order'

export const formatNumber = (value: number | string | undefined) => {
  if (value === undefined) return

  if (Number(value) < 1) {
    return '0đ'
  }
  return value.toLocaleString('en-US') + 'đ'
}
export const renderValue = (value: any) => {
  if (value <= 15) {
    return Math.floor((value * 500000) / 15) // 0 to 500K
  }
  if (value > 15 && value <= 30) {
    return Math.floor(500000 + ((value - 15) * 500000) / 15) // 500K to 1M
  }
  if (value > 30 && value <= 50) {
    return Math.floor(1000000 + ((value - 30) * 1000000) / 20) // 1M to 2M
  }
  if (value > 50 && value <= 70) {
    return Math.floor(2000000 + ((value - 50) * 3000000) / 20) // 2M to 5M
  }
  if (value > 70 && value <= 90) {
    return Math.floor(5000000 + ((value - 70) * 5000000) / 20) // 5M to 10M
  }
  if (value > 90) {
    return Math.floor(10000000 + ((value - 90) * 10000000) / 10) // 10M to 20M
  }
}

export const filterPrice = (item: any, type: any) => {
  if (item.length === 2 && type === 'from') {
    return renderValue(item[0])
  }
  if (item.length === 2 && type === 'to') {
    return renderValue(item[1])
  }
}

export function formatPrice(amount: number) {
  const currencyCode = 'VND'
  const locale = 'vi'
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  })

  return formatCurrency.format(amount)
}

export const getProductPriceWithDiscount = (classifies: any) => {
  if (!classifies)
    return {
      originPrice: 0,
      promotePrice: 0,
      discount_type: 0
    }

  const { discount_number, discount_type, price } = classifies

  if (discount_type === IDiscountType.CURRENCY) {
    return {
      originPrice: price,
      promotePrice: price - discount_number > 0 ? price - discount_number : 0,
      discount_type,
      discount_number
    }
  }

  if (discount_type === IDiscountType.PERCENT) {
    return {
      originPrice: price,
      promotePrice: price * (1 - discount_number / 100),
      discount_type,
      discount_number
    }
  }

  return {
    originPrice: price,
    promotePrice: price,
    discount_type,
    discount_number
  }
}

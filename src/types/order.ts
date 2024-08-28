export enum OrderStatus {
  'INPROGESS' = 'INPROGESS',
  'COMPLETED' = 'COMPLETED',
  'USER_CONFIRMED' = 'USER_CONFIRMED',
  'CANCELED' = 'CANCELED'
}

export interface IOrder {
  id: string
  code: string
  type: string
  price: number
  status: string
  note: string
  user_id: string
  voucher: any
  car_id: string
  phone: string
  updated_at: string
  created_at: string
  time: Time
  garage_id: string
  auth_id: string
  name: string
  license_plate: string
  carType: string
  status_note: string
  order_time: any
  search_name_product_or_service: string
  logs: Logs
  car: Car
  garage: Garage
  orderItem: OrderItem[]
  review: any[]
}

export interface Time {
  old_time: string
  order_time: string
  order_time_without_format: string
}

export interface Logs {
  data: Daum[]
}

export interface Daum {
  desc: string
  status: string
  created_at: string
  created_by: string
}

export interface Car {
  id: string
  name: string
  type: string
  color: string
  detail: Detail
  auth_id: string
  user_id: string
  carType_id: string
  created_at: string
  updated_at: string
  license_plate: string
}

export interface Detail {
  year: string
  purpose: string
  registry: string
  insurance: string
  maintenance: string
}

export interface Garage {
  id: string
  name: string
  avatar: any
  status: boolean
  auth_id: string
  hotline: any
  payment: Payment
  created_at: string
  updated_at: string
  description: Description
  information: Information
  merchant_id: string
}

export interface Payment {
  fee: string
  card: boolean
  money: boolean
  banking: boolean
  'free-amount': number
  'elect-wallet': string[]
}

export interface Description {
  fee: boolean
  size: number
  year: number
  times: Time2[]
  device: string
  acreage: number
  between: string[]
}

export interface Time2 {
  day: string
  time: string[]
  work: boolean
}

export interface Information {
  tag: string
  name: string
  ward: string
  address: string
  hotline: string
  service: string[]
  district: string
  province: string
}

export interface OrderItem {
  id: string
  note: string
  type: string
  count: number
  price: number
  detail: Detail2
  auth_id: string
  product: Product
  order_id: string
  created_at: string
  product_id: string
  updated_at: string
}

export interface Detail2 {
  classifies: Classify
  accompanies: Accompany[]
}

export interface Classify {
  price: number
  stock: string
  manufacture: number
  discount_type: string
  discount_number: number
}

export interface Accompany {
  name: string
  type: string
  price: number
}

export interface Product {
  id: string
  name: string
  sold: number
  type: string
  price: number
  status: boolean
  verify: boolean
  auth_id: string
  garage_id: string
  sell_info: SellInfo
  created_at: string
  key_search: string[]
  product_id: string
  updated_at: string
  category_id: string
  description: string
  detail_info: DetailInfo
  array_fields: string[]
  category_code: string
}

export interface SellInfo {
  price: number
  stock: string
  price_to: number
  price_from: number
  accompanies: Accompany2[]
  discount_type: string
  discount_number: number
}

export interface Accompany2 {
  name: string
  type: string
  price: number
}

export interface DetailInfo {
  name: string
  images: string[]
  videos: any[]
  description: string
  accompany_note: string
  accompany_type: string
}

export enum ITogetherType {
  BUY = 'BUY',
  DISCOUNT = 'DISCOUNT',
  GIFT = 'GIFT'
}

export const MapAccompaniesLabel: Record<string, any> = {
  BUY: {
    label: 'Mua kèm',
    color: '#26D3E1'
  },
  DISCOUNT: {
    label: 'Giảm giá',
    color: '#53C38D'
  },
  GIFT: {
    label: 'Quà tặng',
    color: '#F1B44C'
  }
}

export const MapStatus: Record<OrderStatus | string, any> = {
  CANCELED: {
    color: '#EB5757',
    label: 'Đã hủy'
  },
  COMPLETED: {
    color: '#34C38F',
    label: 'Đã hoàn thành'
  },
  INPROGESS: {
    color: '#2696BF',
    label: 'Đã đặt lịch'
  },
  USER_CONFIRMED: {
    color: '#2FD7DF',
    label: 'KH đã xác nhận'
  }
}

export enum IDiscountType {
  CURRENCY = 'CURRENCY',
  NUMBER = 'NUMBER',
  PERCENT = 'PERCENT'
}

export interface OrderItemDetail {
  id: string
  note: string
  type: string // Consider using an enum for better type safety
  count: number
  price: number
  detail: {
    classifies: {
      price: number
      stock: string // Consider using an enum for better type safety
      manufacture: number
      discount_type?: string
      discount_number?: number
    }
    accompanies: {
      name: string
      type: ITogetherType // Consider using an enum for better type safety
      price: number
    }[]
  }
  auth_id: string | null
  product: {
    id: string
    name: string
    sold: number
    type: string // Consider using an enum for better type safety
    price: number
    status: boolean
    verify: boolean
    auth_id: string
    garage_id: string
    sell_info: {
      price_to: number
      classifies: {
        price: number
        stock: string // Consider using an enum for better type safety
        manufacture: number
      }
      price_from: number
      accompanies: any[] //  You might want to define a more specific type for this
    }
    created_at: string // Consider using a Date type
    key_search: (string | null)[]
    product_id: string
    updated_at: string // Consider using a Date type
    category_id: string
    description: string
    detail_info: {
      name: string
      images: string[]
      origin: string
      videos: string[]
      weight: string
      key_rim: string
      key_size: string
      key_brand: string
      key_class: string
      key_speed: string
      key_tread: string
      description: string
      key_vehicle: string
      key_pressure: string
      accompany_note: string
      accompany_type: string
    }
    array_fields: string[]
    category_code: string
  }
  order_id: string
  created_at: string // Consider using a Date type
  product_id: string
  updated_at: string // Consider using a Date type
}

export interface OrderDetail {
  id: string
  code: string
  type: string // Consider using an enum for order types
  price: number
  status: OrderStatus // Use your existing OrderStatus enum
  note?: string // Optional, as it might be null
  user_id: string
  voucher: string | null
  car_id: string
  phone: string
  updated_at: string
  created_at: string
  time: {
    old_time?: string // Optional, might not be present
    order_time: string
    order_time_without_format: string // ISO date string
  }
  garage_id: string
  auth_id: string
  name: string
  license_plate: string
  carType: string
  status_note?: string
  order_time: string
  search_name_product_or_service: string
  logs: {
    data: Array<{
      desc: any
      status: string
      created_at: string
      created_by: string
    }>
  }
  detail: any | null // Unclear structure, adjust based on your actual data
  orderItem: Array<OrderItemDetail>
  car: {
    id: string
    name: string
    type: string // Consider an enum for car types
    color: string
    detail: {
      year: string
      purpose: string
      registry: string // ISO date string
      insurance: string // ISO date string
      maintenance: string // ISO date string
    }
    auth_id: string
    default: boolean
    user_id: string
    carType_id: string
    created_at: string
    updated_at: string
    license_plate: string
  }
}

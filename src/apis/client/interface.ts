export interface QueryProductInterface {
  key?: string // key search
  type?: TypeSearch
  category?: string[] // linh vuc
  province?: string[] // khu vuc
  price_from?: number //gia
  price_to?: number //gia
  key_brand?: string[] // thuong hieu
  origin?: string[] // xuat xu
  key_type?: string[] // loai ac quy
  key_voltage?: string[] // dien ap ac quy
  key_capacity?: string[] // dung luong ac quy
  key_treadCode?: string[] // ma gai lop
  key_rim?: string[] //la-zang lop
  page: number //page
  limit: number //limit record
  order_price: any // order sort price product,
  tags?: any[]
}

export interface OptionSelect {
  value: string | number
  label: string
  disabled?: boolean
  color?: string
}
export type IListCategory = {
  id: string
  name: string
  key: string
  parent_code: string | null
  parent_id: string | null
  type: ITypeCategory
  category: ICategory
  description: string | null
}

export enum ICategory {
  FILTER = 'FILTER',
  TIRE = 'TIRE',
  BATTERY = 'BATTERY',
  ACCESSARY = 'ACCESSARY',
  EXCEPTION = 'EXCEPTION'
}
export enum ITypeCategory {
  BRAND = 'BRAND',
  RIM = 'RIM',
  TREAD = 'TREAD',
  SIZE = 'SIZE',
  VEHICLE = 'VEHICLE',
  COUNTRY = 'COUNTRY',
  CAPACITY = 'CAPACITY',
  GUARANTEE = 'GUARANTEE',
  VOLTAGE = 'VOLTAGE',
  CODE = 'CODE',
  TYPE = 'TYPE',
  FIELD = 'FIELD',
  PRODUCT_TYPE = 'PRODUCT_TYPE',
  SERVICE_TYPE = 'SERVICE_TYPE',
  MAINTENANCE = 'MAINTENANCE'
}

export enum TypeSearch {
  SAN_PHAM = 'SAN_PHAM',
  DICH_VU = 'DICH_VU',
  GARAGE = 'GARAGE'
}

export enum OrderStatus {
  'INPROGESS' = 'INPROGESS',
  'COMPLETED' = 'COMPLETED',
  'USER_CONFIRMED' = 'USER_CONFIRMED',
  'CANCELED' = 'CANCELED'
}

export enum ProductType {
  LOP = 'LOP',
  AC_QUY = 'AC_QUY',
  CUU_HO = 'CUU_HO',
  PHU_TUNG = 'PHU_TUNG',
  NOI_NGOAI_THAT = 'NOI_NGOAI_THAT',
  DO_XE = 'DO_XE'
}

export enum ServiceType {
  BAO_DUONG_SUA_CHUA = 'BAO_DUONG_SUA_CHUA',
  MAY = 'MAY',
  GAM = 'GAM',
  DIEN = 'DIEN',
  DIEU_HOA = 'DIEU_HOA',
  THAN_VO = 'THAN_VO',
  BAO_DUONG_SUA_CHUA_KHAC = 'BAO_DUONG_SUA_CHUA_KHAC',
  CUU_HO = 'CUU_HO',
  DO_XE = 'DO_XE'
}

export enum HistoryCareType {
  BAO_DUONG_SUA_CHUA = 'BAO_DUONG_SUA_CHUA',
  LOP = 'LOP',
  AC_QUY = 'AC_QUY',
  PHU_TUNG_PHU_KIEN = 'PHU_TUNG_PHU_KIEN'
}

export enum ObjectTypeReview {
  GARAGE = 'GARAGE',
  DICH_VU = 'DICH_VU',
  LOP = 'LOP'
}

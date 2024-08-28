import { ProductType, ServiceType } from '@/apis/client/interface'

export const PRODUCT_CATEGORY = [
  {
    name: 'Ắc quy',
    key: ProductType.AC_QUY
  },
  {
    name: 'Lốp',
    key: ProductType.LOP
  }
  // {
  //   name: 'Nội -  ngoại thất',
  //   key: ProductType.NOI_NGOAI_THAT
  // }
]

export const SERVICE_CATEGORY = [
  { name: 'Cứu hộ', key: ServiceType.CUU_HO },
  { name: 'Độ xe', key: ServiceType.DO_XE },
  {
    name: 'Bảo dưỡng sửa chữa',
    key: ServiceType.BAO_DUONG_SUA_CHUA,
    children: [
      {
        name: 'Máy',
        key: ServiceType.MAY
      },
      {
        name: 'Gầm',
        key: ServiceType.GAM
      },
      {
        name: 'Điện',
        key: ServiceType.DIEN
      },
      {
        name: 'Điều hòa',
        key: ServiceType.DIEU_HOA
      },
      {
        name: 'Thân vỏ',
        key: ServiceType.THAN_VO
      },
      {
        name: 'Khác',
        key: ServiceType.BAO_DUONG_SUA_CHUA_KHAC
      },
      ,
    ]
  }
]

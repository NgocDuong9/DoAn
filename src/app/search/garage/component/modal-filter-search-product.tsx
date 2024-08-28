'use client'

import { Button, Modal, ScrollArea } from '@mantine/core'

import FilterSort from '../../search-result/components/filter-sort'
import { NestedCheckboxes } from '../../search-result/components/nested-checkbox'
import PriceRange from '../../search-result/components/price-range-slider'
import { filterPrice } from '@/utils/formatPrice'
import { useState } from 'react'

interface ModalProps {
  showDropdown: boolean
  setShowDropdown: () => void
  multiple?: boolean
  checkedData: any
  handleCheckedData: (e: any) => void
  filters: any
  categoryField: any
  origin: any
  brand: any
}

function FilterModalSearchProduct({
  showDropdown,
  setShowDropdown,
  multiple = true,
  checkedData,
  handleCheckedData,
  filters,
  categoryField,
  origin,
  brand
}: ModalProps) {
  const [dataModal, setDataModal] = useState<any>(filters)

  const handleSelectCheckboxItem = ({
    data: { item, isChecked },
    filterKey,
    itemKey,
    type = 'checkbox'
  }: {
    data: { item: any; isChecked: any }
    filterKey: 'category' | 'key_brand' | 'origin' | 'category_id'

    itemKey: 'key' | 'code' | 'value' | 'id'
    type?: 'checkbox' | 'radio'
  }) => {
    let updatedChecked
    if (type === 'checkbox') {
      if (isChecked) {
        updatedChecked = [...dataModal[filterKey], item[itemKey]]
      } else {
        updatedChecked = dataModal?.[filterKey]?.filter(
          (checkedItem: any) => checkedItem !== item[itemKey]
        )
      }
    } else {
      if (isChecked) {
        updatedChecked = [item[itemKey]]
      } else {
        updatedChecked = dataModal?.[filterKey]?.filter(
          (checkedItem: any) => checkedItem !== item[itemKey]
        )
      }
    }

    const newFilters = {
      ...dataModal,
      [filterKey]: updatedChecked
    }

    setDataModal(newFilters)
  }
  return (
    <>
      <Modal
        opened={showDropdown}
        onClose={setShowDropdown}
        title="Chọn bộ lọc tìm kiếm"
        // size={"2xl"}
        fullScreen
      >
        <div className="flex flex-col justify-between gap-4 md:p-10 p-5 h-full">
          <ScrollArea>
            <NestedCheckboxes
              title={'Lĩnh vực'}
              data={categoryField?.prodType ? categoryField?.prodType : []}
              checkedItems={dataModal?.category ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'category',
                  itemKey: 'key',
                  type: 'radio'
                })
              }}
              filterKey="key"
              type="radio"
            />
            <PriceRange
              title="Giá"
              setData={(e: any) => {
                // setPrice(e);
                if (e[0] === 0 && e[1] === 100) {
                  const newFilters = {
                    ...dataModal
                  }
                  delete newFilters.price_from
                  delete newFilters.price_to

                  //   handleChangeFilterAndUpdateToUrl(newFilters);
                } else {
                  const newFilters = {
                    ...dataModal,
                    // price: e,
                    price_from: filterPrice(e, 'from'),
                    price_to: filterPrice(e, 'to')
                  }
                  setDataModal(newFilters)
                  //   handleChangeFilterAndUpdateToUrl(newFilters);
                }
              }}
              valuePick={[dataModal.price_from, dataModal.price_to]}
            />
            <NestedCheckboxes
              title={'Xuất xứ'}
              data={origin ? origin : []}
              checkedItems={dataModal?.origin ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'origin',
                  itemKey: 'key'
                  // type: "radio",
                })
              }}
              filterKey="key"
              // type="radio"
            />
            <NestedCheckboxes
              title={'Thương hiệu'}
              data={brand ? brand : []}
              checkedItems={dataModal?.key_brand ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'key_brand',
                  itemKey: 'key'
                  // type: "radio",
                })
              }}
              filterKey="key"
              // type="radio"
            />
            <div className="flex w-full">
              <FilterSort
                title="Sắp xếp theo"
                onChangeFilter={e => {
                  setDataModal({
                    ...dataModal,
                    order_price: e === 'true' ? true : e === 'false' ? false : e
                  })
                }}
                widthZ={true}
                showTitle={true}
                css="text-[18px] font-medium"
              />
            </div>
          </ScrollArea>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                setShowDropdown()
              }}
              className="rounded-[10px] w-32 bg-white text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              // variant="gradient"
              // gradient={{ from: "black", to: "red", deg: 90 }}
            >
              Huỷ bỏ
            </Button>

            <Button
              onClick={() => {
                setShowDropdown()
                handleCheckedData(dataModal)
              }}
              className=" bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-[10px] border border-[white] w-32"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default FilterModalSearchProduct

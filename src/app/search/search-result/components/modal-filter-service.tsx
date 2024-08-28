"use client";

import { Box, Button, Modal, ScrollArea } from "@mantine/core";

import { IconChevronRight } from "@tabler/icons-react";
import ModalZone from "./modal-zone";
import { NestedCheckboxes } from "./nested-checkbox";
import PriceRange from "./price-range-slider";
import { filterPrice } from "@/utils/formatPrice";
import { mergeUniqueByCode } from "@/utils";
import { useState } from "react";

interface ModalProps {
  showDropdown: boolean;
  setShowDropdown: () => void;
  multiple?: boolean;
  checkedData: any;
  handleCheckedData: (e: any) => void;
  filters: any;
  prodField: any;
  zoneChecked: any;
  setZoneCheck: (e: any) => void;
}

function FilterModalService({
  showDropdown,
  setShowDropdown,
  multiple = true,
  checkedData,
  handleCheckedData,
  filters,
  prodField,
  zoneChecked,
  setZoneCheck,
}: ModalProps) {
  const [openModalZone, setOpenModalZone] = useState(false);
  const [dataModal, setDataModal] = useState<any>(filters);

  const handleSelectCheckboxItem = ({
    data: { item, isChecked },
    filterKey,
    itemKey,
    type = "checkbox",
  }: {
    data: { item: any; isChecked: any };
    filterKey: "category" | "province";
    itemKey: "key" | "code" | "value";
    type?: "checkbox" | "radio";
  }) => {
    let updatedChecked;

    if (type === "checkbox") {
      if (isChecked) {
        updatedChecked = [...dataModal[filterKey], item[itemKey]];
      } else {
        updatedChecked = dataModal?.[filterKey]?.filter(
          (checkedItem: any) => checkedItem !== item[itemKey]
        );
      }
    } else {
      if (isChecked) {
        updatedChecked = [item[itemKey]];
      } else {
        updatedChecked = dataModal?.[filterKey]?.filter(
          (checkedItem: any) => checkedItem !== item[itemKey]
        );
      }
    }

    const newFilters = {
      ...dataModal,
      [filterKey]: updatedChecked,
    };

    setDataModal(newFilters);
    // handleChangeFilterAndUpdateToUrl(newFilters);
  };
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
              title={"Lĩnh vực"}
              data={prodField?.serviceType ?? []}
              checkedItems={dataModal?.category ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked,
                  },
                  filterKey: "category",
                  itemKey: "key",
                  type: "radio",
                });
              }}
              filterKey="key"
              type="radio"
            />
            <NestedCheckboxes
              title={"Khu vực"}
              data={zoneChecked}
              checkedItems={dataModal?.province ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked,
                  },
                  filterKey: "province",
                  itemKey: "code",
                });
              }}
              filterKey="code"
            />
            <Box
              onClick={() => {
                setOpenModalZone(true);
              }}
              className="flex items-center cursor-pointer"
            >
              Khác <IconChevronRight size={14} />
            </Box>
            <ModalZone
              handleCheckedData={(e: any) => {
                const merged = mergeUniqueByCode(zoneChecked, e);
                setZoneCheck(merged);
                const checkedZone = e.map((item: any) => item.code);
                // handleChangeFilterAndUpdateToUrl({
                //   ...filters,
                //   province: checkedZone,
                // });
                setDataModal({ ...dataModal, province: checkedZone });
              }}
              checkedData={dataModal?.province}
              showDropdown={openModalZone}
              setShowDropdown={() => setOpenModalZone(false)}
            />
            <PriceRange
              title="Giá"
              setData={(e: any) => {
                // setPrice(e);
                if (e[0] === 0 && e[1] === 100) {
                  const newFilters = {
                    ...dataModal,
                  };
                  delete newFilters.price_from;
                  delete newFilters.price_to;

                  //   handleChangeFilterAndUpdateToUrl(newFilters);
                } else {
                  const newFilters = {
                    ...dataModal,
                    // price: e,
                    price_from: filterPrice(e, "from"),
                    price_to: filterPrice(e, "to"),
                  };
                  setDataModal(newFilters);
                  //   handleChangeFilterAndUpdateToUrl(newFilters);
                }
              }}
              valuePick={[dataModal.price_from, dataModal.price_to]}
            />
          </ScrollArea>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                setShowDropdown();
              }}
              className="rounded-[10px] w-32 bg-white text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              // variant="gradient"
              // gradient={{ from: "black", to: "red", deg: 90 }}
            >
              Huỷ bỏ
            </Button>

            <Button
              onClick={() => {
                setShowDropdown();
                handleCheckedData(dataModal);
              }}
              className=" bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-[10px] border border-[white] w-32"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default FilterModalService;

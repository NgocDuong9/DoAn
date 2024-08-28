import { MapAccompaniesLabel } from "@/types/order";
import { formatNumber } from "@/utils/formatPrice";
import { ActionIcon, Button, Collapse, Flex, Grid, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

interface PropsType {
  record: Record<string, any>;
  handleUpdateCart: (arg0: Record<string, any>, arg1: string) => void;
}

const Accompanies: React.FC<PropsType> = ({ record, handleUpdateCart }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDelete = (index: number) => {
    handleUpdateCart(
      {
        detail: {
          classifies: record.detail.classifies,
          accompanies: record.detail.accompanies.filter(
            (_: any, idx: number) => idx !== index
          ),
        },
      },
      record.id
    );
  };

  return (
    <>
      <Button
        rightSection={
          <IconChevronDown
            className="transition-all"
            color="#666666"
            style={{ transform: `rotate(${collapsed ? 0 : -90}deg)` }}
          />
        }
        variant="transparent"
        color="#333333"
        className="text-sm md:text-md font-medium p-[0px] mt-[3px] md:mt-[5px]"
        onClick={() => setCollapsed(!collapsed)}
      >
        Sản phẩm/Dịch vụ đi kèm
      </Button>

      <Collapse in={collapsed}>
        {record.detail.accompanies.map((item: any, index: number) => {
          const { color, label } = MapAccompaniesLabel?.[item.type] ?? {
            color: "#ccc",
            label: "",
          };

          return (
            <Grid columns={24} key={index}>
              <Grid.Col
                span={isMobile ? 12 : 8}
                className="text-sm md:text-base font-medium"
              >
                <Flex gap="xs" align="center" className="h-full">
                  <div
                    className="rounded-[7px] border-2"
                    style={{
                      borderColor: color,
                      color,
                    }}
                  >
                    <div className="bg-white rounded-[7px] md:h-[23px] h-[20px] flex justify-center items-center md:w-[81px] w-[60px]">
                      <span className="text-[10px] font-bold leading-[11px]">
                        {label}
                      </span>
                    </div>
                  </div>
                  <label className="font-normal md:text-base text-xs line-clamp-1">
                    {item.name}
                  </label>
                </Flex>
              </Grid.Col>

              <Grid.Col span={isMobile ? 10 : 6}>
                <div className="flex justify-between items-center">
                  <Flex gap="xs" align="center" wrap="wrap">
                    <span className="md:text-base text-sm font-semibold">
                      {formatNumber(item.price)}
                    </span>
                    {item.discount_type && (
                      <>
                        <span className="text-[16px] font-medium line-through opacity-50 mt-[1px]">
                          {item.discount_type === "CURRENCY"
                            ? formatNumber(item.price + item.discount_number)
                            : formatNumber(
                                (item.price * (item.discount_number + 100)) /
                                  100
                              )}
                        </span>
                        <span className="gradientText text-[16px] font-bold">
                          -
                          {item.discount_type === "CURRENCY"
                            ? formatNumber(item.discount_number)
                            : `${item.discount_number}%`}
                        </span>
                      </>
                    )}
                  </Flex>
                  <ActionIcon
                    variant="transparent"
                    className="float-right"
                    onClick={() => handleDelete(index)}
                  >
                    <Image src="/svg/trash.svg" />
                  </ActionIcon>
                </div>
              </Grid.Col>
            </Grid>
          );
        })}
      </Collapse>
    </>
  );
};

export default Accompanies;

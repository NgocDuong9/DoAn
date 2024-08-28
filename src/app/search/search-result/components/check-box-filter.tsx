import { Box, Paper, Text } from "@mantine/core";
import { useRef, useState } from "react";

import { IconChevronDown } from "@tabler/icons-react";
import useClickOutside from "./useClickOutside";

interface CheckboxProps {
  title: string;
  data: any;
  setCheckedData: (e: any) => void;
  checkedDataa: any;
}
function CheckboxFilter({
  title,
  data,
  setCheckedData,
  checkedDataa,
}: CheckboxProps) {
  const [opened, setOpened] = useState(false);
  const [dataFilter, setDataFilter] = useState(data);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setOpened(false);
  });

  const handleButtonClick = () => setOpened(true);

  const handleOnchangeText = (e: any) => {
    const value = e.target.value;
    const filterData = data.filter((item: any) =>
      item.key.toLowerCase().includes(value.toLowerCase())
    );
    setDataFilter(filterData);
  };
  return (
    <Box
      className={`${
        opened
          ? "bg-gradient-to-r  from-[#52BAE6] via-[#67F2D1] to-[#51C2A7]"
          : ""
      }  ? border rounded-full py-2 px-4  w-auto cursor-pointer relative`}
      onClick={() => {
        handleButtonClick();
      }}
    >
      <Box className="flex items-center gap-2 justify-between">
        <Text
          className={`${opened ? "text-white" : "text-black"}`}
          lineClamp={1}
        >
          {title}
        </Text>
        {/* <div
          className={`rounded-full px-2 ${
            opened ? "bg-white" : "bg-transparent"
          }`}
        >
          <Text className="text-black">3</Text>
        </div> */}
        <IconChevronDown size={14} color={opened ? "white" : "black"} />
      </Box>
      {opened && (
        <Paper
          ref={ref}
          withBorder
          shadow="md"
          className="absolute z-10 w-[150%] border left-0 border-gray-300 rounded mt-2 shadow-md p-4 cursor-pointer"
        >
          {/* <Input
            label=""
            placeholder="Tìm kiếm"
            onChange={(e) => handleOnchangeText(e)}
          /> */}
          {/* <CheckboxSearch
            title=""
            data={dataFilter}
            handleCheckedData={(e: any) => {
              setCheckedData(e);
            }}
            checkedData={checkedDataa}
          /> */}
        </Paper>
      )}
    </Box>
  );
}

export default CheckboxFilter;

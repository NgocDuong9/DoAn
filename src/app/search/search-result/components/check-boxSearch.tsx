import { Box, Checkbox, Grid, Text } from "@mantine/core";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";

import { useState } from "react";

interface CheckboxProps {
  data: any;
  handleCheckedData: (e: any) => void;
  title?: string;
  multiple?: boolean;
  checkedData: any;
}
function CheckboxSearch({
  data,
  handleCheckedData,
  title,
  checkedData,
  multiple = true,
}: CheckboxProps) {
  const [showCategory, setShowCategory] = useState(true);
  const isEqual = (obj1: any, obj2: any) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

  const chunkArray = (array: any, chunkSize: any) => {
    let results = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };
  const chunks = chunkArray(data, 7);

  let listTemp = checkedData as any;

  const handleChecked = (value: any) => {
    if (multiple) {
      const foundIndex = listTemp.findIndex((city: any) =>
        isEqual(city, value)
      );

      if (foundIndex === -1) {
        listTemp.push(value);
        handleCheckedData(listTemp);
      } else {
        listTemp.splice(foundIndex, 1);
        handleCheckedData(listTemp);
      }
    }
  };

  return (
    <div className="py-4">
      <Box
        className={`flex items-center gap-2 ${!showCategory ? "pb-4" : ""}`}
        onClick={() => {
          setShowCategory(!showCategory);
        }}
      >
        {title ?? <Text>{title}</Text>}
        {!title ? (
          ""
        ) : !showCategory ? (
          <IconPlus size={18} />
        ) : (
          <IconChevronDown size={18} />
        )}
      </Box>
      <Grid>
        {showCategory &&
          chunks.map((chunk, chunkIdx) => (
            <Grid.Col key={chunkIdx} span={"content"}>
              {chunk.map((item: any, idx: any) => (
                <div key={idx} className="py-2">
                  <Checkbox
                    label={item.name}
                    //@ts-ignore
                    checked={checkedData?.some((check) => isEqual(check, item))}
                    onChange={() => handleChecked(item)}
                    color="#52BAE6"
                  />
                </div>
              ))}
            </Grid.Col>
          ))}
      </Grid>
    </div>
  );
}

export default CheckboxSearch;

import { Avatar, Box, Image, Rating, Text } from "@mantine/core";
import { IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";

import { formatDate } from "@/utils/formatDate";
import { getFileUrl } from "@/utils/images";
import { useState } from "react";

const EvaluateUser = (data: any) => {
  const [like, setLike] = useState(false);
  const dateCreated = formatDate(data?.data?.created_at);

  return (
    <Box className="flex flex-col gap-2">
      <Box className="flex items-center gap-2 justify-between">
        <Box className="flex gap-3">
          <Avatar src="/box/image-new-0.jpg" alt="avatar" size="42px" />
          <Box>
            <Text className="font-medium">{data?.data?.users?.name}</Text>
            <Text size="12px" className="text-[#3D3D3D]">
              {dateCreated?.fullTime}
            </Text>
          </Box>
        </Box>
        <Rating fractions={4} value={data?.data?.rating} readOnly />
      </Box>

      <Box className="flex gap-4">
        {data?.data?.image.map((item: any) => (
          <Image radius="md" src={getFileUrl(item)} w={"100px"} h={"100px"} />
        ))}
      </Box>
      {/* <Box className="flex flex-col gap-2">
        <Box className="flex justify-between w-[180px] items-center">
          <Text size="14px">Độ êm</Text>
          <Rating fractions={4} value={5} readOnly />
        </Box>
        <Box className="flex justify-between w-[180px] items-center">
          <Text size="14px">Độ ồn</Text>
          <Rating fractions={4} value={5} readOnly />
        </Box>
        <Box className="flex justify-between w-[180px] items-center">
          <Text size="14px">Độ bền</Text>
          <Rating fractions={4} value={5} readOnly />
        </Box>
      </Box> */}
      <Text size="14px">{data?.data?.content}</Text>
      {like ? (
        <div className="flex gap-2">
          <IconThumbUpFilled
            onClick={() => setLike(false)}
            className="cursor-pointer"
          />{" "}
          2
        </div>
      ) : (
        <div className="flex gap-2">
          {" "}
          <IconThumbUp
            onClick={() => setLike(true)}
            className="cursor-pointer"
          />{" "}
          1
        </div>
      )}
    </Box>
  );
};

export default EvaluateUser;

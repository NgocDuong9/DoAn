import { Box, Button, Text } from "@mantine/core";
import { IconArrowRight, IconShoppingBag } from "@tabler/icons-react";

interface TagProps {
  url?: string;
  title: string;
  content?: string;
  links?: any;
  noImage?: boolean;
  price?: string;
  btnAddToCart?: string;
  btnDetail?: string;
}
function TagAds({
  url,
  title,
  content,
  links,
  noImage,
  price,
  btnAddToCart,
  btnDetail,
}: TagProps) {
  return (
    <Box
      className="flex-col border w-full h-full bg-gradient-to-r from-[#52BAE6] via-[#67F2D1] to-[#51C2A7] bg-opacity-50 cursor-pointer pb-4 rounded-3xl p-4"
      onClick={() => {}}
    >
      {!noImage ? (
        <img
          className="w-full aspect-square object-cover rounded-3xl"
          src="/box/lop-xe-hot-deal.png"
        />
      ) : (
        <></>
      )}
      <Text
        className={`font-bold pt-4 text-black text-center text-lg
        `}
      >
        {title}
      </Text>
      <Text className={`text-base mb-4 text-center text-black`}>{content}</Text>
      <div className="flex justify-center">
        <button className="px-6 py-3 bg-[#111111] flex justify-center items-center rounded-full">
          <Text className={`font-bold text-sm text-center text-white`}>
            {price}
          </Text>
        </button>
      </div>
      <div className="flex justify-center items-center px-6">
        <Button className="mt-10  w-full border border-white bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] rounded-[10px] h-[43px]">
          <IconShoppingBag />
          {btnAddToCart}
        </Button>
      </div>
      <div className="flex justify-center items-center px-6">
        <Button className="mt-2 bg-white text-[#26D3E0] rounded-[10px] h-[43px] w-full hover:bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] hover:text-white hover:border-white">
          <Text className="flex gap-x-2 justify-center items-center ">
            {btnDetail}
            <IconArrowRight />
          </Text>
        </Button>
      </div>
    </Box>
  );
}

export default TagAds;

import { Box, Text } from "@mantine/core";

interface TagProps {
  url?: string;
  title: string;
  content?: string;
  links?: any;
  noImage?: boolean;
  onClick?: () => void;
  sale?: string;
}
function QuickTag({
  url,
  title,
  content,
  links,
  noImage,
  onClick,
  sale,
}: TagProps) {
  return (
    <Box
      className="flex flex-row gap-x-3 md:flex-col w-full cursor-pointer md:pb-4 rounded-2xl bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] h-[80px] md:h-full"
      onClick={onClick}
    >
      <div className="relative aspect-square md:w-full">
        <img className="w-full rounded-2xl" src={url} />
        {sale && (
          <Box className="hidden md:flex absolute bottom-2 right-2 w-10 h-10 rounded-full bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] p-2  justify-center items-center">
            <Text className="text-xs font-semibold text-white">{`-${sale}`}</Text>
          </Box>
        )}
      </div>

      <div className="flex flex-col justify-center md:items-center py-2 h-20 ">
        <Text className="flex text-xl font-medium line-clamp-2 text-white md:px-8 md:text-center">
          {title}
        </Text>

        <Text className="text-sm font-medium line-clamp-2 text-white">
          {content}
        </Text>
      </div>
    </Box>
  );
}

export default QuickTag;

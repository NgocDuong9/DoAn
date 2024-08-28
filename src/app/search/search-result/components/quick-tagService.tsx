import { Box, Text } from "@mantine/core";

interface TagProps {
  url?: string;
  title: string;
  content?: string;
  links?: any;
  noImage?: boolean;
  onClick?: () => void;
}
function QuickTagService({
  url,
  title,
  content,
  links,
  noImage,
  onClick,
}: TagProps) {
  return (
    <Box
      className="flex-col w-full aspect-w-1 aspect-h-1 cursor-pointer pb-4 rounded-t-lg"
      onClick={onClick}
    >
      <div className="relative">
        <img className="w-full aspect-w-1 aspect-h-1 rounded-lg" src={url} />
        <Box className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] p-2 flex justify-center items-center">
          <Text className="text-xs font-semibold text-white">{`-${content}`}</Text>
        </Box>
      </div>

      <div className="flex justify-between items-center py-2">
        <Text className="text-base font-medium line-clamp-2">{title}</Text>
      </div>
    </Box>
  );
}

export default QuickTagService;

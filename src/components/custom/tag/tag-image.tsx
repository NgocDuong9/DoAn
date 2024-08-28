import { Box, Text } from "@mantine/core";

interface TagProps {
  url?: string;
  title: string;
  content?: string;
  links?: any;
  noImage?: boolean;
}
function TagImage({ url, title, content, links, noImage }: TagProps) {
  return (
    <Box
      className="flex-col border w-full h-full bg-[#F78125] cursor-pointer pb-4"
      onClick={() => {}}
    >
      {!noImage ? (
        <img className="w-full h-[80%] object-cover" src={url} />
      ) : (
        <></>
      )}
      <Text
        className={`font-bold pt-4 text-white ${
          noImage ? "pl-4 uppercase text-base" : "text-center text-sm"
        }`}
      >
        {title}
      </Text>
      {!noImage ? (
        <Text className={`text-sm mb-4 text-center text-white`}>{content}</Text>
      ) : (
        links.map((link: any) => (
          <Text key={link} className="text-sm pl-4 underline text-white pt-4">
            {link}
          </Text>
        ))
      )}
    </Box>
  );
}

export default TagImage;

import { Text } from "@mantine/core";

interface TagProps {
  url: string;
  label: string;
  postedDate: string;
}
function TagLabel({ url, label, postedDate }: TagProps) {
  return (
    <div className="flex p-1  max-w-80 cursor-pointer items-center">
      <div className="h-full aspect-square rounded-lg">
        <img className="object-cover rounded-lg h-20 w-20" src={url} />
      </div>
      <div className="flex-col pl-2">
        <Text lineClamp={2} className="font-bold">
          {label}
        </Text>
        <Text className="opacity-50">{postedDate}</Text>
      </div>
    </div>
  );
}

export default TagLabel;

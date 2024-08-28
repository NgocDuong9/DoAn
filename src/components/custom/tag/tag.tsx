import { Text } from "@mantine/core";

interface TagProps {
  children: React.ReactNode;
  onClick?: (e: any) => void;
}
function TagName({ children, onClick }: TagProps) {
  return (
    <div
      onClick={() => {
        onClick && onClick(children);
      }}
      className=" py-2 px-4 mx-auto bg-[#DBDBDB] cursor-pointer bg-opacity-20 rounded-xl"
    >
      <Text className="font-medium text-base text-main">{children}</Text>
    </div>
  );
}

export default TagName;

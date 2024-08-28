import { Text } from "@mantine/core";

function NotFound() {
  return (
    <div className="flex justify-center items-center h-[500px]">
      <div>
        <div className="flex justify-center w-full">
          <img
            src="/box/search-window.png"
            alt="not-found"
            width={100}
            height={100}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Text className="text-main font-semibold">
            Không tìm thấy kết quả nào tương ứng với bộ lọc. Tìm kiếm nâng cao
            hơn với <span className="text-[#26D3E0]">AI</span>
          </Text>{" "}
          <img
            className="w-6 h-6 object-cover rounded"
            src={"/box/AI-Icon.png"}
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;

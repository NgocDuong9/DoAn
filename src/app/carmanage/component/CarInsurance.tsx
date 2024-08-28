import { Box, Flex, Image, Modal, Text } from "@mantine/core";
import React from "react";

interface Props {
  opened: boolean;
  close: () => void;
  gara?: string;
  name?: string;
}
const CarInsurance = ({ opened, close, gara, name }: Props) => {
  return (
    <>
      <Modal
        style={{
          boxShadow: "-24px 21px 40px 0px rgba(0, 0, 0, 0.10)",
          borderRadius: "10px",
        }}
        withCloseButton={false}
        opened={opened}
        onClose={close}
        radius={20}
        size={600}
        centered
        className="hidden lg:block"
      >
        <Flex p={0}>
          <Image src={"/box/lop-xe-hot-deal.png"} h={175} />
          <Flex direction={"column"} pt={28} gap={12}>
            <Flex gap={12} align={"center"}>
              <Image src={"/svg/lopxanh.svg"} h={30} />
              <Text size="24px" className="font-medium">
                {name}
              </Text>
            </Flex>
            <Box>
              <Text size="14px">S/N: H289903450</Text>
              <Text size="14px">Hiệu lực: 09/08/2023</Text>
            </Box>
            <Box>
              <Text size="14px">S/N: H289903450</Text>
              <Text size="14px">Hiệu lực: 09/08/2023</Text>
            </Box>
          </Flex>
        </Flex>
        <Flex
          justify={"space-between"}
          px={24}
          py={12}
          className="bg-[#eef9fc] rounded-[10px]"
        >
          <Text className="font-medium">Gara {gara}</Text>
          <Text className="font-medium">223492 0001 H 3C36 </Text>
        </Flex>
      </Modal>
      <Modal
        style={{
          boxShadow: "-24px 21px 40px 0px rgba(0, 0, 0, 0.10)",
          borderRadius: "10px",
        }}
        withCloseButton={false}
        opened={opened}
        onClose={close}
        radius={20}
        size={300}
        centered
        className=" lg:hidden"
      >
        <Flex className="flex-col lg:flex-row">
          <Image
            src={"/box/lop-xe-hot-deal.png"}
            className="w-[150px] mx-auto object-contain"
          />
          <Flex direction={"column"} py={28} gap={12}>
            <Flex gap={12} align={"center"}>
              <Image src={"/svg/lopxanh.svg"} h={30} />
              <Text size="20px" className="font-medium">
                {name}
              </Text>
            </Flex>
            <Box>
              <Text size="14px ">S/N: H289903450</Text>
              <Text size="14px ">Hiệu lực: 09/08/2023</Text>
            </Box>
            <Box>
              <Text size="14px ">S/N: H289903450</Text>
              <Text size="14px ">Hiệu lực: 09/08/2023</Text>
            </Box>
          </Flex>
        </Flex>
        <Flex
          justify={"space-between"}
          px={24}
          py={12}
          className="bg-[#eef9fc] rounded-[10px] flex-col justify-center"
        >
          <Text className="font-medium text-center">Gara {gara}</Text>
          <Text className="font-medium text-center">223492 0001 H 3C36 </Text>
        </Flex>
      </Modal>
    </>
  );
};

export default CarInsurance;

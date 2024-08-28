import { Button, Flex, Grid, Modal } from "@mantine/core";

interface PropsType {
  opened: boolean;
  close: () => void;
  handleCheckout: () => void;
}

const ModalNotice: React.FC<PropsType> = ({
  opened,
  close,
  handleCheckout,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      radius={20}
      size="auto"
      centered
    >
      <Flex
        gap="xs"
        direction="column"
        justify="center"
        className="p-[8px] relative"
      >
        <h1 className="text-[30px] font-medium">Thông báo</h1>

        <div className="p-[20px] rounded-[20px] bg-[#F9F9FA] w-[519px]">
          Thời gian đặt lịch ngoài giờ làm việc của gara. Gara có thể tính thêm
          phí ngoài giờ
        </div>

        <Grid>
          <Grid.Col span={4}>
            <Button
              variant="outline"
              color="#E52121"
              className="h-[48px] rounded-[10px] text-[16px]"
              fullWidth
              onClick={close}
            >
              Hủy
            </Button>
          </Grid.Col>
          <Grid.Col span={8}>
            <Button
              style={{
                background:
                  "linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)",
              }}
              className="h-[48px] rounded-[10px] text-base border-0 w-full"
              radius="md"
              onClick={() => {
                close();
                handleCheckout();
              }}
            >
              Đặt lịch
            </Button>
          </Grid.Col>
        </Grid>
      </Flex>
    </Modal>
  );
};

export default ModalNotice;

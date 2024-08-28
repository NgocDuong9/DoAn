// import {Button, Flex, Image, Modal, rem} from "@mantine/core"
// import {useRouter} from "next/navigation";
// import type {OrderDetailProps} from "../[orderCode]/page";
//
// interface PropsType extends OrderDetailProps {
// 	opened: boolean;
// 	close: () => void;
// 	code: string;
// }
//
// const ModalDetail: React.FC<PropsType> = ({opened, close, code}) => {
//
// 	const router = useRouter()
//
// 	return (
// 		<Modal opened={opened} onClose={close} withCloseButton={false} radius={20} size="auto" centered
// 		       closeOnClickOutside={false}>
// 			<Flex
// 				gap="xs"
// 				direction="column"
// 				align="center"
// 				justify="center"
// 				className="p-[8px]"
// 			>
// 				<Image src="/svg/checkout_success.svg" w={272}/>
// 				<h3 className="text-[24px] font-medium">Đặt lịch thành công</h3>
// 				<p className="text-[#5F6C72]">
// 					Chúc mừng bạn đã đặt lịch thành công. Mã đặt lịch của bạn: <span
// 					className="gradientText font-medium">{code}</span>
// 				</p>
// 				<Flex gap="xs" className="mt-[5px]">
// 					<Button
// 						radius={10}
// 						className="h-[48px] min-w-[241px] text-[16px] float-right"
// 						styles={{
// 							root: {
// 								padding: rem(2),
// 								border: 0,
// 								backgroundImage: 'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
// 							},
// 							inner: {
// 								background: 'var(--mantine-color-body)',
// 								color: 'var(--mantine-color-text)',
// 								borderRadius: 9,
// 								paddingLeft: 'var(--mantine-spacing-md)',
// 								paddingRight: 'var(--mantine-spacing-md)',
// 							},
// 							label: {
// 								backgroundImage: 'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
// 								WebkitBackgroundClip: 'text',
// 								WebkitTextFillColor: 'transparent',
// 							},
// 						}}
// 						onClick={() => router.push('/')}
// 					>
// 						Quay về trang chủ
// 					</Button>
// 					<Button
// 						style={{background: 'linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)'}}
// 						className="h-[48px] min-w-[241px] rounded-[10px] text-[16px] border-0"
// 						radius="md"
// 						onClick={() => router.push(`/orders`)}
// 					>
// 						Xem lịch đã đặt
// 					</Button>
// 				</Flex>
// 			</Flex>
// 		</Modal>
// 	)
// }
//
// export default ModalDetail

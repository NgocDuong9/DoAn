import { Skeleton } from "@mantine/core";

const OrderDetailSkeleton = () => {
	return (
		<main className="main relative max-w-main mx-auto min-h-screen flex items-center justify-center px-4">
			<div className="container h-[921px] max-w-full mx-auto">
				<Skeleton height={20} width={250} className="mt-6 mb-6" />

				<div className="orderDetail mt-6 flex gap-2 sm:items-center flex-col sm:flex-row">
					<ul className="flex flex-col gap-4 w-full md:w-1/2 lg:w-full">
						<Skeleton height={16} width="80%" />
						<Skeleton height={16} width="60%" />
						<Skeleton height={16} width="50%" />
						<Skeleton height={16} width="40%" />
					</ul>

					<ul className="flex flex-col gap-4 w-full md:w-1/2 lg:w-1/3 h-full min-h-[184px] p-5 bg-[#D7F4F680] rounded-[10px]">
						<Skeleton height={16} width="80%" />
						<Skeleton height={16} width="60%" />
						<Skeleton height={16} width="50%" />
						<Skeleton height={16} width="40%" />
					</ul>
				</div>

				<div className="orderDetail-list mt-6 flex flex-col gap-4">
					{/* TableSkeleton */}
					{[...Array(4)].map((_, index) => (
						<Skeleton key={index} height={40} />
					))}
				</div>

				<div className="orderDetail-actions mt-6 flex justify-end gap-4">
					<Skeleton height={36} width={120} />
					<Skeleton height={36} width={120} />
				</div>
			</div>
		</main>
	);
};

export default OrderDetailSkeleton;

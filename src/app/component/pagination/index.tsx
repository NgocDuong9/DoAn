import classNames from "classnames";
import Image from "next/image";
import { Fragment } from "react";

const AppPagination = ({ pagination }: { pagination: any }) => {
  const total = pagination?.count;
  const pageSize = pagination?.pageSetting?.pageSize ?? 1;
  const totalPage = Math.ceil(total / pageSize);

  if (!total) return;

  return (
    <div className="flex gap-x-2 cursor-pointer">
      {/* <div
        onClick={() => {
          const newPage = pagination.pageSetting.page - 1;
          pagination.handleChangePage &&
            pagination.handleChangePage(newPage <= 1 ? 1 : newPage);
        }}
        className="md:w-10 md:h-10 w-8 h-8 border-2 border-[#25a8c9] flex justify-center items-center rounded-full"
      >
        <Image
          src="/svg/ArrowLeft.svg"
          alt="logo-main"
          width={24}
          height={24}
        />
      </div>

      {Array.from(Array(totalPage).keys()).map((item, index) => (
        <div
          key={index}
          className={classNames(
            "font-bold flex justify-center items-center rounded-full",
            index + 1 === pagination?.pageSetting?.page
              ? "text-white md:w-10 md:h-10 w-8 h-8 bg-gradient-order"
              : "text-main md:w-10 md:h-10 w-8 h-8 border-2"
          )}
          onClick={() => {
            pagination.handleChangePage &&
              pagination.handleChangePage(index + 1);
          }}
        >
          {index + 1}
        </div>
      ))}

      <div
        onClick={() => {
          const newPage = pagination.pageSetting.page + 1;
          pagination.handleChangePage &&
            pagination.handleChangePage(newPage > totalPage ? totalPage : newPage);
        }}
        className="md:w-10 md:h-10 w-8 h-8 aspect-square border-2 border-[#25a8c9] flex justify-center items-center rounded-full"
      >
        <Image
          src="/svg/ArrowRight.svg"
          alt="logo-main"
          width={24}
          height={24}
        />
      </div> */}
    </div>
  );
};

export default AppPagination;

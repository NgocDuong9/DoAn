import { useState } from "react";

export const usePagination = ({
  defaultPageSize = 10,
}: {
  defaultPageSize?: number;
}) => {
  const [pageSetting, setPageSetting] = useState({
    page: 1,
    pageSize: defaultPageSize,
  });

  const handleChangePagesize = (newValue: number) => {
    setPageSetting((prev) => ({
      ...prev,
      pageSize: newValue,
    }));
  };

  const handleChangePage = (newValue: number) => {
    setPageSetting((prev) => ({
      ...prev,
      page: newValue,
    }));
  };

  return {
    pageSetting,
    handleChangePage,
    handleChangePagesize,
  };
};

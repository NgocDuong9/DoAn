export interface IProPaginationProps {
  onRemove?: boolean;
  reset?: boolean;
  className?: string;
  total?: number;
  pageSize?: number | any;
  loading?: boolean;
  rowsPerPageOptions?: (string | any)[];
  setPage?: (page: number, size: number) => void;
  changeFilter?: boolean;
}

export type IHeadCell<T> = {
  [key in keyof T]?: string;
} & {
  select?: string;
  id?: string;
  actions?: string;
  [key: string]: any;
};

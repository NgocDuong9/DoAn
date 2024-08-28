export interface OptionQuery {
  key?: string; //key search
  status?: TypeStatus; // trạng thái hoạt động
  sort_created_at?: boolean; // sort theo thời gian tạo
  page: number; //page
  limit: number; //limit record
  date?: Date;
}

export enum TypeStatus {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface PaginationResponse<T = any> {
  data: T[];
  meta: {
    total: number;
    itemsPerPage: number;
    currentPage: number;
    lastPage: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
}

export interface DateRangeQuery {
  from: Date;
  to: Date;
}

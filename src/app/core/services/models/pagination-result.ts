export class PaginationResult<T> {
  resultList?: Array<T>;
  totalRecords?: number;
  pageIndex?: number;
  pageSize?: number;
}
